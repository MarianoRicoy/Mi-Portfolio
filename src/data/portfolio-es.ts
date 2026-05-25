import type { PortfolioData } from "@/types/portfolio";

export const portfolioEs = {
  person: {
    fullName: "Mariano Federico Ricoy",
    role: "Frontend Developer",
    location: "Miramar, Buenos Aires, Argentina",
    email: "hola@marianoricoy.dev",
    linkedin: "https://www.linkedin.com/in/marianoricoy",
    github: "https://github.com/marianoricoy",
    cvLabel: "Descargar CV",
    cvUrl: "https://www.linkedin.com/in/marianoricoy",
  },
  hero: {
    headline: "FRONTEND DEVELOPER",
    sideLabels: ["DISEÑO WEB (UX/UI)", "DESARROLLO WEB"],
    summary:
      "Transformo ideas en experiencias digitales robustas, escalables y enfocadas en resultados de negocio.",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Soy Full Stack Developer con una sólida especialización en Frontend. Me dedico a la construcción de plataformas digitales robustas, combinando código limpio e interfaces de alta calidad con una fuerte visión de producto.",
      "Evito la sobreingeniería por principio. Priorizo las decisiones técnicas estratégicas para entregar soluciones que sean eficientes, mantenibles y preparadas para escalar, asegurando que la arquitectura elegida aporte valor real al proyecto.",
      "Actualmente, aplico esta metodología y experiencia como Co-Founder y Frontend Lead en Tech With Soul, donde mi objetivo principal es conectar los requerimientos comerciales con experiencias de usuario de excelencia."
    ],
  },
  projects: [
    {
      name: "Plataforma institucional TWS",
      description:
        "Arquitectura frontend y experiencia de marca para la plataforma institucional de Tech With Soul.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://www.linkedin.com/in/marianoricoy",
      repoUrl: "https://github.com/marianoricoy",
    },
    {
      name: "Dashboard para clientes",
      description:
        "Interfaz modular para centralizar métricas, tareas y flujos de trabajo de clientes en crecimiento.",
      stack: ["React", "TypeScript", "Design System"],
      liveUrl: "https://www.linkedin.com/in/marianoricoy",
      repoUrl: "https://github.com/marianoricoy",
    },
    {
      name: "Landing de alto rendimiento",
      description:
        "Landing orientada a conversión con optimización de performance, SEO técnico y estructura escalable.",
      stack: ["Next.js", "SEO", "Web Performance"],
      liveUrl: "https://www.linkedin.com/in/marianoricoy",
      repoUrl: "https://github.com/marianoricoy",
    },
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    backend: ["Node.js", "APIs RESTful", "PostgreSQL", "MongoDB"],
    product: ["Sistemas de diseño", "Arquitectura escalable", "Optimización de rendimiento"],
  },
  experience: [
    {
      role: "Co-Founder & Frontend Lead",
      company: "Tech With Soul (TWS)",
      period: "Mar 2026 - Actualidad",
      details:
        "Lidero el desarrollo frontend de la plataforma institucional y de proyectos para clientes, definiendo stack tecnológico y estándares de calidad.",
    },
    {
      role: "Teacher Assistant",
      company: "Henry",
      period: "Jul 2025 - Oct 2025",
      details:
        "Acompañé estudiantes del bootcamp Full Stack resolviendo dudas técnicas y reforzando JavaScript, React, Node.js y bases de datos.",
    },
  ],
  education: {
    title: "Formación",
    item:
      "Desarrollo Web Full Stack en Henry (Abr 2025 - Sep 2025). Certificación oficial obtenida el 1 de octubre de 2025.",
  },
  contact: {
    title: "Contacto",
    description:
      "Si tenés una idea, un producto por mejorar o querés construir una experiencia digital con impacto, conversemos.",
    cta: "Escribime",
  },
} as const satisfies PortfolioData;
