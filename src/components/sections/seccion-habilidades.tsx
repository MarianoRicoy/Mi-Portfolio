import type { HabilidadesPortfolio } from "@/types/portfolio";

type SeccionHabilidadesProps = {
  habilidades: HabilidadesPortfolio;
};

export function SeccionHabilidades({ habilidades }: SeccionHabilidadesProps) {
  return (
    <section id="skills" className="line-divider pt-10 md:pt-14">
      <p className="kicker">Skills</p>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <article>
          <h3 className="text-base font-semibold">Frontend</h3>
          <ul className="mt-3 space-y-2 text-sm text-black/75">
            {habilidades.frontend.map((habilidad) => (
              <li key={habilidad}>{habilidad}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3 className="text-base font-semibold">Backend</h3>
          <ul className="mt-3 space-y-2 text-sm text-black/75">
            {habilidades.backend.map((habilidad) => (
              <li key={habilidad}>{habilidad}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3 className="text-base font-semibold">Producto</h3>
          <ul className="mt-3 space-y-2 text-sm text-black/75">
            {habilidades.product.map((habilidad) => (
              <li key={habilidad}>{habilidad}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
