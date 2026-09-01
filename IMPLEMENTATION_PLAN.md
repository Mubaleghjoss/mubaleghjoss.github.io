# Portfolio & CV Website — Implementation Plan

Goal: satu website statis (Astro + Tailwind + TypeScript) di GitHub Pages yang
berfungsi sebagai personal branding, portfolio, CV online, dan sumber CV PDF
multi-profil, dengan SATU sumber data.

Target repo: `Mubaleghjoss/mubaleghjoss.github.io` (user site, base `/`).
Local workspace: `E:\xampp\htdocs\mubaleghjoss.github.io`.

Status awal: workspace KOSONG (audit 2026-09-01). Tidak ada file existing yang
bisa rusak. Tidak ada repo `mubaleghjoss.github.io` di GitHub (https://
mubaleghjoss.github.io = 404), jadi repo harus dibuat.

---

## PHASE 1 — Repository audit (SELESAI)

### 1.1 Kandidat repo portfolio
| Path | Status |
|---|---|
| `E:\xampp\htdocs\mubaleghjoss.github.io` | dibuat kosong untuk project ini |
| `E:\xampp\htdocs\website_ku` | toko PHP lama, TIDAK dipakai |
| `E:\xampp\htdocs\dashboard` | static HTML pihak ketiga, TIDAK dipakai |

Kesimpulan: greenfield. Astro + Tailwind + TS dipakai tanpa konflik stack.

### 1.2 Repo produksi yang diaudit (fakta, bukan klaim)

**akses2-laravel** — `app.smaafbs.sch.id`, repo `Mubaleghjoss/akses-smaafbs`
- PHP 8.2, Laravel 12, Filament 5.4, Livewire 4.2, Tailwind 4, Vite 7, MySQL
- Paket: spatie/laravel-permission, barryvdh/laravel-dompdf, maatwebsite/excel,
  lbuchs/webauthn (passkey)
- Skala terhitung: 110 model, 57 Filament resource, 40 halaman Filament,
  25 widget, 23 policy, 16 action, 12 job, 115 migration, 97 file test
- Modul Penilaian ASTS/ASAS/ASAT terverifikasi di `app/Models/Assessment`,
  `app/Filament/Pages/Assessment`, `docs/assessment/*`
- REST API terverifikasi di `routes/api.php`: integrasi tagihan, monitoring
  jaringan sekolah, public connectivity, student-sync preview/apply
  (signature-verified)

**pkg-v3** — `pkgenerus.my.id`, repo `Mubaleghjoss/pembinaan-karakter-generus`
- PHP 8.2, Laravel 12, MySQL, Blade + Alpine.js, Tailwind 3, Vite 7,
  React 19 untuk komponen tertentu, Sanctum, webpush, FullCalendar,
  html5-qrcode, dompdf, FPDI, PhpSpreadsheet
- Skala terhitung: 77 model, 77 controller, 275 view Blade, 129 migration,
  71 file test, `routes/web.php` 1317 baris, `routes/api.php` 111 baris
- Modul terverifikasi dari README + kode: presensi QR, tracer karakter,
  materi & PR, chat/broadcast, gamifikasi, RPG quest, laporan penyaksian,
  sinkronisasi data online→lokal, PWA + WebAuthn, portal multi-role
  (admin, pamong, siswa, ortu, publik)

**Repo pendukung (opsional untuk CV, fakta tersedia)**
- `smaafbs` — Laravel 11, website utama `www.smaafbs.sch.id`, deploy GitHub Actions
- `PPDB/spmb-alfurqon` — Laravel 11 + Livewire 3, `seleksi.smaafbs.sch.id`
- `lokersmaafb` — Laravel 11, `loker.smaafbs.sch.id`
- `bendahara.smaafbs` — Laravel 11 API + React/Vite/Radix SPA (backend+frontend split)
- `humas.smaafbs.sch.id` — Next.js 16 + React 19 + Prisma 6 + Tailwind 4
- `hasil-hermes` — PHP murni + SQLite, `mikrotik.smaafbs.sch.id`

### 1.3 Temuan yang mengoreksi brief
1. **Flutter/Dart tidak ditemukan.** `find pubspec.yaml` di `E:\xampp\htdocs`
   dan `E:\CODING` = 0 hasil. Subheadline hero tidak boleh menulis Flutter
   sampai ada repo/bukti. Default: `PHP • Laravel • Filament • MySQL • REST API`.
