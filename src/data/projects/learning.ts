import type { LearningProject } from '../types';

/**
 * Learning project = dibangun untuk menguasai teknologi tertentu, BUKAN
 * dipakai di produksi. Ditandai badge "Learning Project" agar pembaca CV
 * tidak salah menafsirkan pengalaman.
 *
 * Aturan: jangan pernah pindahkan item ke daftar produksi sebelum benar-benar
 * dipakai pengguna nyata. `status` harus mencerminkan keadaan repositori, dan
 * setiap angka di bawah harus berasal dari eksekusi nyata (bukan perkiraan).
 */
export const learningProjects: LearningProject[] = [
  {
    slug: 'sql-procedures-lab',
    name: 'SQL Procedures Lab',
    positioning: 'Latihan logika sisi database',
    goal: 'Menguasai stored procedure, function, dan trigger: memindahkan aturan yang tidak boleh dilanggar dari aplikasi ke database.',
    summary:
      'Skema koperasi simpan pinjam pada MySQL/MariaDB dengan 3 function, 4 stored procedure transaksional, dan 5 trigger. Procedure memakai START TRANSACTION + EXIT HANDLER + SIGNAL SQLSTATE untuk menolak input tidak sah, dan SELECT ... FOR UPDATE dengan urutan lock tetap agar transfer antar-anggota bebas deadlock. Tabel audit hanya diisi trigger, tidak pernah oleh aplikasi.',
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
    note: 'Terverifikasi di MariaDB 10.4.32 dan lewat GitHub Actions (MySQL 8): 20 test lulus (10 positif, 10 negatif). Test negatif membuktikan database menolak operasi tidak sah DAN tidak meninggalkan data separuh. Belum diuji di SQL Server.',
  },
  {
    slug: 'ci4-crud-lab',
    name: 'CI4 CRUD Lab',
    positioning: 'Latihan framework PHP kedua',
    goal: 'Memahami konvensi CodeIgniter 4 dan perbedaannya dengan Laravel yang saya pakai harian.',
    summary:
      'CRUD web dan REST API di atas satu model CodeIgniter 4: migration, validasi di model, soft delete, pagination, dan ResourceController dengan kode status HTTP yang benar. Aturan validasi didefinisikan sekali di model lalu dipakai bersama antarmuka web dan JSON, sehingga tidak ada aturan yang disalin dua kali.',
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
    note: 'Terverifikasi: 39 test / 88 assertion lulus di PHP 8.2 lokal, dan lewat GitHub Actions pada PHP 8.2 serta 8.3. Termasuk test negatif — data tidak valid ditolak dan database tetap kosong — serta bukti output ter-escape sehingga <script> tidak lolos ke HTML.',
  },
];

export const learningProjectBySlug = Object.fromEntries(
  learningProjects.map((p) => [p.slug, p]),
) as Record<string, LearningProject>;
