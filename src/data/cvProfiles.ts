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

export const cvProfiles: CvProfile[] = [
  {
    id: 'developer',
    label: 'Developer',
    headline: 'Full-Stack Web & Mobile Developer',
    summary:
      'Full-Stack Developer dengan pengalaman sejak 2023 membangun dan memelihara aplikasi web produksi menggunakan PHP dan Laravel. Menguasai pengembangan frontend dan backend, perancangan basis data MySQL, pola MVC, pembuatan dan integrasi REST API, serta pengembangan aplikasi mobile dengan Flutter. Terbiasa menangani seluruh siklus pengembangan: analisis kebutuhan, penulisan logika bisnis, debugging, penyusunan dokumentasi teknis, deployment, hingga pemeliharaan aplikasi. Menggunakan Git dan GitHub sebagai alur kerja harian.',
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
      'Koordinator Tim IT dengan pengalaman mengelola infrastruktur, data, dan aplikasi sebuah sekolah sejak 2023. Menangani deployment dan pemeliharaan aplikasi di server Linux/cPanel, pengelolaan basis data MySQL, penanganan keluhan pengguna, konfigurasi jaringan, serta pengelolaan data pokok pendidikan (Dapodik). Berlatar pengembang, sehingga mampu memperbaiki masalah sampai ke tingkat kode dan basis data, bukan hanya di permukaan.',
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
      'Sarjana Teknik Informatika dengan pengalaman sejak 2023 sebagai pengembang aplikasi web sekaligus koordinator tim IT. Membangun sistem informasi yang dipakai harian oleh sebuah sekolah dan sebuah lembaga pembinaan, mulai dari analisis kebutuhan, perancangan basis data, pembangunan aplikasi, deployment ke produksi, sampai pemeliharaan dan dukungan pengguna.',
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