2. **Bootstrap tidak dominan.** Semua project aktif memakai Tailwind CSS.
   Skill frontend ditulis Tailwind CSS (+ Alpine.js, React) sesuai fakta.
3. **Positioning lebih kuat dari "full-stack biasa"**: Laravel 12 + Filament 5,
   RBAC, PDF pipeline, queue, WebAuthn, REST integration antar-aplikasi.
4. **Node 24.9.0 + npm 11.6.0 tersedia** → Astro + Playwright bisa dijalankan lokal.
5. `git config user.email` = `kamulyan1996@gmai.com` (typo `gmai`), perlu
   dikonfirmasi email publik yang benar untuk CV.

---

## PHASE 2 — Architecture plan

### 2.1 Stack keputusan
| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Astro 5 (static output) | zero-JS default, cocok GitHub Pages |
| Styling | Tailwind CSS 4 (@tailwindcss/vite) | sama dengan stack kerja harian |
| Bahasa | TypeScript strict | data model type-safe |
| PDF | Playwright Chromium saat build | satu sumber data → PDF identik web |
| Deploy | GitHub Actions → GitHub Pages | `withastro/action` + `deploy-pages` |
| Dependency tambahan | tidak ada | tanpa UI kit, tanpa animation lib |

Tidak memakai React/Vue island. Interaktivitas (theme toggle, mobile nav)
ditulis sebagai inline script kecil bertipe module.

### 2.2 Alur data (single source of truth)
```
src/data/*.ts  (profile, skills, experience, education, projects, certifications)
        │
        ├──> src/config/site.ts        (flag tampilan + tema + accent)
        │
        ├──> / (landing)               Hero, About, Skills, Projects, Experience, Contact
        ├──> /projects, /projects/[slug]  case study 10 blok
        ├──> /cv/[profile]             CV online (developer | it-support | general)
        └──> /cv/[profile]/print       CV print A4, no chrome
                    │
                    ▼  scripts/generate-cv-pdf.mjs (Playwright, baca dist/)
              dist/cv/cv-<profile>.pdf  → tombol Download CV
```

### 2.3 Sitemap
```
/                        landing
/projects                index semua project
/projects/sma-afbs       case study 1
/projects/pkg-panunggangan  case study 2
/cv                      redirect/alias → /cv/developer
/cv/developer            CV online (default, dipakai untuk PT Yuasa)
/cv/it-support           CV online varian
/cv/general              CV online varian
/cv/<p>/print            versi print A4 tiap profil
/404
sitemap-index.xml, robots.txt   (astro:sitemap)
```

### 2.4 Component tree
```
BaseLayout.astro
├── SEO.astro            (title, desc, canonical, OG, Twitter, JSON-LD Person)
├── ThemeScript.astro    (localStorage, no-flash, prefers-color-scheme)
├── Navbar.astro         (sticky, mobile menu, Download CV)
├── <slot/>
│   ├── Hero.astro           (headline, subheadline, CTA, availability badge)
│   ├── About.astro          (professional summary 3-5 kalimat)
│   ├── Skills.astro         (kategori, TANPA persentase)
│   │   └── SkillGroup.astro
│   ├── Capabilities.astro   (6 card)
│   ├── FeaturedProjects.astro
│   │   └── ProjectCard.astro
│   ├── Experience.astro     (timeline)
│   ├── Education.astro
│   ├── Certifications.astro
│   └── Contact.astro
└── Footer.astro

CVLayout.astro           (tanpa navbar/footer, print CSS, A4)
├── CVHeader.astro
├── CVSection.astro      (generic, judul + slot)
├── CVSkills.astro
├── CVExperience.astro
├── CVProjects.astro
└── CVMeta.astro         (education, certifications, additional skills)

Shared: Section.astro, SectionTitle.astro, Card.astro, Tag.astro,
        Prose.astro, Icon.astro (inline SVG lokal, tanpa icon lib)
```

