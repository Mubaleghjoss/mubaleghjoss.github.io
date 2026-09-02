import type { MiniProject, Project } from '../types';
import { smaAfbs } from './sma-afbs';
import { pkgPanunggangan } from './pkg-panunggangan';
import { pkgMobileApp } from './pkg-mobile-app';

export { learningProjects, learningProjectBySlug } from './learning';

export const projects: Project[] = [smaAfbs, pkgPanunggangan, pkgMobileApp].sort(
  (a, b) => a.order - b.order,
);

export const featuredProjects = projects.filter((p) => p.featured);

export const projectBySlug = Object.fromEntries(
  projects.map((p) => [p.slug, p]),
) as Record<string, Project>;

/**
 * Aplikasi lain yang dibangun/dipelihara.
 *
 * Aturan: `repo` HANYA dicantumkan bila repositorinya publik, supaya pengunjung
 * tidak pernah mendapat 404. Repo privat cukup diwakili `url` aplikasi live.
 * Diverifikasi tanpa token (sudut pandang pengunjung anonim) pada 2026-09-02.
 */
export const otherProjects: MiniProject[] = [
  {
    name: 'Website Sekolah SMA AFBS',
    positioning: 'Profil sekolah & publikasi',
    summary:
      'Situs resmi sekolah berisi profil, berita, dan informasi penerimaan, dengan pembaruan konten lewat panel admin.',
    tech: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL'],
    url: 'https://www.smaafbs.sch.id',
  },
  {
    name: 'SPMB / Seleksi Siswa Baru',
    positioning: 'Pendaftaran & seleksi',
    summary:
      'Aplikasi pendaftaran calon siswa: formulir bertahap, verifikasi berkas, penjadwalan seleksi, sampai pengumuman hasil.',
    tech: ['Laravel', 'Livewire', 'MySQL'],
    url: 'https://seleksi.smaafbs.sch.id',
    repo: 'https://github.com/Mubaleghjoss/spmb-smaafbs',
  },
  {
    name: 'Loker SMA AFBS',
    positioning: 'Rekrutmen internal',
    summary:
      'Portal lowongan dan pendaftaran calon tenaga pendidik beserta pengelolaan berkas pelamar.',
    tech: ['Laravel', 'Blade', 'MySQL'],
    url: 'https://loker.smaafbs.sch.id',
    repo: 'https://github.com/Mubaleghjoss/loker-smaafbs',
  },
  {
    name: 'Keuangan / Bendahara Sekolah',
    positioning: 'REST API + antarmuka SPA',
    summary:
      'Backend REST API terpisah dari antarmuka web, untuk pencatatan tagihan dan pembayaran sekolah.',
    tech: ['Laravel', 'REST API', 'React', 'TypeScript'],
    repo: 'https://github.com/Mubaleghjoss/keuangan-smaafbs',
  },
  {
    name: 'Aplikasi Catatan Humas',
    positioning: 'Dokumentasi kegiatan',
    summary:
      'Aplikasi pencatatan kegiatan hubungan masyarakat sekolah dengan basis data terstruktur.',
    tech: ['TypeScript', 'Next.js', 'Prisma'],
    repo: 'https://github.com/Mubaleghjoss/humas',
  },
  {
    name: 'RPP Mingguan',
    positioning: 'Administrasi pembelajaran',
    summary:
      'Aplikasi penyusunan dan pengumpulan rencana pembelajaran mingguan guru.',
    tech: ['PHP', 'MySQL'],
    repo: 'https://github.com/Mubaleghjoss/RPP-MINGGUAN',
  },
];
