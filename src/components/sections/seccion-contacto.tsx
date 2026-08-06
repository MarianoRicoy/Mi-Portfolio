import type { ContactoPortfolio, PersonaPortfolio } from "@/types/portfolio";

type SeccionContactoProps = {
  contacto: ContactoPortfolio;
  persona: PersonaPortfolio;
};

export function SeccionContacto({ contacto, persona }: SeccionContactoProps) {
  return (
    <section id="contacto" className="line-divider pt-10 md:pt-14 pb-10 md:pb-20">
      <p className="kicker text-black/60">[ {contacto.title} ]</p>
      <div className="mt-7 contact-panel flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="flex-1 flex flex-col items-center text-center z-10 w-full">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-black/92 leading-none mb-6 tracking-tight">
            Trabajemos <em className="italic font-light">juntos.</em>
          </h2>

          <p className="max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-black/80 text-balance">
            {contacto.description}
          </p>

          <div className="mt-12 flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-xl md:text-2xl font-medium tracking-tight text-black/90">
                {persona.fullName}
              </span>
              <a
                href={`mailto:${persona.email}`}
                className="text-xl md:text-2xl text-black/70 hover:text-black transition-colors"
              >
                {persona.email}
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href={persona.linkedin} className="contacto-accion" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={persona.github} className="contacto-accion" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <button type="button" className="contacto-accion">
                Contactar
              </button>
            </div>
          </div>
        </div>

        <div className="contacto-avatar-figure hidden md:block shrink-0 relative right-0" aria-hidden="true" />
      </div>
    </section>
  );
}
