export type PersonaPortfolio = {
  fullName: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
};

export type HeroPortfolio = {
  headline: string;
  sideLabels: readonly string[];
  summary: string;
};

export type SobreMiPortfolio = {
  title: string;
  paragraphs: readonly string[];
};

export type ProyectoPortfolio = {
  name: string;
  description: string;
  stack: readonly string[];
  liveUrl: string;
  repoUrl: string;
};

export type HabilidadesPortfolio = {
  frontend: readonly string[];
  backend: readonly string[];
  product: readonly string[];
};

export type ExperienciaItemPortfolio = {
  role: string;
  company: string;
  period: string;
  details: string;
};

export type FormacionPortfolio = {
  title: string;
  item: string;
};

export type ContactoPortfolio = {
  title: string;
  description: string;
  cta: string;
};

export type PortfolioData = {
  person: PersonaPortfolio;
  hero: HeroPortfolio;
  about: SobreMiPortfolio;
  projects: readonly ProyectoPortfolio[];
  skills: HabilidadesPortfolio;
  experience: readonly ExperienciaItemPortfolio[];
  education: FormacionPortfolio;
  contact: ContactoPortfolio;
};
