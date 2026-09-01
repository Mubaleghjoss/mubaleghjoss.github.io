"""Siapkan foto profil: crop headshot kotak + ganti latar jadi netral.

Sumber : public/images/profile/putra-source.jpg (1417x1890, pas foto jas
         almamater, latar biru elektrik hasil cutout)
Hasil  : avatar.png (600x600), avatar@2x.png (1200x1200)

Alasan tiap langkah:
- Latar biru elektrik terlalu jenuh untuk UI web dan bertabrakan dengan warna
  aksen situs -> diganti abu netral rata.
- Penggantian latar sekaligus menghapus halo/garis kebiruan sisa cutout di
  sekitar rambut dan bahu.
- Crop mengikuti titik acuan wajah (mata ~27% tinggi, dagu ~52%) supaya garis
  mata jatuh di ~40-45% dari tepi atas kotak: proporsi headshot yang benar.
"""

from collections import deque
from pathlib import Path

from PIL import Image

SRC = Path("public/images/profile/putra-source.jpg")
OUT_DIR = SRC.parent

# crop kotak: dipusatkan pada garis tengah wajah, lebar 92% gambar sumber.
# Lebih lapang dari crop rapat (kepala ~65% tinggi kotak, bukan 75%) supaya
# avatar tidak terasa sesak dan tetap terbaca saat dikecilkan.
FACE_CENTER_PCT = 0.49  # garis tengah wajah pada gambar sumber
CROP_WIDTH_PCT = 1.0
CROP_TOP_PCT = 0.0
HEADROOM_PCT = 0.03     # tambah kanvas di atas rambut (bukan memotong)
BG_COLOR = (241, 243, 245)  # abu sangat terang, netral, aman untuk light & dark
TOLERANCE = 150             # latar biru pekat jauh dari warna kulit/jas -> longgar aman
EDGE_FEATHER = 1            # px, haluskan tepi mask


def build_bg_mask(img: Image.Image, tol: int) -> bytearray:
    """BFS dari seluruh tepi; True = latar."""
    w, h = img.size
    px = img.load()
    assert px is not None

    ref: list[tuple[int, int, int]] = []
    for x in range(2, w - 2, 40):
        ref += [px[x, 2], px[x, h - 3]]
    for y in range(2, h - 2, 40):
        ref += [px[2, y], px[w - 3, y]]
    rr = sum(c[0] for c in ref) // len(ref)
    gg = sum(c[1] for c in ref) // len(ref)
    bb = sum(c[2] for c in ref) // len(ref)
    print(f"warna latar sumber : rgb({rr}, {gg}, {bb})")

    def near(c: tuple[int, int, int]) -> bool:
        return abs(c[0] - rr) + abs(c[1] - gg) + abs(c[2] - bb) <= tol

    mask = bytearray(w * h)
    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()
    seeds = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    seeds += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]

    for sx, sy in seeds:
        i = sy * w + sx
        if not seen[i]:
            seen[i] = 1
            if near(px[sx, sy]):
                mask[i] = 1
                q.append((sx, sy))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                j = ny * w + nx
                if not seen[j]:
                    seen[j] = 1
                    if near(px[nx, ny]):
                        mask[j] = 1
                        q.append((nx, ny))
    return mask


def replace_bg(img: Image.Image, mask: bytearray, color: tuple[int, int, int]) -> Image.Image:
    """Ganti latar, lalu blend tipis di tepi supaya tidak bergerigi."""
    w, h = img.size
    out = img.copy()
    px = out.load()
    assert px is not None
    for y in range(h):
        row = y * w
        for x in range(w):
            if mask[row + x]:
                px[x, y] = color

    for _ in range(EDGE_FEATHER):
        edges: list[tuple[int, int]] = []
        for y in range(1, h - 1):
            row = y * w
            for x in range(1, w - 1):
                if mask[row + x]:
                    continue
                if (
                    mask[row + x + 1]
                    or mask[row + x - 1]
                    or mask[row + w + x]
                    or mask[row - w + x]
                ):
                    edges.append((x, y))
        for x, y in edges:
            r, g, b = px[x, y]
            px[x, y] = (
                (r + color[0]) // 2,
                (g + color[1]) // 2,
                (b + color[2]) // 2,
            )
    return out


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    print(f"sumber             : {img.width}x{img.height}")

    mask = build_bg_mask(img, TOLERANCE)
    filled = sum(mask)
    print(f"mask latar         : {filled} px ({filled * 100 // (img.width * img.height)}%)")
    img = replace_bg(img, mask, BG_COLOR)

    # Kanvas diperluas di atas kepala agar headroom cukup tanpa memotong rambut,
    # lalu kotak diambil selebar gambar sumber -> kepala ~62% tinggi kotak.
    pad_top = int(img.height * HEADROOM_PCT)
    padded = Image.new("RGB", (img.width, img.height + pad_top), BG_COLOR)
    padded.paste(img, (0, pad_top))
    print(f"headroom tambahan  : +{pad_top}px di atas rambut")

    side = int(padded.width * CROP_WIDTH_PCT)
    center = int(padded.width * FACE_CENTER_PCT)
    left = max(0, min(center - side // 2, padded.width - side))
    top = int(padded.height * CROP_TOP_PCT)
    side = min(side, padded.height - top)
    box = (left, top, left + side, top + side)
    head = padded.crop(box)
    print(f"crop kotak         : {box} -> {head.width}x{head.height}")

    for name, size in (("avatar.png", 600), ("avatar@2x.png", 1200)):
        path = OUT_DIR / name
        head.resize((size, size), Image.LANCZOS).save(path, "PNG", optimize=True)
        print(f"tulis              : {path} ({size}x{size}, {path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
