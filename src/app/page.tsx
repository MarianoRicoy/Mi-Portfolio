import { portfolioEs } from "@/data/portfolio-es";
import { Navbar } from "@/components/navbar";
import {
  SeccionHero,
  SeccionPresentacion,
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
    experience: experiencia,
    education: formacion,
    contact: contacto,
  } = portfolioEs;

  return (
    <div className="pb-18">
      <Navbar personName="Mariano F. Ricoy Portfolio" />

      <main className="section-shell flex flex-col gap-22 md:gap-28 pt-20 md:pt-24">
        <SeccionHero hero={hero} />
        <SeccionPresentacion sobreMi={sobreMi} />
        <SeccionSobreMi />
        <SeccionProyectos proyectos={proyectos} />
        <SeccionExperiencia experiencia={experiencia} formacion={formacion} />
        <SeccionContacto contacto={contacto} persona={persona} />
      </main>
    </div>
  );
}
