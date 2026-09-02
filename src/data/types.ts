export type CvProfileId = 'developer' | 'it-support' | 'general';

export type Profile = {
  name: string;
  headline: string;
  subheadline: string[];
  /** Ringkas untuk hero (2 kalimat). Dipisah dari `summary` agar hero tidak padat. */
  heroLead: string;
  summary: string;
  /** Paragraf cara kerja pada section Tentang; disimpan di data, bukan di komponen. */
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
  summary: string;
  cvSummary: string;
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
  summary: string;
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
  summary: string;
  covers: string[];
  tech: string[];
  status: 'planned' | 'in-progress' | 'done';
  repo?: string;
  url?: string;
  note: string;
};
