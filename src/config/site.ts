import { profile } from '../data/profile';

export const site = {
  siteName: 'Putra Kamulyan',
  url: 'https://mubaleghjoss.github.io',
  base: '/',
  title: 'Putra Kamulyan — Full-Stack Web & Mobile Developer',
  description:
    'Portfolio dan CV Putra Kamulyan, Full-Stack Developer (PHP, Laravel, MySQL, REST API, Flutter). Membangun sistem akademik, administrasi, dan pembinaan yang dipakai di produksi.',
  author: profile.name,
  locale: 'id-ID',

  // tampilan
  accent: 'slate-blue' as const,
  defaultColorScheme: 'light' as const,
  showPhoto: true,
  showAvailability: true,
  showExperience: true,
  showEducation: true,
  showCertifications: false,
  showAdditionalSkills: true,
  showProjectStats: true,
  showContact: true,
  showWhatsappOnWeb: false,
  showWhatsappOnCv: true,
  showOtherProjects: true,
  showLearningProjects: true,
  numberFeaturedProjects: 2,

  // CV
  cvPaperSize: 'A4' as const,
  defaultCvProfile: 'developer' as const,
  pdfMode: 'build-time' as const,
} as const;
