import Image from "next/image";
import type { HeroPortfolio } from "@/types/portfolio";

type SeccionHeroProps = {
  hero: HeroPortfolio;
};

export function SeccionHero({ hero }: SeccionHeroProps) {
  return (
    <section id="hero" className="hero-poster-section pt-14 md:pt-20">
      <div className="hero-poster-composition">
        <h1 className="title-display hero-poster-title">{hero.headline}</h1>

        <div className="hero-photo-block">
          <figure className="hero-photo-frame" aria-label="Foto de Mariano Ricoy">
            <Image
              src="/mfr.jpg"
              alt="Mariano Ricoy"
              fill
              sizes="(max-width: 768px) 240px, 320px"
              className="object-cover object-top"
              priority
            />
          </figure>

          <ul className="hero-side-labels">
            {hero.sideLabels.map((label) => (
              <li key={label}>/{label}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="hero-summary mt-7 max-w-xl text-base leading-relaxed text-black/82 md:text-lg">
        {hero.summary}
      </p>
    </section>
  );
}
