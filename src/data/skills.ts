import type { SkillGroup } from './types';

/**
 * Status verifikasi (audit repositori lokal + GitHub, 2026-09-01):
 * - backend/frontend/database/tools : TERVERIFIKASI dari kode produksi
 *   (akses2-laravel, pkg-v3, bendahara.smaafbs, humas, spmb, loker).
 * - mobile (Flutter/Dart)          : TERVERIFIKASI dari repo
 *   github.com/Mubaleghjoss/pkg_mobile_app (99 file Dart, 93 test lulus,
 *   APK debug berjalan di perangkat fisik). Learning project, belum rilis.
 * - learning                       : dibuktikan lewat repo lab sendiri
 *   (sql-procedures-lab, ci4-crud-lab) — bukan pengalaman produksi, jadi
 *   dipisahkan ke grup "Sedang Dipelajari" dan tidak diklaim di skill utama.
 *   Microsoft SQL Server / T-SQL tetap di sini: konsep SP/trigger/function
 *   sudah dipraktikkan di MySQL, tetapi belum pernah dijalankan di SQL Server.
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
    id: 'learning',
    label: 'Sedang Dipelajari',
    cvLabel: 'Sedang Dipelajari',
    order: 7,
    subdued: true,
    items: [
      'Microsoft SQL Server',
      'T-SQL',
      'CodeIgniter 4',
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    cvLabel: 'Tools',
    order: 5,
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
    order: 6,
    subdued: true,
    items: [
      'Linux Server',
      'VPS',
      'Cloudflare',
      'Networking',
      'MikroTik RouterOS',
      'Dapodik / Data Pokok Pendidikan',
      'AI-assisted Development',
    ],
  },
];

export const skillGroupById = Object.fromEntries(
  skillGroups.map((group) => [group.id, group]),
) as Record<SkillGroup['id'], SkillGroup>;
