import { portfolioEs } from "@/data/portfolio-es";
import {
  SeccionPortada,
  SeccionHero,
  SeccionSobreMi,
  SeccionProyectos,
  SeccionExperiencia,
  SeccionContacto,
} from "@/components/sections";

export default function Home() {
  const {
    person: persona,
    hero,
    about: sobreMi,
    projects: proyectos,
    // skills: habilidades, // Eliminado - TechStack en SeccionSobreMi cubre las tecnologías
    experience: experiencia,
    education: formacion,
    contact: contacto,
  } = portfolioEs;

  return (
    <div className="pb-18">
      {/* 1. Foto Gigante de Portada al inicio con Sobre mí superpuesto opcional */}
      <SeccionPortada nombrePersona={persona.fullName} sobreMi={sobreMi} />

      {/* 2. El resto de las secciones en la grilla principal */}
      <main className="section-shell flex flex-col gap-22 md:gap-28 mt-22 md:mt-28">
        <SeccionHero hero={hero} />
        <SeccionSobreMi />
        <SeccionProyectos proyectos={proyectos} />
        <SeccionExperiencia experiencia={experiencia} formacion={formacion} />
        <SeccionContacto contacto={contacto} persona={persona} />
      </main>
    </div>
  );
}
