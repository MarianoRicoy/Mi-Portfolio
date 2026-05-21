import type { SobreMiPortfolio } from "@/types/portfolio";

type SeccionSobreMiProps = {
  sobreMi: SobreMiPortfolio;
};

export function SeccionSobreMi({ sobreMi }: SeccionSobreMiProps) {
  return (
    <section id="sobre-mi" className="line-divider pt-12 md:pt-16">
      <p className="kicker">{sobreMi.title}</p>
      <div className="sobre-mi-grid mt-7 md:mt-8">
        {sobreMi.paragraphs.map((paragraph) => (
          <article key={paragraph} className="sobre-mi-bloque">
            <p className="sobre-mi-texto">{paragraph}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
