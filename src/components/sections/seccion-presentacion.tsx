"use client";

import { useEffect, useRef } from "react";
import type { SobreMiPortfolio } from "@/types/portfolio";

type SeccionPresentacionProps = {
  sobreMi: SobreMiPortfolio;
};

function renderParagraph(text: string) {
  if (!text.includes("Tech With Soul")) return text;

  const [before, after] = text.split("Tech With Soul");
  return (
    <>
      {before}
      <strong className="presentacion-emphasis">Tech With Soul</strong>
      {after}
    </>
  );
}

function AnimatedLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("pres-line--visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <p ref={ref} className={`pres-line ${className}`}>
      {children}
    </p>
  );
}

export function SeccionPresentacion({ sobreMi }: SeccionPresentacionProps) {
  return (
    <section
      id="sobre-mi"
      className="presentacion-section line-divider"
      aria-label="Presentación personal"
    >
      <div className="presentacion-copy">
        <AnimatedLine className="presentacion-greeting">
          Hola, soy Mariano.
        </AnimatedLine>

        {sobreMi.paragraphs.map((paragraph, index) => (
          <AnimatedLine
            key={`${index}-${paragraph.slice(0, 24)}`}
            className="presentacion-paragraph"
            delay={0}
          >
            {renderParagraph(paragraph)}
          </AnimatedLine>
        ))}
      </div>
    </section>
  );
}
