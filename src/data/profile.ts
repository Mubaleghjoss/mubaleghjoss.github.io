import type { Profile } from './types';

export const profile: Profile = {
  name: 'Putra Kamulyan',
  headline: 'Full-Stack Web & Mobile Developer',
  subheadline: ['PHP', 'Laravel', 'MySQL', 'REST API', 'Flutter'],
  heroLead:
    'Sejak 2023 saya membangun dan merawat sistem informasi yang dipakai setiap hari oleh sebuah sekolah dan sebuah lembaga pembinaan.',
  /**
   * Ditulis sebagai butir pendek, bukan paragraf: pembaca halaman profil
   * umumnya memindai, bukan membaca berurutan. Satu butir = satu gagasan.
   */
  workingStyle: [
    'Mulai dari proses nyata — menemui pengguna, memetakan alur kerjanya, lalu menentukan data dan aturan yang dibutuhkan.',
    'Merancang basis data lebih dulu: relasi, migration, dan indeks, sebelum satu fitur pun ditulis.',
    'Membangun backend dan frontend sendiri, termasuk tampilan yang nyaman dipakai dari ponsel.',
    'Menerapkan hak akses per peran, sehingga setiap pengguna hanya melihat data yang menjadi tanggung jawabnya.',
    'Menguji dengan data nyata, lalu merawat aplikasi setelah dipakai — pekerjaan tidak berhenti di serah terima.',
    'Menuliskan dokumentasi dan panduan singkat agar operator lain bisa melanjutkan.',
  ],
  location:
    'Kp. Sawah Dalam, Panunggangan Utara, Pinang, Kota Tangerang, Banten',
  locationShort: 'Kota Tangerang, Banten',
  email: 'kamulyan1996@gmail.com',
  phone: '083818393029',
  whatsapp: '6283818393029',
  github: 'https://github.com/Mubaleghjoss',
  githubUser: 'Mubaleghjoss',
  linkedin: 'https://www.linkedin.com/in/putrakamulyan/',
  photo: '/images/profile/avatar.png',
  availableForWork: true,
  startedYear: 2023,
};
