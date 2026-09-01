# Portfolio — Putra Kamulyan

Situs portfolio statis dan CV online untuk Putra Kamulyan, Full-Stack Web & Mobile Developer. Dibangun dengan Astro, TypeScript, dan Tailwind CSS.

Tujuan repo ini adalah menyajikan bukti kerja secara jujur: case study aplikasi yang dibangun, project lab yang dibedakan tegas dari pengalaman produksi, serta CV yang dihasilkan dari data yang sama.

## Fitur

- Landing page responsif, SEO dasar, dan data `Person` Schema.org.
- Case study project: SMA AFBS Digital Ecosystem, PKG Panunggangan, dan PKGenerus Mobile App.
- Learning project terpisah dan berlabel jelas: SQL Procedures Lab dan CI4 CRUD Lab.
- Tiga profil CV: Developer, IT Support, dan General.
- Halaman print serta tiga PDF A4 yang dibuat otomatis saat build.
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

# Build statis dan buat tiga PDF CV di dist/cv/
npm run cv:pdf

# Verifikasi browser pada preview lokal (desktop dan ponsel)
npm run verify:browser
```

`npm run verify` adalah pipeline yang dipakai GitHub Actions. Ia menjalankan type-check, build, dan pembuatan PDF.

## Catatan privasi

- Tidak ada `.env`, key, token, atau data akses server di repository ini.
- Screenshot aplikasi produksi tidak digunakan sebelum disamarkan/diganti data contoh.
- Foto profil yang dipakai adalah output avatar; file pas foto sumber resolusi penuh sengaja tidak disimpan di repository.

## Deployment

Push ke branch `main` menjalankan `.github/workflows/pages.yml`. Workflow memasang dependency, Chromium Playwright, membuat PDF, lalu mengunggah `dist/` sebagai artefak GitHub Pages.

Lisensi konten dan source code: lihat lisensi repository bila ditambahkan kemudian.
