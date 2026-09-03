import type { Project } from '../types';

/**
 * Case study fitur AI pada situs sekolah.
 *
 * Aturan angka pada berkas ini: setiap angka harus bisa ditunjuk sumbernya.
 * - 873 baris  : wc -l atas lima kelas layanan AI (293 + 262 + 165 + 83 + 70).
 * - 42 metode test : hitung `public function test` pada sembilan berkas
 *   tests/Feature/Ai*.php dan PruneAiChatSessionsTest.php.
 * - 8 aturan pagar : daftar bernomor pada AiCsService::getSystemPrompt().
 * - 8 sumber konteks : blok bernomor 1-8 pada AiCsService::getSchoolKnowledge().
 *
 * TIDAK dicantumkan karena tidak ada buktinya: jumlah percakapan, tingkat
 * kepuasan pengguna, akurasi jawaban, penghematan biaya, dan rate limiting.
 *
 * `repo` sengaja tidak diisi: repositori aplikasi sekolah privat, dan aturan
 * repo ini melarang menautkan repositori yang menghasilkan 404 bagi pengunjung.
 */
export const aiCsSmaAfbs: Project = {
  slug: 'ai-cs-smaafbs',
  name: 'Asisten CS Berbasis LLM',
  org: 'SMA Al Furqon Boarding School',
  role: 'AI Application Engineer & Pengembang',
  positioning: 'Fitur LLM Produksi dengan Pagar Prompt',
  period: '2026 - sekarang',
  url: 'https://www.smaafbs.sch.id',
  featured: true,
  order: 5,
  summary:
    'Asisten percakapan pada situs sekolah yang menjawab hanya dari data resmi, dengan pagar prompt dan jalur eskalasi ke admin manusia.',
  highlights: [
    'System prompt berpagar delapan aturan: batas topik, anti-halusinasi, anti prompt injection, privasi, dan eskalasi.',
    'Konteks dirakit dari delapan sumber data sekolah plus data akademik live lewat REST API, bukan dari ingatan model.',
    'Provider dapat ditukar tanpa rilis ulang: jalur native Gemini dan jalur OpenAI-compatible, diatur dari panel admin.',
  ],
  cvPoints: [
    'Asisten CS berbasis LLM di situs sekolah: 873 baris pada lima kelas layanan Laravel, dengan 42 metode test fitur.',
    'System prompt berpagar 8 aturan; konteks dirakit dari 8 sumber data resmi agar jawaban tidak keluar dari sumbernya.',
    'Dua jalur provider (Gemini native dan OpenAI-compatible), jawaban dialirkan lewat Server-Sent Events.',
    'Eskalasi ke WhatsApp admin untuk hal yang butuh keputusan resmi, plus pemangkasan data sesi terjadwal.',
  ],
  problem: [
    'Pertanyaan calon wali murid masuk lewat WhatsApp admin sepanjang hari, dan sebagian besar isinya berulang: biaya, alur pendaftaran, fasilitas, dan aturan asrama.',
    'Jawaban bergantung pada siapa yang sedang memegang ponsel admin, sehingga rincian yang sama bisa tersampaikan berbeda.',
    'Informasi resmi sudah ada di situs dan di portal akademik, tetapi tersebar di banyak halaman sehingga jarang benar-benar dibaca.',
    'Memasang chatbot LLM apa adanya justru berbahaya untuk sekolah: model akan mengarang biaya, kuota, dan tanggal yang tidak pernah ada.',
    'Data pribadi siswa dan wali murid tidak boleh keluar lewat jalur percakapan publik, sekalipun pengunjung memintanya dengan alasan yang terdengar masuk akal.',
  ],
  solution: [
    'Perakit konteks mengumpulkan delapan bagian data resmi dari basis data sekolah, lalu menyisipkannya ke instruksi sistem pada setiap permintaan.',
    'Statistik akademik diambil live dari portal akademik lewat REST API, sehingga angka yang disebut mengikuti keadaan terkini.',
    'System prompt memuat delapan aturan pagar bernomor, termasuk kalimat penolakan baku yang dipakai ketika data tidak tersedia.',
    'Aturan anti prompt injection membuat permintaan mengubah peran atau membocorkan instruksi sistem ditolak, bukan dilayani.',
    'Lapisan provider memisahkan jalur native Gemini dari jalur OpenAI-compatible, sehingga model dan base URL dapat diganti dari panel admin.',
    'Jawaban dialirkan lewat Server-Sent Events agar pengunjung melihat balasan tumbuh, dengan parser cadangan saat provider mengirim potongan streaming meski diminta tidak.',
    'Hal yang butuh keputusan resmi, verifikasi berkas, atau pembayaran diarahkan ke WhatsApp admin, lengkap dengan ringkasan percakapan.',
    'Sesi percakapan disimpan sebagai milik server dan dipangkas berkala lewat perintah terjadwal, sehingga data tidak menumpuk tanpa batas.',
  ],
  myRole: [
    'Merancang dan menulis seluruh lapisan layanan AI: perakit konteks, lapisan provider, pengelola sesi, dan layanan eskalasi.',
    'Menyusun system prompt beserta delapan aturan pagarnya, termasuk kalimat penolakan baku dan batas gaya bahasa.',
    'Membangun perakit konteks yang menggabungkan delapan sumber data sekolah menjadi satu instruksi sistem.',
    'Mengintegrasikan portal akademik lewat REST API agar konteks memuat data live, bukan salinan yang basi.',
    'Menerapkan streaming Server-Sent Events beserta parser cadangan untuk provider yang berperilaku di luar spesifikasi.',
    'Menulis 42 metode test fitur yang menutup jalur API, sesi, eskalasi WhatsApp, tata letak widget, dan pemangkasan data.',
    'Membangun repo publik ai-engineering-lab untuk mengubah delapan aturan pagar itu menjadi 33 kasus uji yang bisa dijalankan ulang.',
  ],
  architecture: `PENGUNJUNG
      |
      v
ANTARMUKA CHAT           -- widget pada situs sekolah
      |
      v
PENGELOLA SESI           -- sesi milik server, idempotency key
      |
      v
PERAKIT KONTEKS          -- 8 sumber data resmi
      |         |
      |         +-------- API Akademik Live (REST)
      |
      +---------------- Knowledge Base Sekolah (basis data)
      |
      v
PAGAR PROMPT             -- 8 aturan: lingkup, anti-halusinasi,
      |                     rujukan sumber, larangan topik,
      |                     anti prompt injection, privasi,
      |                     eskalasi, gaya bahasa
      v
LAPISAN PROVIDER
      |         |
      v         v
   Gemini    OpenAI-compatible
      |         |
      +----+----+
           v
     JAWABAN MODEL
           |
           v
      STREAM SSE
           |
      +----+-----------+
      v                v
Jawaban ke        Eskalasi ke
pengunjung        admin (WhatsApp)`,
  workflow: `Pengunjung mengirim pesan
      |   POST /api/ai-cs/sessions  (validasi: max 1000 karakter)
      v
Sesi dibuat atau dilanjutkan     -- publicId, idempotency key
      |
      v
Konteks dirakit ulang            -- knowledge admin, profil, sejarah, visi,
      |                             misi, 29 karakter, 3 pilar, fasilitas,
      |                             kegiatan, statistik live
      v
Instruksi sistem = pagar prompt + konteks
      |
      v
Provider dipanggil               -- riwayat dipotong 6 pesan terakhir
      |                             temperature 0.4, maxOutputTokens 800
      v
Jawaban dialirkan                -- text/event-stream, X-Accel-Buffering: no
      |
      v
Butuh keputusan resmi?
      |                    ya --> ringkasan diteruskan ke WhatsApp admin
      v tidak
Percakapan diarsipkan            -- dipangkas berkala oleh ai-chat:prune`,
  features: [
    {
      title: 'Pagar prompt delapan aturan',
      detail:
        'Batas ruang lingkup, anti-halusinasi, rujukan sumber, larangan topik, anti prompt injection, privasi, eskalasi, dan gaya bahasa, ditulis sebagai aturan bernomor pada instruksi sistem.',
    },
    {
      title: 'Perakit konteks dari data resmi',
      detail:
        'Delapan bagian data sekolah dikumpulkan dari basis data pada setiap permintaan, sehingga perubahan konten di panel admin langsung tercermin pada jawaban.',
    },
    {
      title: 'Data akademik live',
      detail:
        'Statistik sekolah diambil dari portal akademik lewat REST API, bukan disalin manual, agar angka yang disebut tidak menjadi basi.',
    },
    {
      title: 'Knowledge base yang dapat disunting admin',
      detail:
        'Isi pengetahuan tambahan, prompt sistem, model, dan base URL provider disunting dari halaman pengaturan, tanpa menyentuh kode.',
    },
    {
      title: 'Dua jalur provider',
      detail:
        'Jalur native Gemini dipakai bila base URL kosong, dan jalur OpenAI-compatible dipakai bila base URL diisi, sehingga penyedia dapat ditukar tanpa rilis ulang.',
    },
    {
      title: 'Streaming Server-Sent Events',
      detail:
        'Jawaban dikirim sebagai text/event-stream dengan penonaktifan buffering proxy, sehingga balasan panjang tidak terasa menggantung.',
    },
    {
      title: 'Parser cadangan potongan streaming',
      detail:
        'Bila provider mengirim potongan bergaya SSE meski permintaan menyatakan stream nonaktif, potongan itu tetap disatukan menjadi jawaban utuh alih-alih gagal.',
    },
    {
      title: 'Sesi milik server',
      detail:
        'Identitas sesi ditentukan server dan dilanjutkan lewat endpoint resume, sehingga riwayat percakapan tidak dapat dipalsukan dari sisi peramban.',
    },
    {
      title: 'Kunci idempotensi',
      detail:
        'Pesan yang dikirim ulang karena jaringan terputus tidak menghasilkan jawaban ganda maupun panggilan model kedua.',
    },
    {
      title: 'Riwayat dipotong enam pesan',
      detail:
        'Hanya enam pesan terakhir dikirim ke model, membatasi panjang permintaan sekaligus menjaga percakapan tetap nyambung.',
    },
    {
      title: 'Eskalasi ke admin manusia',
      detail:
        'Pertanyaan yang menyangkut keputusan resmi, verifikasi berkas, atau pembayaran diarahkan ke WhatsApp admin beserta konteks percakapannya.',
    },
    {
      title: 'Pemangkasan data sesi',
      detail:
        'Perintah terjadwal memangkas sesi dan pesan lama agar tabel percakapan tidak tumbuh tanpa batas dan data tidak disimpan lebih lama dari perlunya.',
    },
    {
      title: 'Pesan cadangan yang santun',
      detail:
        'Bila kunci API belum terpasang atau provider gagal, pengunjung menerima kalimat santun berisi arahan ke admin, bukan pesan galat teknis.',
    },
  ],
  tech: [
    {
      label: 'AI & LLM',
      items: [
        'LLM API Integration',
        'Prompt Guardrails',
        'Anti-Prompt Injection',
        'Grounded Context Assembly',
        'Server-Sent Events',
        'Provider Abstraction',
      ],
    },
    {
      label: 'Provider',
      items: ['Gemini API', 'OpenAI-compatible API', 'LLM Gateway'],
    },
    {
      label: 'Aplikasi',
      items: ['PHP', 'Laravel', 'MySQL', 'Blade', 'Alpine.js', 'REST API'],
    },
    {
      label: 'Pengujian & Operasional',
      items: ['PHPUnit', 'Scheduled Command', 'Git', 'GitHub Actions'],
    },
  ],
  process: [
    'Mengumpulkan pertanyaan yang paling sering masuk ke admin, lalu memetakannya ke data resmi yang sudah ada di basis data sekolah.',
    'Menulis system prompt beserta pagar aturannya lebih dulu, sebelum menyentuh integrasi provider.',
    'Membangun perakit konteks agar jawaban punya sumber, lalu menambahkan pengambilan data akademik live.',
    'Memisahkan lapisan provider sejak awal supaya penggantian penyedia tidak menyentuh logika percakapan.',
    'Menambahkan streaming setelah jalur non-streaming terbukti benar, lalu menangani provider yang tidak patuh spesifikasi.',
    'Menulis test fitur untuk jalur API, sesi, eskalasi, dan pemangkasan data.',
    'Memindahkan pagar prompt menjadi kasus uji terukur di repo publik ai-engineering-lab, agar perubahan prompt bisa diuji regresi.',
  ],
  challenges: [
    {
      problem:
        'Model bahasa cenderung melengkapi jawaban dengan angka yang terdengar wajar: biaya, kuota, dan tanggal yang tidak pernah ada di data sekolah.',
      solution:
        'Aturan anti-halusinasi menyediakan kalimat penolakan baku dan mewajibkan jawaban bersumber dari konteks, sehingga ketidaktahuan disampaikan terbuka alih-alih ditutup dengan karangan.',
    },
    {
      problem:
        'Pengunjung dapat meminta model mengubah peran atau membocorkan instruksi sistemnya, dan model yang tidak dipagari akan menurut.',
      solution:
        'Aturan anti prompt injection memerintahkan model mengabaikan permintaan mengubah peran atau menampilkan data internal, lalu perilaku itu diuji terpisah lewat kasus uji suntikan di repo lab.',
    },
    {
      problem:
        'Menyalin data sekolah ke dalam prompt secara manual membuat jawaban menjadi basi setiap kali konten di situs diperbarui.',
      solution:
        'Konteks dirakit ulang dari basis data pada setiap permintaan, dan statistik akademik diambil live lewat REST API.',
    },
    {
      problem:
        'Salah satu provider mengirim potongan bergaya streaming meski permintaan menyatakan stream nonaktif, sehingga jawaban terbaca kosong.',
      solution:
        'Menambahkan parser cadangan yang mengenali potongan bergaya SSE pada badan respons dan menyatukannya menjadi jawaban utuh.',
    },
    {
      problem:
        'Mengunci diri pada satu penyedia model berisiko: harga, kuota, dan ketersediaan berubah di luar kendali sekolah.',
      solution:
        'Memisahkan lapisan provider dan memindahkan model, base URL, serta prompt ke pengaturan admin, sehingga perpindahan penyedia tidak menyentuh kode.',
    },
    {
      problem:
        'Jawaban panjang membuat pengunjung mengira layanan menggantung, terutama pada jaringan ponsel yang lambat.',
      solution:
        'Mengalirkan jawaban lewat Server-Sent Events dan menonaktifkan buffering proxy, sehingga teks tumbuh sejak potongan pertama.',
    },
    {
      problem:
        'Percakapan yang tersimpan tanpa batas menumpuk data pengunjung lebih lama dari yang diperlukan.',
      solution:
        'Menambahkan perintah pemangkasan terjadwal untuk sesi dan pesan lama, sehingga penyimpanan tetap sebatas kebutuhan operasional.',
    },
    {
      problem:
        'Prompt yang ditulis sekali lalu dipercaya tidak memberi cara mengetahui apakah perubahan kalimat memperbaiki atau merusak perilakunya.',
      solution:
        'Membangun repo publik ai-engineering-lab: delapan aturan pagar diubah menjadi 33 kasus uji dengan penilai deterministik, sehingga perubahan prompt bisa diukur, bukan ditebak.',
    },
  ],
  screenshots: [],
  results: [
    'Asisten berjalan di situs resmi sekolah dan menjawab pertanyaan umum dari data resmi yang sama dengan yang dipakai admin.',
    'Pertanyaan yang menyangkut keputusan resmi atau data pribadi diarahkan ke admin manusia, bukan dijawab sendiri oleh model.',
    'Penyedia model, nama model, prompt, dan isi pengetahuan dapat diganti dari panel admin tanpa rilis ulang aplikasi.',
    'Pagar prompt yang dipakai di produksi kini punya kasus uji yang dapat dijalankan ulang di repo publik ai-engineering-lab.',
  ],
  metrics: [
    { label: 'Baris kode lima kelas layanan AI', value: '873', source: 'wc -l lima kelas layanan AI' },
    { label: 'Metode test fitur AI', value: '42', source: 'hitung metode test pada tests/Feature/Ai*.php' },
    { label: 'Aturan pagar pada system prompt', value: '8', source: 'daftar bernomor pada getSystemPrompt()' },
    { label: 'Sumber data perakit konteks', value: '8', source: 'blok bernomor pada getSchoolKnowledge()' },
  ],
  cvProfiles: ['ai-engineer'],
};
