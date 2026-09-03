# Portfolio — Putra Kamulyan

Situs portfolio statis dan CV online untuk Putra Kamulyan, Full-Stack Web & Mobile Developer yang juga mengelola jaringan sekolah. Dibangun dengan Astro, TypeScript, dan Tailwind CSS.

Tujuan repo ini adalah menyajikan bukti kerja secara jujur: case study aplikasi yang dibangun, project lab yang dibedakan tegas dari pengalaman produksi, serta CV yang dihasilkan dari data yang sama.

## Fitur

- Landing page responsif, SEO dasar, dan data `Person` Schema.org.
- Case study project: SMA AFBS Digital Ecosystem, PKG Panunggangan, PKGenerus Mobile App, dan Jaringan & Hotspot SMA AFBS.
- Learning project terpisah dan berlabel jelas: SQL Procedures Lab dan CI4 CRUD Lab.
- Empat profil CV: Developer, Network Engineer, IT Support, dan General.
- Halaman print serta empat PDF A4 yang dibuat otomatis saat build.
- GitHub Actions untuk memeriksa tipe, membangun situs, menghasilkan PDF, dan deploy ke GitHub Pages.

## Satu sumber data

Konten tidak ditulis ulang di komponen. Ubah data pada `src/data/`, lalu halaman landing, project, CV online, halaman print, dan PDF akan mengikuti data tersebut.

| Data | Lokasi |
| --- | --- |
| Profil dan kontak | `src/data/profile.ts` |
| Keahlian | `src/data/skills.ts` |
| Pengalaman | `src/data/experience.ts` |
| CV profile | `src/data/cvProfiles.ts` |
| Case study | `src/data/projects/` |
| Pengaturan situs | `src/config/site.ts` |

### Aturan penulisan teks

Halaman ini dirancang untuk dipindai, bukan dibaca sebagai esai. Karena itu:

- Field bertipe array (`workingStyle`, `summaryPoints`, `highlights`, `bullets`, `problem`, `solution`, `results`) dirender sebagai daftar berbutir. Tambah butir baru, jangan menyambung kalimat ke butir yang sudah ada.
- Field bertipe string (`heroLead`, `summary`) cukup satu sampai dua kalimat. Bila isinya bertambah panjang, pindahkan detailnya menjadi butir baru pada array pasangannya.
- Satu butir = satu gagasan, idealnya di bawah 140 karakter agar tidak melipat menjadi tiga baris pada ponsel. `npm run verify:cv` menolak butir yang melipat lebih dari empat baris pada layar 390px.

### Menambah profil CV baru

Satu peran nyata tidak perlu diduplikasi hanya karena disorot berbeda. Cukup tiga langkah:

1. Tambahkan id baru pada `CvProfileId` di `src/data/types.ts`.
2. Tambahkan entri pada `src/data/cvProfiles.ts`: `headline`, `summary`, `summaryPoints`, `fileName`, `skillGroups`, dan `featuredProjects`.
3. Bila peran yang sudah ada perlu disorot berbeda pada profil itu, isi `profileSummary` dan `profileBullets` pada `src/data/experience.ts` — jangan menyalin entri pengalaman.

Rute `/cv/<id>/`, halaman print, PDF, sitemap, pemilih versi di halaman CV, dan tombol pada bagian Kontak semuanya ikut otomatis. Nama berkas PDF dibaca dari `<meta name="cv-pdf-filename">` pada halaman print, jadi `scripts/generate-cv-pdf.mjs` tidak perlu diubah.

## Cara update

Alur singkatnya: ubah data, verifikasi lokal, commit, push. Push ke `main` sudah otomatis mem-build dan men-deploy — tidak ada langkah manual di web GitHub.

```bash
cd E:/xampp/htdocs/mubaleghjoss.github.io

# 1. Ubah isi di src/data/ (lihat tabel di atas)

# 2. Verifikasi: type-check + build + empat PDF CV
npm run verify

# 3. Opsional, pemeriksaan tampilan di browser sungguhan
npm run preview -- --host 127.0.0.1 --port 4321   # terminal lain
npm run verify:browser    # 9 rute, desktop + ponsel 390px
npm run verify:cv         # empat profil CV: pemilih versi, panjang butir, meta PDF
npm run verify:nav        # bar menu ponsel: warna, item aktif, buka/tutup

# 4. Simpan dan kirim
git add -A
git commit -m "perbarui ..."
git push origin main

# 5. Setelah workflow selesai (2-3 menit)
npm run verify:live
```

