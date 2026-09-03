export type CvProfileId =
  | 'developer'
  | 'network-engineer'
  | 'it-support'
  | 'general';

export type Profile = {
  name: string;
  headline: string;
  subheadline: string[];
  /** Satu kalimat pembuka pada hero. */
  heroLead: string;
  /** Butir "cara kerja" pada section Tentang. Ditulis sebagai pointer, bukan paragraf. */
  workingStyle: string[];
  location: string;
  locationShort: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  githubUser: string;
  linkedin: string;
  photo: string;
  availableForWork: boolean;
  startedYear: number;
};

export type SkillGroupId =
  | 'backend'
  | 'frontend'
  | 'database'
  | 'mobile'
  | 'network'
  | 'network-roadmap'
  | 'tools'
  | 'additional'
  | 'learning';

export type SkillGroup = {
  id: SkillGroupId;
  label: string;
  cvLabel: string;
  items: string[];
  order: number;
  subdued?: boolean;
};

export type Experience = {
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  summary?: string;
  bullets: string[];
  /**
   * Ringkasan pengganti untuk profil CV tertentu, dipakai bersama
   * `profileBullets` agar satu peran nyata bisa disorot sesuai sasaran CV.
   */
  profileSummary?: Partial<Record<CvProfileId, string>>;
  /**
   * Butir pengganti untuk profil CV tertentu. Pekerjaan yang sama bisa perlu
   * disorot berbeda: CV jaringan tidak butuh butir soal Filament, dan CV
   * developer tidak butuh butir soal terminasi kabel. Bila sebuah profil tidak
   * punya entri di sini, `bullets` yang dipakai.
   */
  profileBullets?: Partial<Record<CvProfileId, string[]>>;
  tech?: string[];
  cvProfiles: CvProfileId[];
};

export type Education = {
  degree: string;
  field: string;
  institution: string;
  start: string;
  end: string;
  notes?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
};

export type Capability = {
  title: string;
  detail: string;
};

export type ProjectFeature = {
  title: string;
  detail: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
  source: string;
};

export type Project = {
  slug: string;
  name: string;
  org: string;
  role: string;
  positioning: string;
  /** Satu kalimat: aplikasi apa ini. Detail dipecah ke `highlights`. */
  summary: string;
  /** Butir pemindai pada kartu project (landing dan daftar project). */
  highlights: string[];
  /** Butir ringkas untuk bagian "Project Terpilih" pada CV/PDF. */
  cvPoints: string[];
  period: string;
  url?: string;
  repo?: string;
  featured: boolean;
  order: number;
  problem: string[];
  solution: string[];
  myRole: string[];
  architecture: string;
  workflow?: string;
  features: ProjectFeature[];
  tech: { label: string; items: string[] }[];
  process: string[];
  challenges: { problem: string; solution: string }[];
  screenshots: ProjectScreenshot[];
  results: string[];
  metrics: ProjectMetric[];
  cvProfiles: CvProfileId[];
};

export type CvProfile = {
  id: CvProfileId;
  label: string;
  headline: string;
  /** Satu sampai dua kalimat pembuka bagian Profil pada CV. */
  summary: string;
  /** Butir penguat di bawah `summary`, agar Profil terbaca sekilas. */
  summaryPoints: string[];
  fileName: string;
  skillGroups: SkillGroupId[];
  featuredProjects: string[];
  showCertifications: boolean;
  showAdditionalSkills: boolean;
};

export type MiniProject = {
  name: string;
  positioning: string;
  summary: string;
  tech: string[];
  url?: string;
  repo?: string;
};

/** Label kejujuran pada kartu project. */
export type ProjectBadge = 'production' | 'learning';

export type LearningProject = {
  slug: string;
  name: string;
  positioning: string;
  goal: string;
  /** Satu kalimat: apa yang dibangun. Detail teknis masuk ke `highlights`. */
  summary: string;
  /** Butir teknis yang bisa dipindai; menggantikan paragraf panjang di kartu. */
  highlights: string[];
  covers: string[];
  tech: string[];
  status: 'planned' | 'in-progress' | 'done';
  repo?: string;
  url?: string;
  note: string;
};
