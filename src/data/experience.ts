import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    role: 'Koordinator Tim IT & Operator Dapodik',
    organization: 'SMA Al Furqon Boarding School',
    location: 'Tangerang, Banten',
    start: 'Januari 2023',
    end: 'Sekarang',
    summary:
      'Memimpin tim IT sekolah, mengelola data pokok pendidikan, dan membangun sendiri ekosistem aplikasi yang dipakai lintas unit sekolah.',
    bullets: [
      'Menganalisis kebutuhan bersama guru, wali kelas, dan bagian kurikulum, lalu menyusun spesifikasi fitur dan rancangan basis data.',
      'Membangun aplikasi akademik dan administrasi berbasis Laravel + Filament: data induk siswa, guru, rombongan belajar, dan mata pelajaran.',
      'Membangun alur penilaian sampai pelaporan: skema penilaian, input nilai, rekap wali kelas, dan cetak rapor PDF.',
      'Merancang skema database relasional MySQL beserta migration, relasi, dan indeks untuk data akademik multi-periode.',
      'Membangun REST API untuk integrasi antaraplikasi sekolah dengan verifikasi tanda tangan permintaan.',
      'Menerapkan hak akses berbasis peran (RBAC) agar setiap peran hanya melihat data yang menjadi tanggung jawabnya.',
      'Melakukan debugging, pengujian otomatis, dan pemeliharaan aplikasi produksi, termasuk penanganan laporan masalah dari pengguna.',
      'Melakukan deployment dan pembaruan aplikasi ke server produksi lewat SSH/cPanel dengan alur rilis yang terdokumentasi.',
      'Mengelola dan memvalidasi data Dapodik, serta menyelaraskannya dengan data internal sekolah.',
      'Menyusun dokumentasi teknis dan panduan pemakaian untuk guru dan operator.',
    ],
    tech: [
      'PHP',
      'Laravel',
      'Filament',
      'Livewire',
      'MySQL',
      'Tailwind CSS',
      'REST API',
      'Git',
    ],
    /**
     * CV jaringan menyorot pekerjaan infrastruktur pada peran yang sama.
     * Isinya hanya hal yang benar-benar dikerjakan; jumlah perangkat selain
     * 7 ruang kelas tidak dicantumkan karena belum diukur.
     */
    profileSummary: {
      'network-engineer':
        'Mengelola jaringan dan hotspot sekolah sekaligus membangun sendiri aplikasi yang memantau serta mengendalikan routernya.',
    },
    profileBullets: {
      'network-engineer': [
        'Merancang dan mengelola jaringan tujuh ruang kelas: ISP > MikroTik > switch manageable > router mode AP, seluruh jalur utama gigabit.',
        'Menarik dan menerminasi kabel Cat 6 ke ruang kelas, lalu menguji setiap jalur sebelum dipakai.',
        'Mengonfigurasi RouterOS: DHCP, IP statis perangkat penting, hotspot, grup bandwidth, dan aturan firewall.',
        'Membangun aplikasi pemantau router beserta klien RouterOS API di atas socket PHP, tanpa library pihak ketiga.',
        'Menerapkan penyaringan konten berlapis: address-list, aturan TLS/SNI, dan penguncian DNS agar tidak dapat dilewati Private DNS.',
        'Menangani gangguan jaringan harian dan menuliskan panduan agar operator lain dapat melanjutkan.',
      ],
    },
    cvProfiles: ['developer', 'network-engineer', 'it-support', 'general'],
  },
  {
    role: 'Pengembang Aplikasi (Pribadi/Kontribusi Lembaga)',
    organization: 'PKG Panunggangan',
    location: 'Tangerang, Banten',
    start: '2024',
    end: 'Sekarang',
    summary:
      'Merancang dan membangun sistem pembinaan multi-peran untuk lembaga pembinaan generasi muda, dari nol sampai berjalan di domain produksi.',
    bullets: [
      'Membangun sistem presensi berbasis QR beserta rekap kehadiran dan verifikasi manual.',
      'Mengembangkan portal terpisah untuk admin, pamong, siswa, orang tua, dan publik dari satu basis kode.',
      'Menerapkan PWA dan notifikasi push agar aplikasi nyaman dipakai dari ponsel.',
      'Membangun modul pelaporan dan ekspor dokumen (PDF/Excel) untuk kebutuhan administrasi lembaga.',
    ],
    tech: ['PHP', 'Laravel', 'Alpine.js', 'MySQL', 'PWA', 'Tailwind CSS'],
    cvProfiles: ['developer', 'general'],
  },
];
