import type { Project } from '../types';

/**
 * Aplikasi nyata yang dibangun sebagai klien mobile untuk API PKGenerus.
 * Belum dirilis ke pengguna umum, sehingga hasilnya tidak diklaim sebagai
 * dampak penggunaan produksi.
 */
export const pkgMobileApp: Project = {
  slug: 'pkg-mobile-app',
  name: 'PKGenerus Mobile App',
  org: 'Pembinaan Karakter Generus Panunggangan',
  role: 'Mobile Developer',
  positioning: 'Klien Mobile Flutter Multi-Peran',
  period: '2026',
  repo: 'https://github.com/Mubaleghjoss/pkg_mobile_app',
  featured: true,
  order: 3,
  summary:
    'Aplikasi Flutter yang terhubung ke REST API PKGenerus untuk tiga aktor login: pamong/staf, orang tua, dan siswa.',
  highlights: [
    'Setiap aktor mendapat dashboard dan batas akses sendiri.',
    'Backend Laravel tetap menjadi satu-satunya sumber otorisasi.',
    'Sesi memakai bearer token dengan penyimpanan aman di perangkat.',
  ],
  cvPoints: [
    'Klien mobile Flutter untuk REST API Laravel dengan autentikasi bearer token.',
    'Dashboard tiga peran, Riverpod untuk state, GoRouter untuk navigasi, Dio untuk HTTP.',
    'Disertai pengujian unit dan widget.',
  ],
  problem: [
    'Portal web pembinaan sudah memiliki API, tetapi akses dari ponsel perlu pengalaman yang lebih fokus untuk tiga jenis pengguna.',
    'Aplikasi klien tidak boleh menjadi sumber aturan akses baru; otorisasi harus konsisten dengan backend Laravel yang sudah ada.',
    'Sesi pengguna perlu aman dan tetap nyaman dipakai tanpa meminta login ulang terlalu cepat.',
  ],
  solution: [
    'Membangun aplikasi Flutter Material 3 dengan alur login serta dashboard terpisah untuk pamong/staf, orang tua, dan siswa.',
    'Mengonsumsi REST API v1 yang ada; aplikasi tidak menyimpan database domain sendiri dan backend tetap memutuskan otorisasi.',
    'Menggunakan bearer token, refresh proaktif, serta secure storage untuk menangani sesi pada perangkat.',
  ],
  myRole: [
    'Merancang struktur klien Flutter dan pemisahan pengalaman untuk tiga aktor pengguna.',
    'Membangun integrasi API memakai Dio, termasuk mekanisme token dan penanganan respons autentikasi.',
    'Menerapkan state management Riverpod dan navigasi GoRouter untuk menjaga state dan akses halaman tetap terstruktur.',
    'Menulis unit dan widget test, menjalankan analisis statis, serta menguji APK debug pada perangkat Android fisik.',
  ],
  architecture: `Android / iOS
     │
     ▼
Flutter (Material 3)
     │
     ├── Riverpod       → state aplikasi
     ├── GoRouter       → navigasi & penjagaan rute
     ├── Dio            → REST API client
     ├── Secure Storage → token sesi
     └── QR / local notification
     │
     ▼
REST API v1 PKGenerus (Laravel)
     │
     ▼
MySQL (otorisasi dan data domain tetap di backend)`,
  features: [
    { title: 'Tiga aktor login', detail: 'Pamong/staf, orang tua, dan siswa memiliki alur login serta dashboard yang disesuaikan dengan perannya.' },
    { title: 'REST API client', detail: 'Data aplikasi diperoleh dari REST API v1; tidak ada salinan aturan bisnis pada database mobile.' },
    { title: 'Sesi aman', detail: 'Bearer token disimpan pada secure storage dan diperbarui secara proaktif sesuai alur API.' },
    { title: 'Navigasi terjaga', detail: 'GoRouter digunakan untuk menyusun rute dan mencegah pengguna masuk ke halaman yang tidak sesuai status sesi.' },
    { title: 'Pemindaian QR & notifikasi lokal', detail: 'Kemampuan perangkat dipakai untuk alur QR dan pengingat lokal yang relevan.' },
  ],
  tech: [
    { label: 'Aplikasi', items: ['Flutter', 'Dart', 'Material 3'] },
    { label: 'Arsitektur klien', items: ['Riverpod', 'GoRouter', 'Dio', 'Secure Storage'] },
    { label: 'Integrasi', items: ['REST API', 'Bearer Token', 'QR Scanner', 'Local Notification'] },
    { label: 'Kualitas', items: ['flutter analyze', 'Unit Test', 'Widget Test'] },
  ],
  process: [
    'Memetakan endpoint dan batas akses dari API PKGenerus yang sudah tersedia.',
    'Menyusun fondasi aplikasi: navigasi, penyimpanan sesi, HTTP client, dan state management.',
    'Membangun dashboard serta alur per aktor secara bertahap.',
    'Menjalankan analisis statis, test, dan instalasi APK debug pada perangkat Android fisik.',
  ],
  challenges: [
    { problem: 'Tiga aktor membutuhkan layar dan hak akses berbeda tanpa menyalin keputusan otorisasi ke aplikasi.', solution: 'Menjaga backend Laravel sebagai sumber keputusan akses, lalu memakai status API dan penjagaan rute untuk membentuk pengalaman klien.' },
    { problem: 'Sesi bearer token harus tetap aman tetapi tidak mengganggu penggunaan harian.', solution: 'Menyimpan token pada secure storage serta menyiapkan refresh proaktif pada lapisan HTTP client.' },
    { problem: 'Perubahan state dan navigasi mudah menjadi sulit dilacak ketika aplikasi bertambah.', solution: 'Memisahkan state dengan Riverpod dan mendefinisikan rute aplikasi menggunakan GoRouter sejak fondasi awal.' },
  ],
  screenshots: [],
  results: [
    'Repo berisi 99 file Dart dengan analisis statis bersih dan 93 test lulus saat verifikasi.',
    'APK debug berhasil diinstal serta berjalan pada perangkat Android fisik.',
    'Belum dirilis ke pengguna umum; dampak penggunaan produksi tidak diklaim.',
  ],
  metrics: [
    { label: 'File Dart', value: '99', source: 'audit repositori 2026-09-01' },
    { label: 'Test lulus', value: '93', source: 'eksekusi verifikasi 2026-09-01' },
    { label: 'Aktor login', value: '3', source: 'pamong/staf, orang tua, siswa' },
  ],
  cvProfiles: ['developer', 'general'],
};
