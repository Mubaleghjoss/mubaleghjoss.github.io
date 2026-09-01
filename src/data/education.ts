import type { Certification, Education } from './types';

export const education: Education[] = [
  {
    degree: 'Sarjana (S1)',
    field: 'Teknik Informatika',
    institution: 'Universitas Pamulang',
    start: '2017',
    end: '2022',
  },
];

/**
 * Pemilik CV memilih untuk tidak mencantumkan sertifikat.
 * Bukti kerja disajikan lewat repositori publik + tangkapan layar aplikasi.
 */
export const certifications: Certification[] = [];