### 2.5 Struktur folder target
```
mubaleghjoss.github.io/
├── public/
│   ├── favicon.svg
│   ├── og-image.png                (placeholder → diisi user)
│   ├── images/profile/avatar.jpg   (placeholder → diisi user)
│   ├── images/projects/sma-afbs/*.png
│   ├── images/projects/pkg-panunggangan/*.png
│   └── files/certificates/         (opsional)
├── src/
│   ├── components/     (lihat 2.4)
│   ├── layouts/        BaseLayout.astro, CVLayout.astro
│   ├── data/           profile.ts skills.ts experience.ts education.ts
│   │                   projects.ts certifications.ts contacts.ts
│   │                   cvProfiles.ts types.ts index.ts
│   ├── config/         site.ts
│   ├── pages/          index.astro, 404.astro,
│   │                   projects/index.astro, projects/[slug].astro,
│   │                   cv/index.astro, cv/[profile]/index.astro,
│   │                   cv/[profile]/print.astro
│   └── styles/         global.css (design tokens), print.css
├── scripts/            generate-cv-pdf.mjs
├── .github/workflows/  deploy.yml
├── astro.config.mjs  tsconfig.json  package.json
├── .gitignore  README.md  IMPLEMENTATION_PLAN.md
```

---

## PHASE 3 — Data model

```ts
// src/data/types.ts
export type Profile = {
  name: string; headline: string; subheadline: string[];
  summary: string; location: string; email: string;
  phone?: string; whatsapp?: string;
  github: string; linkedin?: string; website?: string;
  photo?: string; availableForWork: boolean;
};

export type SkillGroup = {
  id: 'frontend'|'backend'|'database'|'mobile'|'tools'|'additional';
  label: string; items: string[]; priority: number;
};

export type Experience = {
  role: string; organization: string; location?: string;
  start: string; end: string | 'present';
  summary?: string; bullets: string[];
  tech?: string[]; cvProfiles: CvProfileId[];
};

export type Education = {
  degree: string; field?: string; institution: string;
  start: string; end: string; notes?: string;
};

export type Certification = {
  name: string; issuer: string; year: string;
  file?: string; url?: string;
};

export type ProjectFeature = { title: string; detail: string };
export type ProjectScreenshot = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string; name: string; org: string; role: string;
  positioning: string; summary: string;
  period: string; url?: string; repoPrivate: boolean;
  featured: boolean; order: number;
  problem: string[]; solution: string[]; myRole: string[];
  architecture: string;            // ASCII flow, pre-formatted
  workflow?: string;               // ASCII flow
  features: ProjectFeature[];
  tech: { label: string; items: string[] }[];
  process: string[];
  challenges: { problem: string; solution: string }[];
  screenshots: ProjectScreenshot[];
  results: string[];               // kosong jika tidak terukur — tidak diisi angka palsu
  metrics?: { label: string; value: string; source: string }[];
  cvProfiles: CvProfileId[];
};

export type CvProfileId = 'developer'|'it-support'|'general';
export type CvProfile = {
  id: CvProfileId; label: string; headline: string; summary: string;
  fileName: string;
  skillGroups: SkillGroup['id'][];
  featuredProjects: string[];      // project slug
  showCertifications: boolean;
  showAdditionalSkills: boolean;
};
```

`src/config/site.ts`:
```ts
export const site = {
  siteName, url, base, title, description, author, locale: 'id-ID',
  theme: 'professional', accent: 'red', defaultColorScheme: 'light',
  showPhoto, showAvailability, showExperience, showEducation,
  showCertifications, showAdditionalSkills, showProjectStats, showContact,
  showWhatsapp: false,
  numberFeaturedProjects: 2,
  cvPaperSize: 'A4', defaultCvProfile: 'developer',
  cvProfiles: ['developer','it-support','general'],
} as const;
```

### 3.1 Isi data project (fakta hasil audit)

**sma-afbs** — SMA AFBS Digital Ecosystem
- tech: PHP 8.2, Laravel 12, Filament 5, Livewire 4, MySQL, Tailwind 4, Vite 7,
  spatie/laravel-permission, dompdf, maatwebsite/excel, WebAuthn, queue, PHPUnit
- fitur: data siswa/guru, rombel, wali kelas, mapel & kategori, skema+komponen
  bobot 100%, input nilai guru mapel (draft batch + lock_version), ASTS/ASAS/ASAT
  per periode, submission status, rekap wali kelas, snapshot rapor immutable,
  cetak rapor PDF dari snapshot, share link, audit log, RBAC, monitoring
  kurikulum, perpustakaan + literasi, BK, boarding, sarpras, tagihan API
- workflow ASCII: Guru Mapel → Input/Draf → Kirim → Wali Kelas → Validasi/Rekap
  → Snapshot → Rapor PDF → Kurikulum/Admin/Kepala Sekolah
