"use client";

import { useEffect, useState } from "react";
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

export function SeccionPresentacion({ sobreMi }: SeccionPresentacionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 48) setIsVisible(true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="sobre-mi"
      className={`presentacion-section line-divider${isVisible ? " presentacion-section--visible" : ""}`}
      aria-label="Presentación personal"
    >
      <div className="presentacion-copy">
        <p className="presentacion-greeting">Hola, soy Mariano.</p>

        {sobreMi.paragraphs.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`} className="presentacion-paragraph">
            {renderParagraph(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
}
