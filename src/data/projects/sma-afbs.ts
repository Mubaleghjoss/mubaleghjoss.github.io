import type { Project } from '../types';

export const smaAfbs: Project = {
  slug: 'sma-afbs',
  name: 'SMA AFBS Digital Ecosystem',
  org: 'SMA Al Furqon Boarding School',
  role: 'Full-Stack Developer & Koordinator Tim IT',
  positioning: 'Sistem Akademik & Administrasi Sekolah',
  period: '2023 – sekarang',
  url: 'https://app.smaafbs.sch.id',
  repo: 'https://github.com/Mubaleghjoss/akses-smaafbs',
  featured: true,
  order: 1,
  summary:
    'Aplikasi terpadu untuk penilaian, administrasi, dan pelaporan sekolah: dari input nilai guru mapel, validasi wali kelas, sampai cetak rapor PDF dari data yang sudah dibekukan. Dipakai lintas peran — guru mapel, wali kelas, kurikulum, BK, perpustakaan, sarana prasarana, dan manajemen.',
  cvSummary:
    'Sistem akademik dan administrasi sekolah berbasis Laravel + Filament: penilaian ASTS/ASAS/ASAT, alur validasi wali kelas, cetak rapor PDF dari snapshot yang dibekukan, hak akses berbasis peran, serta REST API untuk integrasi antaraplikasi.',
  problem: [
    'Penilaian dan rekap nilai dikerjakan lewat berkas spreadsheet yang tersebar, sehingga rentan salah versi dan sulit dilacak siapa mengubah apa.',
    'Bobot penilaian antar mata pelajaran tidak seragam dan sering tidak berjumlah 100%, sehingga rekap akhir harus dihitung ulang secara manual.',
    'Wali kelas menunggu berkas dari banyak guru mapel tanpa penanda status pengumpulan yang jelas.',
    'Rapor yang sudah dicetak bisa berubah nilainya ketika data sumber diedit, sehingga dokumen resmi tidak bisa dipertanggungjawabkan.',
    'Data siswa, guru, dan rombongan belajar berulang kali diinput ulang di beberapa keperluan yang berbeda.',
  ],
  solution: [
    'Satu basis data induk untuk siswa, guru, rombongan belajar, mata pelajaran, dan periode akademik, sehingga semua modul memakai sumber yang sama.',
    'Skema penilaian dengan komponen berbobot yang divalidasi harus berjumlah 100% sebelum bisa dipakai.',
    'Alur kerja bertahap: guru mapel menyimpan draf, mengirim, lalu wali kelas memvalidasi dan merekap dengan status yang terlihat jelas di setiap tahap.',
    'Snapshot rapor yang dibekukan: setelah dikunci, rapor PDF selalu dicetak dari salinan data saat itu, bukan dari data yang masih bisa berubah.',
    'Hak akses berbasis peran memakai policy, sehingga tiap pengguna hanya melihat kelas dan mata pelajaran yang menjadi tanggung jawabnya.',
    'REST API bertanda tangan untuk pertukaran data dengan aplikasi sekolah lain (tagihan, sinkronisasi siswa, monitoring layanan).',
  ],
  myRole: [
    'Menggali kebutuhan langsung dari guru, wali kelas, dan bagian kurikulum, lalu menyusunnya menjadi spesifikasi dan rancangan basis data.',
    'Merancang seluruh skema database relasional dan menuliskannya sebagai migration bertahap.',
    'Membangun seluruh backend: model, relasi, service, action, job, policy, dan REST API.',
    'Membangun antarmuka panel admin dengan Filament serta komponen interaktif Livewire untuk input nilai massal.',
    'Menulis pengujian otomatis untuk alur penilaian dan hak akses.',
    'Melakukan deployment ke server produksi, memantau, dan merawat aplikasi setelah rilis.',
    'Menyusun dokumentasi teknis modul penilaian dan panduan pemakaian untuk guru.',
  ],
  architecture: `Pengguna (browser / ponsel)
        │
        ▼
Laravel 12  ──  Filament 5 (panel admin, resource & halaman kustom)
        │       Livewire 4 (input nilai massal, komponen interaktif)
        │
        ├── Policy + Role/Permission  → penyaringan data per peran
        ├── Action / Service           → aturan bisnis penilaian
        ├── Queue Job                  → tugas berat: rekap, ekspor, notifikasi
        ├── DomPDF                     → cetak rapor & dokumen resmi
        └── REST API (bertanda tangan) → aplikasi sekolah lain
        │
        ▼
MySQL  (data induk, penilaian per periode, snapshot rapor, audit log)`,
  workflow: `Guru Mapel            Wali Kelas             Kurikulum / Manajemen
    │                      │                          │
 input nilai               │                          │
 (draf, bisa diperbaiki)   │                          │
    │                      │                          │
 kirim / submit  ────────►  validasi & rekap          │
    │                      │                          │
    │                   kunci nilai  ──────────────►  pantau kelengkapan
    │                      │                          │
    │                 snapshot rapor dibekukan        │
    │                      │                          │
    │                 cetak rapor PDF  ────────────►  arsip & laporan`,
  features: [
    {
      title: 'Data induk terpusat',
      detail:
        'Siswa, guru, rombongan belajar, wali kelas, mata pelajaran, dan periode akademik dikelola di satu tempat dan dipakai ulang oleh semua modul.',
    },
    {
      title: 'Skema penilaian berbobot',
      detail:
        'Komponen penilaian dapat disusun per mata pelajaran dengan bobot yang wajib berjumlah 100% sebelum skema bisa digunakan.',
    },
    {
      title: 'Input nilai dengan draf & pengiriman',
      detail:
        'Guru mapel dapat menyimpan sebagai draf, memperbaiki, lalu mengirim. Penyuntingan bersamaan dijaga agar perubahan tidak saling menimpa.',
    },
    {
      title: 'Penilaian ASTS, ASAS, dan ASAT per periode',
      detail:
        'Asesmen sumatif tengah semester, akhir semester, dan akhir tahun dikelola terpisah per periode dengan status pengumpulan yang terpantau.',
    },
    {
      title: 'Validasi dan rekap wali kelas',
      detail:
        'Wali kelas melihat kelengkapan nilai seluruh mata pelajaran di kelasnya, memvalidasi, lalu merekap sebelum rapor dikunci.',
    },
    {
      title: 'Snapshot rapor yang dibekukan',
      detail:
        'Saat dikunci, seluruh nilai disalin menjadi snapshot. Rapor PDF selalu dicetak dari snapshot sehingga dokumen tidak berubah di belakang.',
    },
    {
      title: 'Cetak rapor PDF & tautan bagi',
      detail:
        'Rapor dicetak menjadi PDF siap tanda tangan, dan dapat dibagikan lewat tautan terbatas untuk keperluan orang tua.',
    },
    {
      title: 'Hak akses berbasis peran',
      detail:
        'Peran seperti admin, kurikulum, guru mapel, wali kelas, dan BK memiliki batas akses masing-masing melalui policy dan permission.',
    },
    {
      title: 'Jejak audit perubahan',
      detail:
        'Perubahan pada data penting dicatat sehingga dapat ditelusuri kembali ketika terjadi selisih data.',
    },
    {
      title: 'Modul pendukung sekolah',
      detail:
        'Perpustakaan dan literasi, bimbingan konseling, keasramaan, sarana prasarana, serta monitoring kurikulum berada dalam satu ekosistem.',
    },
    {
      title: 'Impor & ekspor data',
      detail:
        'Data dapat diimpor dan diekspor lewat Excel/CSV untuk mempercepat pengisian awal dan pelaporan.',
    },
    {
      title: 'REST API antaraplikasi',
      detail:
        'Menyediakan endpoint untuk integrasi tagihan, sinkronisasi data siswa dengan pratinjau sebelum diterapkan, dan pemeriksaan status layanan.',
    },
  ],
  tech: [
    {
      label: 'Backend',
      items: ['PHP 8.2', 'Laravel 12', 'Filament 5', 'Livewire 4', 'REST API', 'Queue'],
    },
    { label: 'Frontend', items: ['Blade', 'Tailwind CSS 4', 'Alpine.js', 'Vite 7'] },
    { label: 'Database', items: ['MySQL', 'Migration', 'Relasi & Indeks'] },
    {
      label: 'Pendukung',
      items: [
        'spatie/laravel-permission',
        'DomPDF',
        'Laravel Excel',
        'WebAuthn (passkey)',
        'PHPUnit',
      ],
    },
    { label: 'Operasional', items: ['Git', 'GitHub Actions', 'cPanel/SSH'] },
  ],
  process: [
    'Wawancara kebutuhan dengan guru, wali kelas, dan kurikulum untuk memetakan alur penilaian yang berlaku di sekolah.',
    'Perancangan basis data dan skema penilaian, termasuk aturan bobot dan periode akademik.',
    'Pembangunan bertahap per modul, dimulai dari data induk lalu penilaian, dengan pengujian otomatis mengikuti.',
    'Uji coba bersama guru pada satu periode penilaian, lalu perbaikan berdasarkan masukan nyata.',
    'Deployment ke server produksi dan pendampingan pemakaian.',
    'Pemeliharaan berkelanjutan: perbaikan bug, penambahan modul, dan penyesuaian aturan sekolah.',
  ],
  challenges: [
    {
      problem:
        'Nilai bisa tersunting oleh dua pengguna sekaligus sehingga perubahan saling menimpa.',
      solution:
        'Menerapkan penanda versi pada baris nilai sehingga penyimpanan yang basi ditolak dan pengguna diminta memuat ulang data terbaru.',
    },
    {
      problem:
        'Rapor yang sudah dicetak berubah ketika data sumber ikut berubah.',
      solution:
        'Memisahkan data kerja dan data resmi lewat snapshot yang dibekukan saat penguncian, dan mencetak PDF hanya dari snapshot.',
    },
    {
      problem:
        'Bobot komponen penilaian sering tidak berjumlah 100% sehingga rekap akhir salah.',
      solution:
        'Validasi jumlah bobot pada tingkat aturan bisnis, sehingga skema tidak dapat dipakai sebelum bobotnya benar.',
    },
    {
      problem:
        'Rekap dan ekspor untuk seluruh kelas membuat permintaan halaman menjadi lambat.',
      solution:
        'Memindahkan proses berat ke antrean pekerjaan latar dan menambahkan indeks pada kolom penyaring yang paling sering dipakai.',
    },
    {
      problem:
        'Setiap peran membutuhkan pembatasan data yang berbeda dan mudah bocor jika dicek manual di banyak tempat.',
      solution:
        'Memusatkan aturan akses pada policy dan permission, lalu menutupnya dengan pengujian otomatis untuk tiap peran.',
    },
  ],
  screenshots: [
    {
      src: '/images/projects/sma-afbs/01-dashboard.png',
      alt: 'Dasbor ringkasan aplikasi SMA AFBS',
      caption: 'Dasbor ringkasan — data contoh',
    },
    {
      src: '/images/projects/sma-afbs/02-skema-penilaian.png',
      alt: 'Halaman skema penilaian dengan komponen berbobot',
      caption: 'Skema penilaian dengan validasi bobot 100%',
    },
    {
      src: '/images/projects/sma-afbs/03-input-nilai.png',
      alt: 'Halaman input nilai guru mata pelajaran',
      caption: 'Input nilai massal — nama siswa disamarkan',
    },
    {
      src: '/images/projects/sma-afbs/04-rekap-wali-kelas.png',
      alt: 'Rekap kelengkapan nilai untuk wali kelas',
      caption: 'Rekap wali kelas dan status pengumpulan',
    },
    {
      src: '/images/projects/sma-afbs/05-rapor-pdf.png',
      alt: 'Pratinjau cetak rapor PDF dari snapshot',
      caption: 'Cetak rapor PDF dari snapshot — data contoh',
    },
  ],
  results: [
    'Penilaian satu sekolah berjalan pada satu aplikasi, dari input guru sampai rapor PDF, menggantikan pertukaran berkas spreadsheet.',
    'Dokumen rapor dapat dipertanggungjawabkan karena selalu dicetak dari snapshot yang dibekukan.',
    'Wali kelas dan kurikulum dapat melihat status kelengkapan nilai tanpa perlu menagih berkas satu per satu.',
    'Aplikasi berjalan di domain produksi sekolah dan terus dipelihara.',
  ],
  metrics: [
    { label: 'Model Eloquent', value: '110', source: 'hitung file app/Models' },
    { label: 'Resource Filament', value: '57', source: 'hitung app/Filament/Resources' },
    { label: 'Migration', value: '115', source: 'hitung database/migrations' },
    { label: 'File pengujian', value: '97', source: 'hitung tests/**/*Test.php' },
  ],
  cvProfiles: ['developer', 'it-support', 'general'],
};
