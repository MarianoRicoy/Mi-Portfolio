import { portfolioEs } from "@/data/portfolio-es";
import {
  SeccionPortada,
  SeccionHero,
  SeccionProyectos,
  SeccionHabilidades,
  SeccionExperiencia,
  SeccionContacto,
} from "@/components/sections";

export default function Home() {
  const {
    person: persona,
    hero,
    about: sobreMi,
    projects: proyectos,
    skills: habilidades,
    experience: experiencia,
    education: formacion,
    contact: contacto,
  } = portfolioEs;

  return (
    <div className="pb-18">
      {/* 1. Header Fijo y Hero de Entrada */}
      <div className="section-shell">
        <SeccionHero hero={hero} />
      </div>

      {/* 2. Foto Gigante con el "Sobre mí" superpuesto y centrado en el medio */}
      <SeccionPortada nombrePersona={persona.fullName} sobreMi={sobreMi} />

      {/* 3. El resto de las secciones */}
      <main className="section-shell flex flex-col gap-22 md:gap-28 mt-22 md:mt-28">
        <SeccionProyectos proyectos={proyectos} />
        <SeccionHabilidades habilidades={habilidades} />
        <SeccionExperiencia experiencia={experiencia} formacion={formacion} />
        <SeccionContacto contacto={contacto} persona={persona} />
      </main>
    </div>
  );
}
