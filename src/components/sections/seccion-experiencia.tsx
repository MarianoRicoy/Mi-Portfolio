"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import type { ExperienciaItemPortfolio, FormacionPortfolio } from "@/types/portfolio";

type SeccionExperienciaProps = {
  experiencia: readonly ExperienciaItemPortfolio[];
  formacion: FormacionPortfolio;
};

export function SeccionExperiencia({ experiencia, formacion }: SeccionExperienciaProps) {
  return (
    <section id="experiencia" className="line-divider pt-10 md:pt-14">
      <ScrollReveal>
        <p className="kicker text-black/60">[ Experiencia ]</p>
      </ScrollReveal>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {experiencia.map((trabajo, index) => (
          <ScrollReveal key={`${trabajo.role}-${trabajo.company}`} delay={index * 90}>
            <article className="rounded-2xl border border-black/15 bg-white/45 p-5 h-full">
              <p className="text-sm text-black/60">{trabajo.period}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{trabajo.role}</h3>
              <p className="mt-1 text-sm font-medium text-black/75">{trabajo.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-black/75">{trabajo.details}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10 md:mt-14">
        <ScrollReveal delay={experiencia.length * 90}>
          <p className="kicker text-black/60">[ {formacion.title} ]</p>
        </ScrollReveal>
        <ScrollReveal delay={experiencia.length * 90 + 80} className="mt-7">
          <div className="rounded-2xl border border-black/15 bg-white/45 p-5">
            <p className="text-sm leading-relaxed text-black/75">{formacion.item}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