Yang perlu diingat:

- `dist/`, PDF, dan hasil build lain tidak perlu di-commit. GitHub Actions membuatnya ulang setiap push.
- Perubahan yang tidak lolos type-check akan menghentikan workflow, sehingga situs live tidak pernah menerima build yang gagal.
- Deploy juga bisa dipicu tanpa commit lewat tab Actions, tombol `Run workflow` pada `Deploy GitHub Pages` (`workflow_dispatch`).
- Kredensial GitHub sudah tersimpan di Windows Credential Manager, jadi `git push` biasa cukup.
- CV wajib tetap 2 halaman A4. `npm run cv:pdf` menghitung halaman tiap PDF dan gagal bila lebih; batasnya dapat diubah lewat `CV_PDF_MAX_PAGES`.

### Font Inter di-host sendiri

Berkas `public/fonts/inter-latin-{400,700,800}-normal.woff2` (Inter, lisensi OFL, salinan lisensi ada di `public/fonts/inter-LICENSE.txt`) sengaja disimpan di repo, bukan diambil dari CDN:

- Runner GitHub Actions memakai Linux tanpa Segoe UI. Tanpa font ini, PDF hasil CI memakai DejaVu Sans yang lebih lebar sehingga CV melebar menjadi tiga halaman, berbeda dari hasil build di Windows.
- Dipakai tiga berkas bobot statis, bukan satu variable font, karena Chromium menanam variable font sebagai Type3 pada PDF; bobot statis ditanam sebagai TrueType sehingga lebih aman dibaca pemindai ATS.
- Hanya bobot yang benar-benar dipakai situs yang disimpan (400 untuk teks, 700 dan 800 untuk judul serta penekanan). Bila menambah `font-weight` baru di CSS, tambahkan berkasnya juga, kalau tidak browser akan mensintesis bobot itu sendiri.
- `scripts/generate-cv-pdf.mjs` memeriksa `document.fonts.check` sebelum mencetak, jadi build berhenti bila font gagal termuat, bukan diam-diam mencetak dengan font pengganti.
- Bila suatu saat font diganti, perbarui `@font-face` pada `src/styles/global.css`, tautan `rel="preload"` di kedua layout, dan nama font pada pemeriksaan di `scripts/generate-cv-pdf.mjs`.


## Menjalankan lokal

Prasyarat: Node.js 24 atau versi LTS yang didukung Astro.

```bash
npm ci
npm run dev
```

Lalu buka URL yang ditampilkan Astro.

## Verifikasi

```bash
# Type-check dan build statis
npm run check
npm run build

# Build statis dan buat empat PDF CV di dist/cv/
npm run cv:pdf

# Verifikasi browser pada preview lokal (desktop dan ponsel)
npm run preview -- --host 127.0.0.1 --port 4321   # di terminal lain
npm run verify:browser

# Empat profil CV: pemilih versi aktif, panjang butir di ponsel, meta nama PDF
npm run verify:cv

# Bar menu pada tampilan ponsel: warna, penanda halaman aktif, buka/tutup
npm run verify:nav

# Ukur geometri hero (measure teks, rasio kolom, tinggi hero)
npm run measure:hero

# Verifikasi situs live setelah deploy
npm run verify:live
```

`npm run verify` adalah pipeline yang dipakai GitHub Actions. Ia menjalankan type-check, build, dan pembuatan PDF.

## Struktur URL

| Halaman | URL |
| --- | --- |
| Landing | `/` |
| Daftar project | `/projects/` |
| Case study | `/projects/<slug>/` |
| CV online | `/cv/<profil>/` |
| Halaman print | `/cv/<profil>/print/` |
| PDF | `/cv/<nama-file>.pdf` |
| Sitemap | `/sitemap-index.xml` |

## Catatan privasi

- Tidak ada `.env`, key, token, atau data akses server di repository ini.
- Screenshot aplikasi produksi tidak digunakan sebelum disamarkan/diganti data contoh.
- Foto profil yang dipakai adalah output avatar; file pas foto sumber resolusi penuh sengaja tidak disimpan di repository.

## Deployment

Push ke branch `main` menjalankan `.github/workflows/pages.yml`. Workflow memasang dependency, Chromium Playwright, membuat PDF, lalu mengunggah `dist/` sebagai artefak GitHub Pages.

Lisensi konten dan source code: lihat lisensi repository bila ditambahkan kemudian.
