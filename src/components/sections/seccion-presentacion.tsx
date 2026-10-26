"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { SobreMiPortfolio } from "@/types/portfolio";
import { prefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type SeccionPresentacionProps = {
  sobreMi: SobreMiPortfolio;
};

const TWS_TOKEN = "Tech With Soul";

/* ── Renderiza el contenido de una línea (maneja "Tech With Soul") ── */
function LineContent({ text }: { text: string }) {
  if (!text.includes(TWS_TOKEN)) return <>{text}</>;
  const [before, after] = text.split(TWS_TOKEN);
  return (
    <>
      {before}
      <a
        href="https://www.tws.ar/"
        target="_blank"
        rel="noreferrer"
        className="presentacion-tws-link"
      >
        <strong style={{ whiteSpace: "nowrap" }}>Tech With Soul</strong>
      </a>
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

    if (prefersReducedMotion()) {
      el.classList.add("pres-line--visible");
      return;
    }

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

function tokenize(text: string) {
  const tokens: string[] = [];
  const parts = text.split(TWS_TOKEN);
  parts.forEach((part, index) => {
    tokens.push(...part.split(/\s+/).filter(Boolean));
    if (index < parts.length - 1) tokens.push(TWS_TOKEN);
  });
  return tokens;
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
    if (prefersReducedMotion()) return;
    if (para.getBoundingClientRect().top < window.innerHeight * 0.95) return;

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

    let cancelled = false;
    let raf = 0;
    const run = () => {
      raf = requestAnimationFrame(() => {
        if (!cancelled) measure();
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) run();
      });
    } else {
      run();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [lines, measure]);

  const tokens = tokenize(text);

  if (lines === null) {
    return (
      <p ref={measureRef} className={className}>
        {tokens.map((word, index) => (
          <span
            key={`${word}-${index}`}
            data-word={word}
            style={word === TWS_TOKEN ? { whiteSpace: "nowrap" } : undefined}
          >
            {word === TWS_TOKEN ? <LineContent text={word} /> : word}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p className={`${className} presentacion-motion`}>
      {lines.map((line, index) => (
        <LineReveal key={`${line}-${index}`} text={line} delay={index * 40} />
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
