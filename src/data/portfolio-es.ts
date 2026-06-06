import type { PortfolioData } from "@/types/portfolio";

export const portfolioEs = {
  person: {
    fullName: "Mariano Federico Ricoy",
    role: "Fullstack Developer",
    location: "Miramar, Buenos Aires, Argentina",
    email: "mfricoy@gmail.com",
    linkedin: "https://www.linkedin.com/in/mariano-ricoy",
    github: "https://github.com/marianoricoy",
  },
  hero: {
    headline: "FULLSTACK DEVELOPER",
    sideLabels: ["DISEÑO WEB (UX/UI)", "DESARROLLO WEB"],
    summary:
      "Desarrollo web especializado. Menos sobreingeniería, más rendimiento, código mantenible y diseño funcional.",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Soy Full Stack Developer, especializado en Frontend. Disfruto construir productos digitales que no solo funcionen bien, sino que también se sientan bien al usarlos.",
      "Oriundo de la costa argentina, surfista y fabricante de tablas de surf. Crecí entre las olas, la naturaleza y la curiosidad por crear cosas. Con el tiempo, esa misma mezcla de creatividad, disciplina y obsesión por los detalles terminó llevándome al desarrollo.",
      "Me enfoco en crear experiencias claras, sólidas y escalables, combinando atención al detalle visual con decisiones técnicas pensadas a largo plazo.",
      "Creo en el código limpio, en las interfaces simples y en evitar complejidad innecesaria. Como alguna vez escuché: una buena solución no es la más rebuscada, sino la que resuelve el problema de forma eficiente, mantenible y alineada con los objetivos reales.",
      "Mi enfoque exige una evolución constante dentro del ecosistema digital para construir soluciones cada vez mejores. Más allá de mi especialización en desarrollo web, actualmente estoy expandiendo mi stack técnico hacia la industria de los videojuegos, materializando esta iniciativa en un proyecto en etapa de producción.",
      "Actualmente me desempeño como Co-Founder y Frontend Lead en Tech With Soul, donde trabajo conectando necesidades de negocio con experiencias digitales de alta calidad.",
    ],
  },
  projects: [
    {
      name: "T W S -Tech With Soul-",
      cover: "/proyectoUno/fotoUno.png",
      video: "/proyectoUno/demo tws website.mp4",
      description:
        "TWS (Tech With Soul) — Plataforma Corporativa. Diseño e implementación del sitio web oficial para TWS, concebido para posicionar a la empresa como un socio tecnológico estratégico para negocios en crecimiento. La arquitectura del proyecto es una 'one-page expandida' que ofrece una experiencia de usuario de alto nivel.",
      marqueeImages: [
        "/proyectoUno/fotoDos.png",
        "/proyectoUno/fotoTres.png",
        "/proyectoUno/fotoCuatro.png",
        "/proyectoUno/fotoCinco.png",
        "/proyectoUno/fotoSeis.png",
      ],
    },
    {
      name: "Sukha - Papeleria Creativa -",
      cover: "/proyectoDos/fotoUno.png",
      video: "/proyectoDos/demo sukha website.mp4",
      description:
        "Aplicación web Full-Stack desarrollada a medida para SUKHA Papelería Creativa. Soluciona la falta de control administrativo digitalizando un extenso catálogo y automatizando el cálculo de rentabilidad, logrando que la dueña sepa con exactitud qué vende y cuánto factura. Stack: React · Tailwind CSS · Node.js · Express · Supabase.",
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
      description:
        "Desarrollo de una plataforma digital integral para una academia de Jiu Jitsu. El proyecto combina una web institucional con fuerte identidad visual ('estética coral') y una tienda online enfocada en la venta de su merchandising oficial.",
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