- metrics (dari repo, dapat diverifikasi): 110 model, 57 Filament resource,
  115 migration, 97 file test
- results: hanya klaim yang bisa dibuktikan dari repo/deploy; TIDAK ada angka
  efisiensi buatan

**pkg-panunggangan** — PKG Panunggangan
- tech: PHP 8.2, Laravel 12, MySQL, Blade + Alpine.js, React 19 (komponen
  tertentu), Tailwind 3, Vite 7, Sanctum, webpush/PWA, WebAuthn, dompdf, FPDI,
  PhpSpreadsheet, FullCalendar, html5-qrcode
- fitur: presensi QR (+manual/massal, verifikasi, rekap), tracer karakter,
  materi & PR, chat pribadi/grup/broadcast, gamifikasi poin-level-badge,
  RPG quest + editor peta, laporan penyaksian, catatan rapat, kalender,
  reminder jadwal, sinkronisasi online→lokal, pengaturan tema/identitas
- portal: admin, pamong, siswa, orang tua, publik
- metrics: 77 model, 77 controller, 275 view, 129 migration, 71 file test

---

## PHASE 4 — Design system

`src/styles/global.css` design tokens (light + `[data-theme="dark"]`):
```
--bg --surface --surface-2 --text --text-muted --text-subtle
--primary --primary-hover --primary-soft --border --border-strong
--radius-sm/md/lg --shadow-sm/md --font-sans --font-mono
--container (1120px) --space scale
```
Accent tunggal: deep red `#B4232A` (light) / `#E4575D` (dark) — profesional,
kontras AA terhadap surface. Font: system stack (`ui-sans-serif, Inter, Segoe UI`)
→ tanpa request font eksternal, membantu Lighthouse.
Animasi: `fade-up` 300ms + hover elevate saja; semua dibungkus
`@media (prefers-reduced-motion: reduce) { animation: none }`.

## PHASE 5–8 — Landing, project system, case study
Urutan implementasi: BaseLayout+tokens → Navbar/Footer → Hero → About →
Skills → Capabilities → FeaturedProjects → Experience → Education →
Certifications → Contact → /projects → /projects/[slug] (10 blok) →
data sma-afbs → data pkg-panunggangan.

### 5.1 Text mockup landing (desktop)
```
┌────────────────────────────────────────────────────────────────┐
│ MUBALEGH JOSS      Home About Projects Experience CV Contact   │
│                                          [☾] [ Download CV ]  │
├────────────────────────────────────────────────────────────────┤
│  ● Available for Opportunities                                 │
│                                                                │
│  FULL-STACK WEB DEVELOPER                                      │
│  <Nama Lengkap>                                                │
│  PHP · Laravel · Filament · MySQL · REST API                   │
│                                                                │
│  Saya mengembangkan aplikasi web untuk digitalisasi proses      │
│  kerja, pengelolaan data, administrasi, dan layanan organisasi. │
│                                                                │
│  [ View Projects ]  [ Download CV ]  [ GitHub ]                │
├────────────────────────────────────────────────────────────────┤
│  PROFESSIONAL SUMMARY                                          │
│  3–5 kalimat: software development, problem solving, digital    │
│  transformation, database, API, maintenance.                    │
├────────────────────────────────────────────────────────────────┤
│  TECHNICAL STACK                                               │
│  ┌ FRONTEND ────────┐ ┌ BACKEND ─────────┐ ┌ DATABASE ───────┐ │
│  │ HTML5 CSS3       │ │ PHP  Laravel     │ │ MySQL           │ │
│  │ Tailwind Alpine  │ │ Filament Livewire│ │ Schema Design   │ │
│  │ JavaScript JSON  │ │ MVC  REST API    │ │ Query & Index   │ │
│  └──────────────────┘ └──────────────────┘ └─────────────────┘ │
│  ┌ TOOLS ───────────┐ ┌ ADDITIONAL (kecil, subdued) ─────────┐ │
│  │ Git GitHub VSCode│ │ VPS · cPanel · Cloudflare · Linux    │ │
│  │ Vite Deployment  │ │ Networking · MikroTik · AI-assisted  │ │
│  └──────────────────┘ └──────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│  FEATURED PROJECTS                                             │
│  ┌───────────────────────────┐ ┌───────────────────────────┐   │
│  │ SMA AFBS DIGITAL ECOSYSTEM│ │ PKG PANUNGGANGAN          │   │
│  │ Academic & Administration │ │ Multi-Role Activity System│   │
│  │ Laravel 12 · Filament 5   │ │ Laravel 12 · Alpine · PWA │   │
│  │ app.smaafbs.sch.id        │ │ pkgenerus.my.id           │   │
│  │ [ Read case study → ]     │ │ [ Read case study → ]     │   │
│  └───────────────────────────┘ └───────────────────────────┘   │
├────────────────────────────────────────────────────────────────┤
│  DEVELOPMENT CAPABILITIES   (6 card, 1–2 kalimat)              │
│  Full-Stack · Database · REST API · Debugging · Responsive ·   │
│  Maintenance                                                   │
├────────────────────────────────────────────────────────────────┤
│  EXPERIENCE (timeline)  │  EDUCATION  │  CERTIFICATIONS        │
├────────────────────────────────────────────────────────────────┤
│  CONTACT   email · github · linkedin        [ Download CV ]    │
└────────────────────────────────────────────────────────────────┘
```
Mobile (320–430px): navbar → hamburger; semua grid jadi 1 kolom;
CTA full-width stacked; tidak ada horizontal scroll (audit `overflow-x`).

