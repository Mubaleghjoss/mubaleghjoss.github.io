import type { Project } from '../types';

export const pkgPanunggangan: Project = {
  slug: 'pkg-panunggangan',
  name: 'PKG Panunggangan',
  org: 'Pembinaan Karakter Generus Panunggangan',
  role: 'Full-Stack Developer',
  positioning: 'Sistem Pembinaan Multi-Peran',
  period: '2024 – sekarang',
  url: 'https://pkgenerus.my.id',
  repo: 'https://github.com/Mubaleghjoss/pembinaan-karakter-generus',
  featured: true,
  order: 2,
  summary:
    'Sistem pembinaan yang menyatukan presensi berbasis QR, pemantauan perkembangan karakter, materi dan tugas, komunikasi, serta pelaporan kegiatan dalam satu aplikasi dengan portal berbeda untuk admin, pamong, siswa, orang tua, dan publik.',
  cvSummary:
    'Sistem pembinaan multi-peran berbasis Laravel: presensi QR, pemantauan perkembangan karakter, materi dan tugas, komunikasi, gamifikasi, serta portal terpisah untuk lima jenis pengguna dengan dukungan PWA dan notifikasi push.',
  problem: [
    'Presensi kegiatan dicatat manual di buku sehingga rekap kehadiran memakan waktu dan mudah tercecer.',
    'Perkembangan karakter peserta tidak terdokumentasi, sehingga pembina sulit melihat perubahan dari waktu ke waktu.',
    'Materi dan tugas dibagikan lewat percakapan grup dan tenggelam bersama pesan lain.',
    'Orang tua tidak punya jalur resmi untuk memantau kehadiran dan perkembangan anaknya.',
    'Laporan kegiatan untuk pengurus disusun ulang dari catatan yang terpisah-pisah.',
  ],
  solution: [
    'Presensi berbasis pemindaian QR dengan opsi pencatatan manual dan massal untuk kondisi lapangan, disertai rekap otomatis.',
    'Modul pemantauan karakter yang mencatat perkembangan peserta secara berkala.',
    'Pusat materi dan tugas yang tersimpan rapi per kelompok dan periode.',
    'Portal terpisah untuk admin, pamong, siswa, orang tua, dan publik dari satu basis kode dengan hak akses berbeda.',
    'Gamifikasi berupa poin, level, dan lencana untuk menjaga keterlibatan peserta.',
    'PWA dan notifikasi push agar aplikasi terasa seperti aplikasi ponsel tanpa perlu pemasangan dari toko aplikasi.',
  ],
  myRole: [
    'Merancang arsitektur aplikasi dan seluruh skema basis data dari nol.',
    'Membangun semua modul backend beserta hak akses tiap portal.',
    'Membangun antarmuka responsif dengan Blade, Tailwind CSS, dan Alpine.js, serta komponen React pada bagian yang membutuhkan interaksi lebih kaya.',
    'Mengintegrasikan pemindaian QR di peramban, notifikasi push, dan ekspor dokumen PDF/Excel.',
    'Menulis pengujian otomatis untuk alur presensi dan hak akses.',
    'Melakukan deployment ke domain produksi dan merawat aplikasi setelah rilis.',
  ],
  architecture: `Peserta / Pamong / Orang Tua (ponsel, PWA)
        │
        ▼
Laravel 12 + Blade + Alpine.js  (portal multi-peran)
        │
        ├── Middleware peran      → admin | pamong | siswa | ortu | publik
        ├── Modul presensi QR     → pindai, manual, massal, verifikasi
        ├── Modul karakter        → catatan perkembangan berkala
        ├── Modul materi & tugas  → unggah, pengumpulan, penilaian
        ├── Gamifikasi            → poin, level, lencana, misi
        ├── Notifikasi Web Push   → pengingat jadwal & pengumuman
        └── Ekspor PDF / Excel    → laporan pengurus
        │
        ▼
MySQL  (peserta, kelompok, kehadiran, catatan karakter, materi, poin)`,
  workflow: `Pamong                     Peserta                Orang Tua / Pengurus
   │                          │                        │
 buat jadwal kegiatan         │                        │
   │                          │                        │
 tampilkan QR  ──────────►  pindai QR                  │
   │                          │                        │
 verifikasi kehadiran ◄───── hadir tercatat            │
   │                          │                        │
 catat perkembangan           │                        │
 karakter & nilai tugas       │                        │
   │                          │                        │
 rekap otomatis  ─────────────┴──────────────────────►  pantau & unduh laporan`,
  features: [
    {
      title: 'Presensi QR',
      detail:
        'Kehadiran dicatat lewat pemindaian QR di peramban, dilengkapi pencatatan manual dan massal serta verifikasi oleh pamong.',
    },
    {
      title: 'Rekap kehadiran otomatis',
      detail:
        'Rekap per peserta, per kelompok, dan per periode tersedia tanpa perlu menghitung ulang dari buku catatan.',
    },
    {
      title: 'Pemantauan perkembangan karakter',
      detail:
        'Pamong mencatat perkembangan peserta secara berkala sehingga tren perubahan terlihat dari waktu ke waktu.',
    },
    {
      title: 'Materi dan tugas',
      detail:
        'Materi dibagikan per kelompok, tugas dikumpulkan lewat aplikasi, dan penilaiannya tercatat.',
    },
    {
      title: 'Komunikasi dan pengumuman',
      detail:
        'Pesan pribadi, grup, dan pengumuman siaran untuk menggantikan informasi yang tenggelam di percakapan grup.',
    },
    {
      title: 'Gamifikasi',
      detail:
        'Poin, level, dan lencana diberikan atas kehadiran dan penyelesaian tugas untuk menjaga keterlibatan.',
    },
    {
      title: 'Misi bergaya permainan',
      detail:
        'Rangkaian misi dengan peta yang dapat disusun pengelola sebagai variasi kegiatan pembinaan.',
    },
    {
      title: 'Portal lima peran',
      detail:
        'Admin, pamong, siswa, orang tua, dan publik memiliki tampilan serta hak akses masing-masing dari satu aplikasi.',
    },
    {
      title: 'PWA dan notifikasi push',
      detail:
        'Dapat dipasang di layar utama ponsel dan mengirim pengingat jadwal maupun pengumuman.',
    },
    {
      title: 'Kalender dan pengingat jadwal',
      detail:
        'Jadwal kegiatan tampil dalam kalender dan mengirim pengingat sebelum kegiatan berlangsung.',
    },
    {
      title: 'Laporan dan ekspor dokumen',
      detail:
        'Laporan kegiatan dan rekap administrasi dapat diunduh sebagai PDF maupun Excel.',
    },
    {
      title: 'Sinkronisasi data',
      detail:
        'Data dari server produksi dapat disalin ke lingkungan lokal untuk keperluan pemeriksaan dan pencadangan.',
    },
  ],
  tech: [
    { label: 'Backend', items: ['PHP 8.2', 'Laravel 12', 'Sanctum', 'Queue'] },
    {
      label: 'Frontend',
      items: ['Blade', 'Alpine.js', 'Tailwind CSS 3', 'React', 'Vite 7'],
    },
    { label: 'Database', items: ['MySQL', 'Migration', 'Relasi & Indeks'] },
    {
      label: 'Pendukung',
      items: [
        'html5-qrcode',
        'Web Push',
        'FullCalendar',
        'DomPDF & FPDI',
        'PhpSpreadsheet',
        'PHPUnit',
      ],
    },
    { label: 'Operasional', items: ['Git', 'GitHub', 'cPanel/SSH', 'PWA'] },
  ],
  process: [
    'Diskusi dengan pengurus dan pamong untuk memahami alur kegiatan pembinaan yang sedang berjalan.',
    'Perancangan basis data untuk peserta, kelompok, kegiatan, kehadiran, dan catatan karakter.',
    'Pembangunan modul inti presensi lebih dulu karena paling sering dipakai di lapangan.',
    'Penambahan modul materi, komunikasi, gamifikasi, dan pelaporan secara bertahap.',
    'Uji lapangan pada kegiatan nyata, lalu penyesuaian berdasarkan kendala jaringan dan perangkat peserta.',
    'Deployment ke domain produksi dan pemeliharaan berkelanjutan.',
  ],
  challenges: [
    {
      problem:
        'Pemindaian QR gagal ketika jaringan di lokasi kegiatan lemah atau kamera perangkat terbatas.',
      solution:
        'Menyediakan jalur pencatatan manual dan massal sebagai cadangan, sehingga kegiatan tidak terhenti karena kendala teknis.',
    },
    {
      problem:
        'Satu basis kode harus melayani lima jenis pengguna dengan kebutuhan tampilan yang berbeda.',
      solution:
        'Memisahkan portal berdasarkan middleware peran dengan tata letak dan menu masing-masing, namun tetap berbagi model dan aturan bisnis.',
    },
    {
      problem:
        'Sebagian besar peserta membuka aplikasi dari ponsel kelas menengah ke bawah.',
      solution:
        'Mengutamakan tampilan ringan berbasis Blade dan Alpine.js, serta menerapkan PWA agar akses berikutnya lebih cepat.',
    },
    {
      problem:
        'Notifikasi pengingat berisiko terkirim ganda ketika penjadwalan berjalan bersamaan.',
      solution:
        'Menandai status pengiriman pada data pengingat dan menjalankan pengiriman melalui antrean agar tidak terduplikasi.',
    },
    {
      problem:
        'Data produksi perlu diperiksa tanpa mengganggu layanan yang sedang berjalan.',
      solution:
        'Membangun mekanisme sinkronisasi satu arah dari produksi ke lingkungan lokal untuk pemeriksaan dan pencadangan.',
    },
  ],
  screenshots: [
    {
      src: '/images/projects/pkg-panunggangan/01-dashboard.png',
      alt: 'Dasbor aplikasi PKG Panunggangan',
      caption: 'Dasbor pamong — data contoh',
    },
    {
      src: '/images/projects/pkg-panunggangan/02-presensi-qr.png',
      alt: 'Halaman presensi QR',
      caption: 'Presensi berbasis pemindaian QR',
    },
    {
      src: '/images/projects/pkg-panunggangan/03-rekap-kehadiran.png',
      alt: 'Rekap kehadiran peserta',
      caption: 'Rekap kehadiran — nama peserta disamarkan',
    },
    {
      src: '/images/projects/pkg-panunggangan/04-materi-tugas.png',
      alt: 'Halaman materi dan tugas',
      caption: 'Materi dan pengumpulan tugas',
    },
    {
      src: '/images/projects/pkg-panunggangan/05-gamifikasi.png',
      alt: 'Tampilan poin, level, dan lencana',
      caption: 'Gamifikasi poin dan lencana',
    },
  ],
  results: [
    'Presensi kegiatan berpindah dari buku catatan ke aplikasi dengan rekap yang langsung tersedia.',
    'Perkembangan karakter peserta terdokumentasi sehingga dapat ditinjau lintas periode.',
    'Orang tua memiliki jalur resmi untuk memantau kehadiran dan perkembangan anak.',
    'Aplikasi berjalan di domain produksi dan dipakai lintas peran.',
  ],
  metrics: [
    { label: 'Model Eloquent', value: '77', source: 'hitung file app/Models' },
    { label: 'Controller', value: '77', source: 'hitung app/Http/Controllers' },
    { label: 'Tampilan Blade', value: '275', source: 'hitung resources/views' },
    { label: 'Migration', value: '129', source: 'hitung database/migrations' },
    { label: 'File pengujian', value: '71', source: 'hitung tests/**/*Test.php' },
  ],
  cvProfiles: ['developer', 'general'],
};
