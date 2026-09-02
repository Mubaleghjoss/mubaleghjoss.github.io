import type { LearningProject } from '../types';

/**
 * Learning project = dibangun untuk menguasai teknologi tertentu, BUKAN
 * dipakai di produksi. Ditandai badge "Learning Project" agar pembaca CV
 * tidak salah menafsirkan pengalaman.
 *
 * Aturan: jangan pernah pindahkan item ke daftar produksi sebelum benar-benar
 * dipakai pengguna nyata. `status` harus mencerminkan keadaan repositori, dan
 * setiap angka di bawah harus berasal dari eksekusi nyata (bukan perkiraan).
 *
 * Format teks: `summary` cukup satu kalimat, detail teknis dipecah ke
 * `highlights` sebagai butir agar kartu bisa dipindai, bukan dibaca paragraf.
 */
export const learningProjects: LearningProject[] = [
  {
    slug: 'sql-procedures-lab',
    name: 'SQL Procedures Lab',
    positioning: 'Latihan logika sisi database',
    goal: 'Menguasai stored procedure, function, dan trigger: memindahkan aturan yang tidak boleh dilanggar dari aplikasi ke database.',
    summary:
      'Skema koperasi simpan pinjam pada MySQL/MariaDB dengan 3 function, 4 stored procedure transaksional, dan 5 trigger.',
    highlights: [
      'Procedure memakai START TRANSACTION, EXIT HANDLER, dan SIGNAL SQLSTATE untuk menolak input tidak sah.',
      'SELECT ... FOR UPDATE dengan urutan lock tetap agar transfer antar-anggota bebas deadlock.',
      'Tabel audit hanya diisi trigger, tidak pernah oleh aplikasi.',
    ],
    covers: [
      'Stored Procedure',
      'Database Function',
      'Trigger',
      'Transaksi & ROLLBACK',
      'SIGNAL SQLSTATE (custom error)',
      'Row lock (SELECT ... FOR UPDATE)',
      'Tabel audit append-only',
      'CHECK constraint',
    ],
    tech: ['MySQL', 'MariaDB', 'SQL', 'Bash'],
    status: 'done',
    repo: 'https://github.com/Mubaleghjoss/sql-procedures-lab',
    note: 'Terverifikasi di MariaDB 10.4.32 dan GitHub Actions (MySQL 8): 20 test lulus, 10 positif dan 10 negatif. Belum diuji di SQL Server.',
  },
  {
    slug: 'ci4-crud-lab',
    name: 'CI4 CRUD Lab',
    positioning: 'Latihan framework PHP kedua',
    goal: 'Memahami konvensi CodeIgniter 4 dan perbedaannya dengan Laravel yang saya pakai harian.',
    summary:
      'CRUD web dan REST API di atas satu model CodeIgniter 4, dengan aturan validasi yang didefinisikan sekali lalu dipakai bersama.',
    highlights: [
      'Migration, validasi di model, soft delete, dan pagination.',
      'ResourceController dengan kode status HTTP yang benar untuk jalur JSON.',
      'Satu sumber aturan validasi untuk antarmuka web dan API, tanpa duplikasi.',
    ],
    covers: [
      'CodeIgniter 4',
      'MVC',
      'Query Builder',
      'Validasi di model',
      'Soft delete',
      'REST API (ResourceController)',
      'PHPUnit feature test',
    ],
    tech: ['PHP 8.2', 'CodeIgniter 4.7', 'MySQL', 'SQLite', 'PHPUnit 10'],
    status: 'done',
    repo: 'https://github.com/Mubaleghjoss/ci4-crud-lab',
    note: 'Terverifikasi: 39 test / 88 assertion lulus di PHP 8.2 lokal serta GitHub Actions (PHP 8.2 dan 8.3), termasuk test negatif.',
  },
];

export const learningProjectBySlug = Object.fromEntries(
  learningProjects.map((p) => [p.slug, p]),
) as Record<string, LearningProject>;