### 5.2 Text mockup CV (A4, ATS-friendly, 1 kolom)
```
─────────────────────────────────────────────────────────
<NAMA LENGKAP>
Full-Stack Web Developer
Kota, Indonesia · email · +62… · github.com/Mubaleghjoss
─────────────────────────────────────────────────────────
PROFESSIONAL SUMMARY
3–4 kalimat padat, kata kunci ATS: Laravel, PHP, MySQL,
REST API, database design, deployment, maintenance.

TECHNICAL SKILLS
Backend    : PHP, Laravel, Filament, Livewire, MVC, REST API
Frontend   : HTML5, CSS3, Tailwind CSS, JavaScript, Alpine.js
Database   : MySQL, schema design, query optimization
Tools      : Git, GitHub, Vite, VS Code, Linux, cPanel/VPS

PROFESSIONAL EXPERIENCE
<Peran> — <Organisasi>                        <thn>–<thn>
 • requirement analysis …
 • application development …

SELECTED PROJECTS
SMA AFBS Digital Ecosystem — app.smaafbs.sch.id
 Laravel 12, Filament 5, MySQL. Penilaian ASTS/ASAS/ASAT,
 rapor PDF dari snapshot immutable, RBAC, REST integration.
PKG Panunggangan — pkgenerus.my.id
 Laravel 12, Alpine.js, PWA. Presensi QR, tracer karakter,
 gamifikasi, portal 5 peran, sinkronisasi data.

EDUCATION · CERTIFICATIONS · ADDITIONAL SKILLS
─────────────────────────────────────────────────────────
```
Aturan ATS: satu kolom, tanpa tabel layout, tanpa ikon dekoratif,
teks asli (bukan gambar), heading `h2` semantik, URL tercetak penuh.

---

## PHASE 9–11 — CV online, print, PDF generator

### Print CSS
```css
@page { size: A4; margin: 14mm 14mm 16mm; }
@media print {
  nav, footer, .no-print, button { display: none !important; }
  html, body { background: #fff; color: #000; }
  * { animation: none !important; transition: none !important;
      -webkit-print-color-adjust: exact; }
  .cv-section { break-inside: avoid; }
  h2 { break-after: avoid; }
  li { break-inside: avoid; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 9pt; }
}
```
`/cv/[profile]/print` memakai `CVLayout` tanpa navbar/footer sejak awal
(bukan hanya disembunyikan lewat print), sehingga halaman ini juga bersih
saat dibuka Playwright.

### Flow generate PDF (Option A — build-time, prioritas)
```
npm run build                → dist/ (HTML statis, termasuk /cv/*/print)
node scripts/generate-cv-pdf.mjs
   ├─ jalankan `astro preview` (atau http-server) pada dist/, port 4322
   ├─ chromium.launch() → newPage()
   ├─ untuk setiap cvProfile aktif:
   │    goto http://localhost:4322/cv/<id>/print, waitUntil networkidle
   │    emulateMedia({ media:'print' })
   │    pdf({ path: dist/cv/cv-<id>.pdf, format:'A4', printBackground:true,
   │          margin:14mm, preferCSSPageSize:true })
   ├─ verifikasi: file ada, size > 20KB, pageCount 1–2 (cek via pdf header)
   └─ tutup server & browser
```
`npm run cv:pdf` = build + generate. PDF ditulis ke `dist/cv/` (bukan `public/`)
agar tidak pernah ada artefak biner ter-commit. Tombol Download memakai
`import.meta.env.BASE_URL + 'cv/cv-developer.pdf'` dengan atribut `download`.

