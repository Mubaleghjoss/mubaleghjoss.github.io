import type { Capability, CvProfile } from './types';

export const capabilities: Capability[] = [
  {
    title: 'Full-Stack Development',
    detail:
      'Menangani satu fitur dari rancangan basis data, aturan bisnis di backend, sampai antarmuka yang dipakai pengguna.',
  },
  {
    title: 'Database Design',
    detail:
      'Merancang skema relasional MySQL beserta relasi, migration, dan indeks untuk data yang tumbuh setiap periode.',
  },
  {
    title: 'REST API & Integrasi',
    detail:
      'Membangun dan mengonsumsi REST API untuk menghubungkan aplikasi yang berbeda, termasuk pengamanan permintaan.',
  },
  {
    title: 'Debugging & Problem Solving',
    detail:
      'Menelusuri akar masalah dari laporan pengguna, log, dan data nyata di produksi, lalu memperbaikinya dengan pengujian.',
  },
  {
    title: 'Responsive Web Design',
    detail:
      'Membangun tampilan yang nyaman dipakai dari ponsel karena mayoritas pengguna aplikasi saya mengaksesnya lewat ponsel.',
  },
  {
    title: 'Deployment & Maintenance',
    detail:
      'Merilis ke server produksi lewat SSH/cPanel dan GitHub Actions, memantau, lalu merawat aplikasi setelah rilis.',
  },
];

/**
 * Setiap profil CV punya `summary` (1–2 kalimat pembuka) dan `summaryPoints`
 * (butir yang dibaca sekilas oleh perekrut maupun mesin ATS). Paragraf panjang
 * dihindari karena pada CV satu halaman blok teks padat jarang benar-benar dibaca.
 */
export const cvProfiles: CvProfile[] = [
  {
    id: 'developer',
    label: 'Developer',
    headline: 'Full-Stack Web & Mobile Developer',
    summary:
      'Full-Stack Developer yang sejak 2023 membangun dan memelihara aplikasi web produksi dengan PHP dan Laravel.',
    summaryPoints: [
      'Frontend dan backend satu tangan: Laravel, Filament, Livewire, Alpine.js, dan Tailwind CSS.',
      'Perancangan basis data MySQL: skema relasional, migration, relasi, dan indeks untuk data multi-periode.',
      'Membangun dan mengonsumsi REST API untuk integrasi antaraplikasi, termasuk pengamanan permintaan.',
      'Aplikasi mobile Flutter yang mengonsumsi REST API dari aplikasi web yang saya bangun sendiri.',
      'Menangani seluruh siklus: analisis kebutuhan, logika bisnis, debugging, dokumentasi teknis, deployment, pemeliharaan.',
      'Git dan GitHub sebagai alur kerja harian, termasuk rilis otomatis lewat GitHub Actions.',
    ],
    fileName: 'cv-putra-kamulyan-developer.pdf',
    skillGroups: ['backend', 'frontend', 'database', 'mobile', 'tools'],
    featuredProjects: ['sma-afbs', 'pkg-panunggangan', 'pkg-mobile-app'],
    showCertifications: false,
    showAdditionalSkills: true,
  },
  {
    id: 'it-support',
    label: 'IT Support',
    headline: 'IT Coordinator & Application Support',
    summary:
      'Koordinator Tim IT yang sejak 2023 mengelola infrastruktur, data, dan aplikasi sebuah sekolah.',
    summaryPoints: [
      'Deployment dan pemeliharaan aplikasi di server Linux/cPanel, termasuk penanganan gangguan produksi.',
      'Pengelolaan basis data MySQL: backup, restore, perbaikan data, dan penyelarasan antaraplikasi.',
      'Penanganan keluhan pengguna dari laporan awal sampai akar masalah, disertai panduan pemakaian.',
      'Konfigurasi jaringan dan perangkat pendukung operasional sekolah.',
      'Pengelolaan dan validasi data pokok pendidikan (Dapodik) beserta penyelarasannya dengan data internal.',
      'Berlatar pengembang, sehingga perbaikan bisa dilakukan sampai tingkat kode dan basis data, bukan hanya di permukaan.',
    ],
    fileName: 'cv-putra-kamulyan-it-support.pdf',
    skillGroups: ['tools', 'database', 'backend', 'additional'],
    featuredProjects: ['sma-afbs'],
    showCertifications: false,
    showAdditionalSkills: true,
  },
  {
    id: 'general',
    label: 'General',
    headline: 'Full-Stack Developer & IT Coordinator',
    summary:
      'Sarjana Teknik Informatika yang sejak 2023 bekerja sebagai pengembang aplikasi web sekaligus koordinator tim IT.',
    summaryPoints: [
      'Membangun sistem informasi yang dipakai harian oleh sebuah sekolah dan sebuah lembaga pembinaan.',
      'Analisis kebutuhan bersama pengguna, lalu menerjemahkannya menjadi rancangan basis data dan fitur.',
      'Pembangunan aplikasi web dan mobile, dari backend dan frontend sampai integrasi antaraplikasi.',
      'Deployment ke server produksi serta pemeliharaan dan dukungan pengguna setelah rilis.',
      'Mengelola tim IT dan data pokok pendidikan di samping pekerjaan pengembangan.',
    ],
    fileName: 'cv-putra-kamulyan.pdf',
    skillGroups: ['backend', 'frontend', 'database', 'mobile', 'tools', 'additional'],
    featuredProjects: ['sma-afbs', 'pkg-panunggangan', 'pkg-mobile-app'],
    showCertifications: false,
    showAdditionalSkills: true,
  },
];

export const cvProfileById = Object.fromEntries(
  cvProfiles.map((p) => [p.id, p]),
) as Record<CvProfile['id'], CvProfile>;
