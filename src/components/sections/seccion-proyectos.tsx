"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { ProyectoPortfolio } from "@/types/portfolio";

type SeccionProyectosProps = {
  proyectos: readonly ProyectoPortfolio[];
};

function isTouchDevice() {
  return typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
}

function MarqueeImages({ images, trackKey }: { images: readonly string[]; trackKey: string }) {
  return (
    <>
      {images.map((src, i) => (
        <div key={`${trackKey}-${src}-${i}`} className="proj-marquee-item relative">
          <Image
            src={src}
            alt=""
            fill
            sizes="380px"
            className="proj-marquee-img object-cover"
          />
        </div>
      ))}
    </>
  );
}

function ModalProyecto({
  proyecto,
  onClose,
}: {
  proyecto: ProyectoPortfolio;
  onClose: () => void;
}) {
  useEffect(() => {
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const manejarEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", manejarEscape);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", manejarEscape);
    };
  }, [onClose]);

  return (
    <div
      className="proj-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="proj-modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={`Proyecto: ${proyecto.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="proj-modal-close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>

        <div className="proj-modal-video-wrap">
          <video
            key={proyecto.video}
            src={encodeURI(proyecto.video)}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="proj-modal-video"
          />
        </div>

        <p className="proj-modal-desc">{proyecto.description}</p>

        <div className="proj-marquee-wrap">
          <div className="proj-marquee-track">
            <MarqueeImages images={proyecto.marqueeImages} trackKey="t1" />
          </div>
          <div className="proj-marquee-track" aria-hidden="true">
            <MarqueeImages images={proyecto.marqueeImages} trackKey="t2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeccionProyectos({ proyectos }: SeccionProyectosProps) {
  const [abierto, setAbierto] = useState<ProyectoPortfolio | null>(null);

  const abrirProyecto = useCallback((proyecto: ProyectoPortfolio) => {
    setAbierto(proyecto);
  }, []);

  const manejarTeclaProyecto = (
    evento: ReactKeyboardEvent<HTMLDivElement>,
    proyecto: ProyectoPortfolio,
  ) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirProyecto(proyecto);
    }
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const nombre = (e as CustomEvent<string>).detail;
      const proyecto = proyectos.find((p) => p.name === nombre);
      if (proyecto) setAbierto(proyecto);
    };
    window.addEventListener("openProject", handler);
    return () => window.removeEventListener("openProject", handler);
  }, [proyectos]);

  return (
    <>
      <section id="proyectos" className="line-divider pt-10 md:pt-14">
        <p className="kicker text-black/60">[ Proyectos ]</p>

        <div className="mt-7 grid gap-6 grid-cols-1 md:grid-cols-3">
          {proyectos.map((proyecto) => (
            <div key={proyecto.name} className="proj-flip-card">
              <div className="proj-flip-inner">
                <div
                  className="proj-flip-front relative"
                  onClick={() => {
                    if (isTouchDevice()) abrirProyecto(proyecto);
                  }}
                >
                  <Image
                    src={proyecto.cover}
                    alt={proyecto.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="proj-cover-img"
                  />
                </div>

                <div
                  className="proj-flip-back"
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver proyecto ${proyecto.name}`}
                  onClick={() => abrirProyecto(proyecto)}
                  onKeyDown={(evento) => manejarTeclaProyecto(evento, proyecto)}
                >
                  <div
                    className="proj-back-bg"
                    style={{ backgroundImage: `url(${encodeURI(proyecto.cover)})` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {abierto && (
        <ModalProyecto proyecto={abierto} onClose={() => setAbierto(null)} />
      )}
    </>
  );
}
