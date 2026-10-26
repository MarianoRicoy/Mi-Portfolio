export const SITE_URL = "https://marianoricoy.vercel.app";

export const SITE_TITLE = "Mariano Ricoy | Fullstack Developer";

export const SITE_DESCRIPTION =
  "Portfolio de Mariano Ricoy, desarrollador fullstack especializado en frontend. Proyectos, experiencia y contacto.";

export const SITE_NAME = "Mariano Ricoy";

export const PERSON_FULL_NAME = "Mariano Federico Ricoy";

export const PERSON_SHORT_NAME = "Mariano F. Ricoy";

export const PERSON_ROLE = "Fullstack Developer";

export const PERSON_EMAIL = "mfricoy@gmail.com";

export const PERSON_LINKEDIN = "https://www.linkedin.com/in/mariano-ricoy";

export const PERSON_GITHUB = "https://github.com/marianoricoy";

export const TWS_URL = "https://www.tws.ar/";

export const TWS_NAME = "Tech With Soul";

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON_FULL_NAME,
      alternateName: [PERSON_SHORT_NAME, SITE_NAME],
      jobTitle: PERSON_ROLE,
      url: SITE_URL,
      email: `mailto:${PERSON_EMAIL}`,
      image: `${SITE_URL}/mfr.jpg`,
      sameAs: [PERSON_LINKEDIN, PERSON_GITHUB],
      worksFor: {
        "@type": "Organization",
        name: TWS_NAME,
        url: TWS_URL,
      },
    },
  ],
} as const;
