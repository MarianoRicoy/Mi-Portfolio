import { portfolioEs } from "@/data/portfolio-es";
import {
  SeccionPortada,
  SeccionHero,
  SeccionSobreMi,
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
      <SeccionPortada nombrePersona={persona.fullName} />

      <main className="section-shell flex flex-col gap-22 md:gap-28">
        <SeccionHero hero={hero} />
        <SeccionSobreMi sobreMi={sobreMi} />
        <SeccionProyectos proyectos={proyectos} />
        <SeccionHabilidades habilidades={habilidades} />
        <SeccionExperiencia experiencia={experiencia} formacion={formacion} />
        <SeccionContacto contacto={contacto} persona={persona} />
      </main>
    </div>
  );
}