Fallback Option B (jika Chromium gagal di CI): tombol jatuh ke
`/cv/<id>/print?autoprint=1` yang memicu `window.print()`; diaktifkan lewat
`site.pdfMode = 'print-fallback'`. Prioritas tetap Option A.

### Flow GitHub Pages deployment
```
push main
  → actions/checkout
  → setup-node 20 + npm ci
  → npx playwright install --with-deps chromium
  → npm run build
  → node scripts/generate-cv-pdf.mjs        (PDF masuk ke dist/cv/)
  → actions/upload-pages-artifact (path: dist)
  → actions/deploy-pages
  → https://mubaleghjoss.github.io/
```
Permissions: `contents: read, pages: write, id-token: write`, concurrency
group `pages`. `astro.config.mjs`: `site: 'https://mubaleghjoss.github.io'`,
`base: '/'` (user site). Semua asset internal memakai `import.meta.env.BASE_URL`
atau path relatif — tidak ada absolute URL hardcoded.

### cvProfiles (multi-profile, arsitektur siap sejak awal)
```
developer   → skills: backend, frontend, database, tools
              projects: sma-afbs, pkg-panunggangan            [DIPAKAI UNTUK PT YUASA]
it-support  → skills: tools, additional (networking, MikroTik, Linux, VPS, Cloudflare)
              projects: hasil-hermes (opsional), sma-afbs (ops)
general     → semua skill group + 2 project utama
```
Implementasi awal: `developer` lengkap; `it-support` & `general` terdaftar dan
merender, tapi datanya menunggu konfirmasi user.

## PHASE 12–17 — CI/CD, responsive, a11y, SEO, security, verifikasi
- Responsive check 320/375/430/768/1024/1366/1920 (Playwright screenshot + assert
  `document.documentElement.scrollWidth <= innerWidth`).
- A11y: landmark, skip-link, `aria-current`, focus-visible, alt wajib,
  kontras token diuji manual, nav keyboard-only.
- SEO: title/desc per route, canonical, OG+Twitter, favicon SVG, sitemap,
  robots.txt, JSON-LD `Person` di landing + `CreativeWork` per case study.
- Security audit sebelum publish: `git grep -iE "api[_-]?key|secret|token|password|BEGIN .*PRIVATE KEY|\.env"`,
  cek tidak ada IP internal/hostname SSH/subdomain privat, screenshot wajib
  bebas nama siswa/nilai/nomor HP (blur atau data dummy).
- `.gitignore`: node_modules, dist, .astro, .env*, *.pdf hasil build, .DS_Store.

### Verifikasi wajib sebelum "selesai"
```
npm install
npx astro check            (0 error TypeScript)
npm run build              (0 error, semua route ter-generate)
npm run cv:pdf             (dist/cv/cv-developer.pdf ada, 1–2 halaman)
node scripts/check-links.mjs   (opsional: broken link & missing image)
```
Checklist manual: dark mode, mobile 320px, print preview A4, tombol Download
benar-benar mengunduh, base path benar, tidak ada secret, tidak ada data siswa.

---

## DATA YANG MASIH PERLU DIISI USER

Wajib (implementasi diblokir tanpa ini):
1. Nama lengkap (untuk hero, CV, JSON-LD).
2. Email publik yang benar (git config saat ini `kamulyan1996@gmai.com` — typo `gmai`?).
3. Nomor HP/WhatsApp — tampil di CV? ya/tidak, dan nomor mana yang boleh publik.
4. Kota/domisili.
5. Username GitHub publik dikonfirmasi `Mubaleghjoss`; LinkedIn URL (jika ada).
6. Pengalaman kerja: jabatan resmi, nama organisasi, tahun mulai–selesai
   (mis. "Staf IT / Pengembang Aplikasi — SMA Al Furqon Boarding School, 2023–kini").
7. Pendidikan: jenjang, jurusan, institusi, tahun.
8. Foto profil (jika `showPhoto: true`) → `public/images/profile/avatar.jpg`.

Opsional:
9. Sertifikat (nama, penerbit, tahun, file PDF/gambar).
10. Screenshot aplikasi yang sudah aman (tanpa data pribadi siswa) untuk
    `public/images/projects/sma-afbs/` dan `.../pkg-panunggangan/`.
