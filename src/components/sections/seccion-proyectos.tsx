"use client";

import { useState, useEffect, useRef } from "react";
import type { ProyectoPortfolio } from "@/types/portfolio";

type SeccionProyectosProps = {
  proyectos: readonly ProyectoPortfolio[];
};

function ModalProyecto({
  proyecto,
  onClose,
}: {
  proyecto: ProyectoPortfolio;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", manejarEscape);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", manejarEscape);
    };
  }, [onClose]);

  // Duplicar imágenes del marquee para loop continuo sin saltos
  const imgsMarquee = [
    ...proyecto.marqueeImages,
    ...proyecto.marqueeImages,
    ...proyecto.marqueeImages,
    ...proyecto.marqueeImages,
  ];

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
        {/* Botón cerrar */}
        <button
          type="button"
          className="proj-modal-close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>

        {/* Video */}
        <div className="proj-modal-video-wrap">
          <video
            ref={videoRef}
            key={proyecto.video}
            src={proyecto.video}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="proj-modal-video"
          />
        </div>

        {/* Marquee */}
        <div className="proj-marquee-wrap">
          <div className="proj-marquee-track">
            {imgsMarquee.map((src, i) => (
              <div key={i} className="proj-marquee-item">
                <img src={src} alt="" className="proj-marquee-img" />
              </div>
            ))}
          </div>
          <div className="proj-marquee-track" aria-hidden="true">
            {imgsMarquee.map((src, i) => (
              <div key={i} className="proj-marquee-item">
                <img src={src} alt="" className="proj-marquee-img" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeccionProyectos({ proyectos }: SeccionProyectosProps) {
  const [abierto, setAbierto] = useState<ProyectoPortfolio | null>(null);

  return (
    <>
      <section id="proyectos" className="line-divider pt-10 md:pt-14">
        <p className="kicker text-black/60">[ Proyectos ]</p>

        <div className="mt-7 grid gap-6 grid-cols-1 md:grid-cols-3">
          {proyectos.map((proyecto) => (
            <div key={proyecto.name} className="proj-flip-card">
              <div className="proj-flip-inner">
                {/* Frente */}
                <div className="proj-flip-front">
                  <img
                    src={proyecto.cover}
                    alt={proyecto.name}
                    className="proj-cover-img"
                  />
                </div>

                {/* Dorso */}
                <div
                  className="proj-flip-back"
                  onClick={() => setAbierto(proyecto)}
                >
                  <div
                    className="proj-back-bg"
                    style={{ backgroundImage: `url(${proyecto.cover})` }}
                  />
                  <div className="proj-back-overlay" />
                  <span className="proj-back-title">{proyecto.name}</span>
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
