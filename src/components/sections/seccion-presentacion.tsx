"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { SobreMiPortfolio } from "@/types/portfolio";

type SeccionPresentacionProps = {
  sobreMi: SobreMiPortfolio;
};

/* ── Renderiza el contenido de una línea (maneja "Tech With Soul") ── */
function LineContent({ text }: { text: string }) {
  if (!text.includes("Tech With Soul")) return <>{text}</>;
  const [before, after] = text.split("Tech With Soul");
  return (
    <>
      {before}
      <strong className="presentacion-emphasis">Tech With Soul</strong>
      {after}
    </>
  );
}

/* ── Una línea animada por IntersectionObserver ── */
function LineReveal({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si ya está visible en viewport al montar, activar directo
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("pres-line--visible");
      return;
    }

    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("pres-line--visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className="pres-line">
      <LineContent text={text} />
    </span>
  );
}

/* ── Párrafo con detección de líneas visuales reales ── */
function SplitParagraph({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  const measure = useCallback(() => {
    const para = measureRef.current;
    if (!para) return;

    const spans = Array.from(para.querySelectorAll<HTMLElement>("[data-word]"));
    if (!spans.length) return;

    const lineMap = new Map<number, string[]>();
    spans.forEach((span) => {
      // Usamos offsetTop relativo al párrafo para agrupar líneas visuales
      const top = Math.round(span.offsetTop);
      if (!lineMap.has(top)) lineMap.set(top, []);
      lineMap.get(top)!.push(span.dataset.word ?? "");
    });

    if (lineMap.size === 0) return;

    const sorted = Array.from(lineMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([, words]) => words.join(" "));

    setLines(sorted);
  }, []);

  useEffect(() => {
    if (lines !== null) return;
    // requestAnimationFrame garantiza que el layout ya fue calculado
    const raf = requestAnimationFrame(() => {
      measure();
    });
    return () => cancelAnimationFrame(raf);
  }, [lines, measure]);

  // Fase de medición: el texto está visible pero lo tapamos con color igual al fondo
  // Así el layout se calcula con las dimensiones reales
  if (lines === null) {
    return (
      <p
        ref={measureRef}
        className={className}
        style={{ color: "transparent", userSelect: "none", pointerEvents: "none" }}
        aria-hidden="true"
      >
        {text.split(/\s+/).map((word, i) => (
          <span key={i} data-word={word}>
            {word}{" "}
          </span>
        ))}
      </p>
    );
  }

  // Fase animada
  return (
    <p className={className}>
      {lines.map((line, i) => (
        <LineReveal key={i} text={line} delay={i * 40} />
      ))}
    </p>
  );
}

/* ── Componente principal ── */
export function SeccionPresentacion({ sobreMi }: SeccionPresentacionProps) {
  return (
    <section
      id="sobre-mi"
      className="presentacion-section line-divider"
      aria-label="Presentación personal"
    >
      <div className="presentacion-copy">
        <SplitParagraph
          text="Hola, soy Mariano."
          className="presentacion-greeting"
        />

        {sobreMi.paragraphs.map((paragraph, index) => (
          <SplitParagraph
            key={`${index}-${paragraph.slice(0, 20)}`}
            text={paragraph}
            className="presentacion-paragraph"
          />
        ))}
      </div>
    </section>
  );
}