11. Klaim hasil yang bisa dibuktikan (mis. jumlah pengguna aktif, jumlah kelas
    yang memakai sistem). Kosongkan jika tidak ada — tidak akan dikarang.
12. Konfirmasi Flutter: ada repo/project Flutter di mesin lain? Jika tidak,
    Flutter tidak dicantumkan.
13. Keputusan: repo `mubaleghjoss.github.io` (user site) atau repo bernama lain
    dengan base path `/portfolio/`.

## REPO YANG SUDAH & PERLU DIAUDIT LANJUT
Sudah diaudit cukup untuk case study: `akses2-laravel`, `pkg-v3`.
Perlu audit lanjut hanya jika user ingin dijadikan case study penuh:
`bendahara.smaafbs` (Laravel API + React SPA), `humas.smaafbs.sch.id` (Next.js
16 + Prisma), `PPDB/spmb-alfurqon` (Livewire), `lokersmaafb`, `smaafbs`,
`hasil-hermes` (PHP+SQLite, kandidat portfolio IT-support).

## CHECKLIST IMPLEMENTASI

Phase 1 — Audit
- [x] Audit workspace target (kosong, greenfield)
- [x] Audit stack akses2-laravel & pkg-v3
- [x] Audit repo pendukung
- [x] Verifikasi Node/npm tersedia
- [x] Koreksi klaim Flutter & Bootstrap

Phase 2 — Arsitektur
- [x] Keputusan stack + alasan
- [x] Sitemap, component tree, struktur folder
- [ ] Scaffold `npm create astro` minimal + Tailwind + tsconfig strict

Phase 3 — Data & config
- [ ] `src/data/types.ts`
- [ ] `profile.ts`, `contacts.ts` (menunggu data user)
- [ ] `skills.ts` (fakta stack)
- [ ] `experience.ts`, `education.ts`, `certifications.ts` (menunggu data user)
- [ ] `projects.ts` (sma-afbs, pkg-panunggangan)
- [ ] `cvProfiles.ts`
- [ ] `src/config/site.ts`

Phase 4 — Design system
- [ ] `global.css` tokens light/dark + reset + utilitas
- [ ] `print.css`
- [ ] `Section`, `Card`, `Tag`, `Icon` primitives

Phase 5 — Landing
- [ ] BaseLayout + SEO + ThemeScript
- [ ] Navbar (sticky, mobile, Download CV) + Footer
- [ ] Hero, About, Skills, Capabilities
- [ ] FeaturedProjects + ProjectCard
- [ ] Experience, Education, Certifications, Contact

Phase 6–8 — Project system
- [ ] `/projects/index.astro`
- [ ] `/projects/[slug].astro` (10 blok)
- [ ] Case study SMA AFBS
- [ ] Case study PKG Panunggangan
- [ ] Struktur folder screenshot + placeholder + alt text

Phase 9–11 — CV & PDF
- [ ] CVLayout
- [ ] `/cv/[profile]/index.astro`
- [ ] `/cv/[profile]/print.astro`
- [ ] `/cv/index.astro` (alias developer)
- [ ] `scripts/generate-cv-pdf.mjs` + verifikasi ukuran/halaman
- [ ] Tombol Download CV (dropdown 3 profil)

Phase 12–17 — Rilis
- [ ] `.github/workflows/deploy.yml`
- [ ] Responsive audit 7 breakpoint
- [ ] A11y audit
- [ ] SEO + JSON-LD + sitemap + robots
- [ ] Security/privacy audit + `.gitignore`
- [ ] README
- [ ] Verifikasi akhir (astro check, build, cv:pdf)
- [ ] Buat repo GitHub + push + aktifkan Pages

## RISIKO
| Risiko | Mitigasi |
|---|---|
| Playwright Chromium gagal di CI | `playwright install --with-deps chromium`; fallback Option B via config |
| CV melebihi 2 halaman | `cvProfiles` membatasi jumlah project/bullet; verifikasi pageCount di script |
| Screenshot memuat data siswa | wajib blur/dummy; audit sebelum commit; PDF/gambar tidak masuk repo sebelum dicek |
| Klaim tidak terbukti | semua metrics diberi field `source`; tanpa sumber → tidak ditulis |
| Base path salah | user site `base:'/'`; semua link lewat `BASE_URL` |
