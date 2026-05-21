import type { ProyectoPortfolio } from "@/types/portfolio";

type SeccionProyectosProps = {
  proyectos: readonly ProyectoPortfolio[];
};

export function SeccionProyectos({ proyectos }: SeccionProyectosProps) {
  return (
    <section id="proyectos" className="line-divider pt-10 md:pt-14">
      <div className="flex items-end justify-between gap-6">
        <p className="kicker">Proyectos</p>
        <a href="#contacto" className="text-sm underline underline-offset-4">
          Trabajemos juntos
        </a>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {proyectos.map((proyecto) => (
          <article key={proyecto.name} className="project-card rounded-2xl p-5">
            <div className="project-visual h-34 rounded-xl" />
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{proyecto.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/75">{proyecto.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {proyecto.stack.map((tecnologia) => (
                <span key={tecnologia} className="chip">
                  {tecnologia}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-4 text-sm">
              <a href={proyecto.liveUrl} className="underline underline-offset-4">
                Live
              </a>
              <a href={proyecto.repoUrl} className="underline underline-offset-4">
                Código
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
