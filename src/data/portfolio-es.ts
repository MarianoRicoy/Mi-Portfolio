import type { PortfolioData } from "@/types/portfolio";

export const portfolioEs = {
  person: {
    fullName: "Mariano Federico Ricoy",
    role: "Fullstack Developer",
    location: "Miramar, Buenos Aires, Argentina",
    email: "mfricoy@gmail.com",
    linkedin: "https://www.linkedin.com/in/marianoricoy",
    github: "https://github.com/marianoricoy",
  },
  hero: {
    headline: "FULLSTACK DEVELOPER",
    sideLabels: ["DISEÑO WEB (UX/UI)", "DESARROLLO WEB"],
    summary:
      "Transformo ideas en experiencias digitales robustas, escalables y enfocadas en resultados de negocio.",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Soy Full Stack Developer, especializado en Frontend. Disfruto construir productos digitales que no solo funcionen bien, sino que también se sientan bien al usarlos.",
      "Oriundo de la costa argentina, surfista, Purple Belt de Brazilian Jiu-Jitsu (RGA) y fabricante de tablas de surf, crecí entre las olas, los videojuegos y la curiosidad por crear cosas. Con el tiempo, esa misma mezcla de creatividad, disciplina y obsesión por los detalles terminó llevándome al desarrollo.",
      "Me enfoco en crear experiencias claras, sólidas y escalables, combinando atención al detalle visual con decisiones técnicas pensadas a largo plazo.",
      "Creo en el código limpio, en las interfaces simples y en evitar complejidad innecesaria. Como alguna vez escuché: una buena solución no es la más rebuscada, sino la que resuelve el problema de forma eficiente, mantenible y alineada con los objetivos reales.",
      "Me dedico a aprender constantemente todo lo relacionado con el desarrollo digital, porque realmente es un mundo que me apasiona. Además del desarrollo web, también estoy incursionando en la creación de videojuegos, otra pasión que estoy transformando en un proyecto real.",
      "Actualmente me desempeño como Co-Founder y Frontend Lead en Tech With Soul, donde trabajo conectando necesidades de negocio con experiencias digitales de alta calidad.",
    ],
  },
  projects: [
    {
      name: "T W S -Tech With Soul-",
      cover: "/proyectoUno/fotoUno.png",
      video: "/proyectoUno/demo tws website.mp4",
      marqueeImages: [
        "/proyectoUno/fotoDos.png",
        "/proyectoUno/fotoTres.png",
        "/proyectoUno/fotoCuatro.png",
      ],
    },
    {
      name: "Sukha - Papeleria Creativa -",
      cover: "/proyectoDos/fotoUno.png",
      video: "/proyectoDos/demo sukha website.mp4",
      marqueeImages: [
        "/proyectoDos/fotoDos.png",
        "/proyectoDos/fotoTres.png",
        "/proyectoDos/fotoCuatro.png",
      ],
    },
    {
      name: "Coral bjj Studio",
      cover: "/proyectoTres/fotoUno.png",
      video: "/proyectoTres/demo coral website (online-video-cutter.com).mp4",
      marqueeImages: [
        "/proyectoTres/fotoDos.png",
        "/proyectoTres/fotoTres.png",
      ],
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
