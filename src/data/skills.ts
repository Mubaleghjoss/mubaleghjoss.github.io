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
 * - ai                             : TERVERIFIKASI dari asisten CS berbasis LLM
 *   yang berjalan di situs sekolah (873 baris pada lima kelas layanan Laravel,
 *   system prompt 8 aturan pagar, konteks dari 8 sumber data, dua jalur
 *   provider, SSE streaming) dan dari repo publik ai-engineering-lab
 *   (114 test lulus: guardrail eval, RAG baseline, structured output).
 * - ai-automation                  : TERVERIFIKASI dari 116 SKILL.md prosedur
 *   agen terpasang, 2 server MCP aktif, gateway LLM lokal multi-provider yang
 *   dioperasikan sendiri, dan pipeline media Python 1.252 baris dengan
 *   faster-whisper 1.2.1. Catatan kejujuran: gateway DIOPERASIKAN, bukan
 *   dibangun; MCP DIPAKAI, server MCP sendiri belum dibangun.
 * - ai-roadmap                     : BELUM dikuasai. Rencana belajar, dipisah
 *   tegas agar tidak terbaca sebagai pengalaman. Tool calling, vector database,
 *   MCP server sendiri, observability, dan token/cost tracking ada di sini
 *   justru karena belum ada implementasi nyatanya.
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
 *
 * BATAS PANJANG ITEM: `.cv-skill-item` memakai `white-space: nowrap`, sehingga
 * satu item yang terlalu panjang tidak dapat dipecah dan akan mendorong lebar
 * halaman melebihi layar 390px. Jaga tiap item di bawah ~34 karakter; bila
 * butuh lebih panjang, pecah menjadi dua item. Gate `npm run verify:browser`
 * menangkap pelanggaran ini sebagai `overflow=true` pada viewport mobile.
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
    id: 'ai',
    label: 'AI Application Engineering',
    cvLabel: 'AI & LLM',
    order: 6,
    items: [
      'LLM API Integration',
      'Gemini & OpenAI-compatible API',
      'Prompt Engineering',
      'AI Guardrails',
      'Anti-Prompt Injection',
      'Grounded Context Assembly',
      'Server-Sent Events (streaming)',
      'LLM Session & State Management',
      'Human-in-the-loop Handoff',
      'Provider-agnostic Integration',
      'Provider Fallback & Error Handling',
      'LLM Evaluation Harness',
      'Structured Output (JSON Schema)',
      'Retrieval & Chunking (BM25)',
    ],
  },
  {
    id: 'ai-automation',
    label: 'Agentic AI & Automation',
    cvLabel: 'Agentic AI & Automation',
    order: 7,
    items: [
      'Agentic Development Workflows',
      'MCP-based Tool Integration',
      'AI Agent Skills / Procedures',
      'Context-aware Agent Workflows',
      'Multi-model Routing (LLM Gateway)',
      'AI-assisted Software Development',
      'Python Automation',
      'Speech-to-Text (faster-whisper)',
      'Automated Media Pipeline',
      'LLM-assisted Workflow Automation',
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    cvLabel: 'Tools',
    order: 8,
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
      'pytest',
    ],
  },
  {
    id: 'additional',
    label: 'Additional Skills',
    cvLabel: 'Additional Skills',
    order: 9,
    subdued: true,
    items: [
      'Linux Server',
      'VPS',
      'Cloudflare',
      'Dapodik / Data Pokok Pendidikan',
    ],
  },
  {
    id: 'network-roadmap',
    label: 'Rencana Belajar Jaringan',
    cvLabel: 'Rencana Belajar',
    order: 10,
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
    id: 'ai-roadmap',
    label: 'Rencana Belajar AI & Agentic',
    cvLabel: 'Rencana Belajar AI',
    order: 11,
    subdued: true,
    items: [
      'Tool Calling / Function Calling',
      'Embeddings & Vector Database',
      'pgvector & Qdrant',
      'Agent Memory Jangka Panjang',
      'MCP Server Buatan Sendiri',
      'Observability & Tracing LLM',
      'Token Telemetry & Cost Tracking',
      'Multi-step Agent Orchestration',
      'Multi-agent Workflow',
      'Local Inference & Fine-tuning',
    ],
  },
  {
    id: 'learning',
    label: 'Sedang Dipelajari',
    cvLabel: 'Sedang Dipelajari',
    order: 12,
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
