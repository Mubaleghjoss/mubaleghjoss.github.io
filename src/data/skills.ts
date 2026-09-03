import type { SkillGroup } from './types';

/**
 * Status verifikasi (audit repositori lokal + GitHub, 2026-09-01):
 * - backend/frontend/database/tools : TERVERIFIKASI dari kode produksi
 *   (akses2-laravel, pkg-v3, bendahara.smaafbs, humas, spmb, loker).
 * - mobile (Flutter/Dart)          : TERVERIFIKASI dari repo
 *   github.com/Mubaleghjoss/pkg_mobile_app (99 file Dart, 93 test lulus,
 *   APK debug berjalan di perangkat fisik). Learning project, belum rilis.
 * - network                        : TERVERIFIKASI dari jaringan sekolah yang
 *   dikelola sendiri (7 kelas, MikroTik + switch manageable + AP) dan dari
 *   aplikasi pemantau router yang dibangun sendiri (mikrotik.smaafbs.sch.id).
 * - network-roadmap                : BELUM dikuasai. Ini rencana belajar dan
 *   sertifikasi, dipisahkan tegas agar tidak terbaca sebagai pengalaman.
 * - learning                       : dibuktikan lewat repo lab sendiri
 *   (sql-procedures-lab, ci4-crud-lab) — bukan pengalaman produksi, jadi
 *   dipisahkan ke grup "Sedang Dipelajari" dan tidak diklaim di skill utama.
 *   Microsoft SQL Server / T-SQL tetap di sini: konsep SP/trigger/function
 *   sudah dipraktikkan di MySQL, tetapi belum pernah dijalankan di SQL Server.
 *
 * Urutan array = urutan tampil. Grup `subdued` diletakkan di akhir karena
 * halaman landing menampilkannya sebagai blok terpisah "status transparan".
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    cvLabel: 'Backend',
    order: 1,
    items: [
      'PHP',
      'Laravel',
      'Filament',
      'Livewire',
      'MVC',
      'REST API',
      'Business Logic',
      'Queue & Scheduled Jobs',
      'Role & Permission (RBAC)',
      'Laravel Sanctum',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    cvLabel: 'Frontend',
    order: 2,
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Tailwind CSS',
      'Bootstrap',
      'Alpine.js',
      'React',
      'jQuery',
      'Blade Templating',
      'JSON',
      'Responsive Web Design',
    ],
  },
  {
    id: 'database',
    label: 'Database',
    cvLabel: 'Database',
    order: 3,
    items: [
      'MySQL',
      'MariaDB',
      'SQLite',
      'RDBMS',
      'Database Design',
      'Relasi & Normalisasi',
      'Migration & Seeding',
      'Query Optimization',
      'Stored Procedure',
      'Trigger',
      'Database Function',
      'Import/Export Data (Excel/CSV)',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    cvLabel: 'Mobile',
    order: 4,
    items: [
      'Flutter',
      'Dart',
      'Riverpod',
      'GoRouter',
      'Dio',
      'PWA (Progressive Web App)',
      'API Integration',
    ],
  },
  {
    id: 'network',
    label: 'Jaringan & Infrastruktur',
    cvLabel: 'Jaringan',
    order: 5,
    items: [
      'MikroTik RouterOS',
      'Topologi LAN Bertingkat',
      'Switch Manageable',
      'Access Point (Router Mode AP)',
      'Hotspot & Voucher',
      'DHCP & Static IP',
      'Firewall Filter & Address List',
      'Bandwidth Management (rate-limit)',
      'DNS Filtering',
      'Kabel Cat 6 & Terminasi',
      'Gigabit Ethernet',
      'RouterOS API',
      'Winbox & Terminal RouterOS',
      'Monitoring Jaringan',
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    cvLabel: 'Tools',
    order: 6,
    items: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'VS Code',
      'Vite',
      'Composer',
      'npm',
      'Debugging',
      'Deployment (cPanel & SSH)',
      'Technical Documentation',
      'PHPUnit',
    ],
  },
  {
    id: 'additional',
    label: 'Additional Skills',
    cvLabel: 'Additional Skills',
    order: 7,
    subdued: true,
    items: [
      'Linux Server',
      'VPS',
      'Cloudflare',
      'Dapodik / Data Pokok Pendidikan',
      'AI-assisted Development',
    ],
  },
  {
    id: 'network-roadmap',
    label: 'Rencana Belajar Jaringan',
    cvLabel: 'Rencana Belajar',
    order: 8,
    subdued: true,
    items: [
      'Cisco CCNA (200-301)',
      'MTCNA (MikroTik Certified)',
      'VLAN & Trunk 802.1Q',
      'Inter-VLAN Routing',
      'Spanning Tree (STP/RSTP)',
      'Link Aggregation (LACP)',
      'Routing Statis & OSPF',
      'IPv6 Dasar',
      'RADIUS / User Manager',
      'VPN Site-to-Site',
      'PoE & Perancangan Kabel',
      'SNMP & Syslog',
    ],
  },
  {
    id: 'learning',
    label: 'Sedang Dipelajari',
    cvLabel: 'Sedang Dipelajari',
    order: 9,
    subdued: true,
    items: [
      'Microsoft SQL Server',
      'T-SQL',
      'CodeIgniter 4',
    ],
  },
];

export const skillGroupById = Object.fromEntries(
  skillGroups.map((group) => [group.id, group]),
) as Record<SkillGroup['id'], SkillGroup>;
