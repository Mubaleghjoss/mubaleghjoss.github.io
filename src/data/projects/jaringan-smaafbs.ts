import type { Project } from '../types';

/**
 * Case study jaringan (bukan aplikasi akademik).
 *
 * Aturan angka pada berkas ini: hanya angka yang benar-benar bisa ditunjuk
 * sumbernya. Jumlah ruang kelas berasal dari jaringan yang dikelola; angka
 * ukuran kode berasal dari perhitungan `git ls-files` pada repositori aplikasi
 * pemantau. Jumlah access point, port, klien, dan besaran bandwidth TIDAK
 * dicantumkan karena belum diukur dan tidak boleh dikarang.
 *
 * `repo` sengaja tidak diisi: repositori aplikasi pemantau masih privat, dan
 * aturan repo ini melarang menautkan repositori yang akan menghasilkan 404
 * bagi pengunjung anonim. Bila suatu saat dipublikkan, tambahkan `repo` di sini.
 */
export const jaringanSmaAfbs: Project = {
  slug: 'jaringan-smaafbs',
  name: 'Jaringan & Hotspot SMA AFBS',
  org: 'SMA Al Furqon Boarding School',
  role: 'Network Engineer & Koordinator Tim IT',
  positioning: 'Infrastruktur Jaringan & Pemantauan Router',
  period: '2023 – sekarang',
  url: 'https://mikrotik.smaafbs.sch.id',
  featured: true,
  order: 4,
  summary:
    'Jaringan kelas berbasis MikroTik beserta aplikasi pemantau yang saya bangun sendiri untuk mengelola akun hotspot dan akses internet.',
  highlights: [
    'Rantai perangkat: ISP → MikroTik → switch manageable → router mode AP, seluruh jalur utama gigabit.',
    'Tujuh ruang kelas dilayani lewat kabel Cat 6 yang ditarik dan diterminasi sendiri.',
    'Akun hotspot, grup bandwidth, firewall, dan penyaringan DNS dikendalikan dari satu halaman web.',
  ],
  cvPoints: [
    'Topologi 7 kelas: ISP > MikroTik > switch manageable > router mode AP, semua gigabit dengan kabel Cat 6.',
    'Hotspot, grup bandwidth, firewall, dan penyaringan DNS dikelola terpusat lewat aplikasi sendiri.',
    'Klien RouterOS API ditulis sendiri di atas socket PHP, mendukung RouterOS 6.x dan 7.x.',
  ],
  problem: [
    'Perangkat kelas bergantung pada satu titik Wi-Fi, sehingga ruang yang jauh dari router sering kehilangan sambungan.',
    'Akun hotspot dibuat satu per satu dari Winbox, sehingga penambahan akun untuk banyak pengguna memakan waktu dan mudah tidak konsisten.',
    'Tidak ada catatan siapa memakai jaringan dan kapan, karena buffer log router terbatas dan tertimpa dengan cepat.',
    'Blokir konten berbasis daftar IP mudah bocor: alamat CDN berubah, dan ponsel dapat memakai Private DNS untuk melewati DNS router.',
    'Pemantauan hanya bisa dilakukan dari Winbox di jaringan sekolah, padahal gangguan sering perlu diperiksa dari luar.',
  ],
  solution: [
    'Topologi bertingkat: ISP masuk ke MikroTik sebagai gerbang, diteruskan ke switch manageable, lalu ke router mode AP di setiap kelas.',
    'Seluruh jalur utama memakai kabel Cat 6 dan tautan gigabit agar penambahan perangkat tidak menyempitkan uplink.',
    'Aplikasi web pemantau yang berbicara langsung ke RouterOS API untuk akun hotspot, grup bandwidth, sesi, dan daftar blokir.',
    'Riwayat sesi dan akses diarsipkan dari log router ke basis data aplikasi, sehingga tidak ikut hilang saat buffer router penuh.',
    'Penyaringan berlapis: address-list untuk domain, aturan TLS/SNI untuk layanan ber-CDN, dan penguncian DNS agar tidak dapat dilewati.',
    'Dua mode sambungan ke router: langsung dari jaringan sekolah, atau lewat VPN remote ketika diakses dari luar.',
  ],
  myRole: [
    'Merancang topologi dan menentukan pembagian peran perangkat: gerbang, distribusi, dan titik akses kelas.',
    'Menarik serta menerminasi kabel Cat 6 ke ruang kelas, lalu menguji tiap jalur sebelum dipakai.',
    'Mengonfigurasi RouterOS: DHCP, IP statis untuk perangkat penting, hotspot, grup bandwidth, dan aturan firewall.',
    'Membangun sendiri klien RouterOS API di atas socket PHP, tanpa library pihak ketiga.',
    'Membangun aplikasi pemantau beserta arsip sesi, riwayat akses, dan pengelolaan daftar blokir.',
    'Menangani gangguan harian: perangkat tidak mendapat IP, titik akses tidak terjangkau, sampai kabel yang harus diterminasi ulang.',
    'Menuliskan langkah persiapan router dan pemakaian aplikasi agar operator lain dapat melanjutkan.',
  ],
  architecture: `Internet (ISP)
        │   uplink gigabit
        ▼
MikroTik RouterOS      ── gerbang: DHCP, hotspot, firewall, DNS, rate-limit
        │   gigabit · Cat 6
        ▼
Switch Manageable      ── distribusi ke seluruh ruang
        │   gigabit · Cat 6
        ▼
Router mode AP (7 kelas)  ── titik akses Wi-Fi tiap kelas
        │
        ▼
Perangkat guru & siswa`,
  workflow: `Admin / Operator (browser, ponsel)
        │   HTTPS  mikrotik.smaafbs.sch.id
        ▼
Aplikasi pemantau (PHP)  ── SQLite (lokal) / MySQL (produksi)
        │   RouterOS API — socket, tanpa library
        ▼
MikroTik RouterOS        ── /ip hotspot · /ip firewall · /log
        │
        ▼
Arsip di basis data      ── sesi login, riwayat akses, snapshot status`,
  features: [
    {
      title: 'Topologi bertingkat',
      detail:
        'ISP, gerbang MikroTik, switch manageable, dan titik akses kelas dipisahkan perannya sehingga penelusuran gangguan bisa dilakukan per lapis.',
    },
    {
      title: 'Akun hotspot terpusat',
      detail:
        'Penambahan, penyuntingan, dan penghapusan akun dikirim langsung ke router, lalu dicerminkan ke basis data aplikasi.',
    },
    {
      title: 'Grup bandwidth',
      detail:
        'Profil hotspot dikelola sebagai grup dengan batas unduh/unggah, misalnya 5M/5M, termasuk penentuan grup bawaan untuk akun baru.',
    },
    {
      title: 'Impor dan ekspor akun',
      detail:
        'Daftar akun dapat diimpor dari Excel atau CSV dan diekspor kembali, memakai pembaca/penulis XLSX yang ditulis sendiri tanpa library.',
    },
    {
      title: 'Pemantauan pengguna aktif',
      detail:
        'Pengguna yang sedang login ditampilkan beserta IP, MAC, lama sesi, dan pemakaian data, dibaca langsung dari router.',
    },
    {
      title: 'Arsip sesi dan riwayat akses',
      detail:
        'Sesi login serta host yang diakses diarsipkan dari log router ke basis data, dengan pemangkasan otomatis 14 hari atau 100.000 baris.',
    },
    {
      title: 'Blokir berbasis address-list',
      detail:
        'Domain dimasukkan ke address-list agar router me-resolve sendiri alamatnya, lalu ditutup oleh aturan firewall.',
    },
    {
      title: 'Penyaringan TLS/SNI',
      detail:
        'Layanan yang alamat CDN-nya berubah-ubah ditutup berdasarkan nama host pada sesi TLS, bukan berdasarkan daftar IP.',
    },
    {
      title: 'Penguncian DNS anti-bypass',
      detail:
        'DNS keluar, DoT pada porta 853, dan alamat DoH publik ditutup agar ponsel tidak dapat memakai Private DNS untuk melewati penyaringan.',
    },
    {
      title: 'Pengecualian per grup',
      detail:
        'Kategori blokir dapat dikecualikan untuk grup tertentu memakai address-list terpisah, sehingga aturan tidak perlu dilonggarkan untuk semua.',
    },
    {
      title: 'Snapshot status',
      detail:
        'Status perangkat dan blokir disimpan sebagai snapshot, sehingga halaman tidak perlu menghubungi router pada setiap permintaan.',
    },
    {
      title: 'API baca read-only',
      detail:
        'Endpoint pembacaan akun hotspot memakai token terpisah dari login admin dan menolak permintaan tanpa token.',
    },
  ],
  tech: [
    {
      label: 'Jaringan',
      items: [
        'MikroTik RouterOS',
        'Switch Manageable',
        'Access Point (mode AP)',
        'Kabel Cat 6',
        'Gigabit Ethernet',
        'DHCP',
        'Hotspot',
      ],
    },
    {
      label: 'RouterOS',
      items: [
        'RouterOS API',
        'Firewall Filter',
        'Address List',
        'TLS/SNI Filter',
        'Rate Limit',
        'Winbox & Terminal',
      ],
    },
    { label: 'Aplikasi', items: ['PHP 8.2', 'SQLite', 'MySQL', 'PDO', 'PWA'] },
    { label: 'Operasional', items: ['Git', 'GitHub Actions', 'cPanel/SSH', 'Playwright'] },
  ],
  process: [
    'Memetakan ruang kelas dan jalur kabel yang mungkin, lalu menentukan letak switch dan titik akses.',
    'Menyiapkan MikroTik sebagai gerbang: DHCP, hotspot, dan aturan firewall dasar.',
    'Menarik kabel Cat 6 bertahap per ruang, menguji tiap jalur, lalu memasang titik akses.',
    'Membangun klien RouterOS API dan aplikasi pemantau agar pekerjaan harian tidak lagi lewat Winbox.',
    'Menambahkan arsip sesi dan riwayat akses supaya pemakaian jaringan dapat ditelusuri.',
    'Menguatkan penyaringan konten setelah menemukan cara-cara pengelakan yang nyata di lapangan.',
  ],
  challenges: [
    {
      problem:
        'Pada RouterOS 6.48.6, pembacaan data tepat setelah penulisan pada koneksi yang sama bisa kembali kosong atau menampilkan data yang belum benar-benar tersimpan.',
      solution:
        'Setiap perubahan diverifikasi lewat koneksi baru sebelum dilaporkan berhasil, sehingga aplikasi tidak pernah mengaku sukses atas perubahan yang sebenarnya gagal.',
    },
    {
      problem:
        'Ponsel dapat mengaktifkan Private DNS sehingga penyaringan berbasis DNS router terlewati sepenuhnya.',
      solution:
        'Menutup DNS keluar, porta DoT 853, dan alamat DoH publik, sehingga permintaan DNS wajib melalui router.',
    },
    {
      problem:
        'Blokir berbasis daftar IP tidak stabil untuk layanan besar karena alamat CDN-nya berubah sewaktu-waktu.',
      solution:
        'Menambahkan aturan berbasis nama host pada sesi TLS, sehingga penyaringan tidak lagi bergantung pada alamat IP yang berubah.',
    },
    {
      problem:
        'Buffer log router terbatas, sehingga catatan sesi dan akses hilang sebelum dapat dipakai untuk penelusuran.',
      solution:
        'Mengarsipkan log ke basis data aplikasi dan memangkasnya otomatis pada 14 hari atau 100.000 baris agar tidak tumbuh tanpa batas.',
    },
    {
      problem:
        'Menghubungi router pada setiap permintaan halaman membuat antarmuka lambat, terutama saat jaringan sedang sibuk.',
      solution:
        'Menyimpan status perangkat sebagai snapshot di basis data dan memperbaruinya secara eksplisit, bukan pada setiap kunjungan halaman.',
    },
    {
      problem:
        'Sebagian pengguna perlu dikecualikan dari kategori blokir tertentu tanpa melonggarkan aturan bagi semua pengguna.',
      solution:
        'Memakai address-list pengecualian per kategori beserta urutan aturan firewall, sehingga pengecualian berlaku tepat pada kategori itu saja.',
    },
  ],
  screenshots: [],
  results: [
    'Tujuh ruang kelas dilayani satu rantai perangkat yang jelas perannya, sehingga gangguan dapat ditelusuri per lapis.',
    'Akun hotspot dan grup bandwidth dikelola dari satu halaman web, tidak lagi satu per satu dari Winbox.',
    'Riwayat sesi dan akses tetap tersimpan meski buffer log router sudah tertimpa.',
    'Aplikasi pemantau berjalan di domain produksi sekolah dan dipakai untuk pekerjaan jaringan sehari-hari.',
  ],
  metrics: [
    { label: 'Ruang kelas dilayani', value: '7', source: 'jaringan yang dikelola' },
    { label: 'Berkas PHP aplikasi', value: '44', source: 'hitung git ls-files "*.php"' },
    { label: 'Baris kode PHP', value: '8.906', source: 'wc -l berkas PHP terlacak' },
    { label: 'Baris klien RouterOS API', value: '506', source: 'wc -l libs/RouterOS.php' },
  ],
  cvProfiles: ['network-engineer', 'it-support'],
};
