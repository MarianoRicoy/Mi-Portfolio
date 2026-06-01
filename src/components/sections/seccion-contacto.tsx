"use client";

import { type FormEvent, useEffect, useState } from "react";
import type { ContactoPortfolio, PersonaPortfolio } from "@/types/portfolio";

type SeccionContactoProps = {
  contacto: ContactoPortfolio;
  persona: PersonaPortfolio;
};

export function SeccionContacto({ contacto, persona }: SeccionContactoProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    asunto: "",
    mensaje: "",
  });

  useEffect(() => {
    if (!modalAbierto) {
      return;
    }

    const overflowAnterior = document.body.style.overflow;
    const manejarEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        setModalAbierto(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", manejarEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", manejarEscape);
    };
  }, [modalAbierto]);

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const nombreCompleto = `${formulario.nombre} ${formulario.apellido}`.trim();
    const asunto =
      formulario.asunto.trim() ||
      `Consulta desde portfolio${nombreCompleto ? ` - ${nombreCompleto}` : ""}`;
    const cuerpo = [
      `Nombre: ${formulario.nombre} ${formulario.apellido}`.trim(),
      "",
      "Mensaje:",
      formulario.mensaje,
    ].join("\n");

    window.location.href = `mailto:${persona.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    setModalAbierto(false);
    setFormulario({ nombre: "", apellido: "", asunto: "", mensaje: "" });
  };

  return (
    <>
      <section id="contacto" className="line-divider pt-10 md:pt-14 pb-10 md:pb-20">
        <p className="kicker text-black/60">[ {contacto.title} ]</p>
        <div className="mt-7 contact-panel flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          
          {/* Contenedor centralizado para los textos y botones */}
          <div className="flex-1 flex flex-col items-center text-center z-10 w-full">
            
            <h2 className="font-serif text-[clamp(3.5rem,8vw,6.5rem)] text-black/92 leading-none mb-6 tracking-tight">
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
              </div>
            </div>
          </div>

          {/* Avatar a la derecha */}
          <div className="contacto-avatar-figure hidden md:block shrink-0 relative right-0" aria-hidden="true" />
        </div>
      </section>

      {modalAbierto && (
        <div
          className="contacto-modal-overlay"
          role="presentation"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="contacto-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contacto-modal-titulo"
            onClick={(evento) => evento.stopPropagation()}
          >
            <div className="contacto-modal-header">
              <h3 id="contacto-modal-titulo" className="contacto-modal-titulo">
                Contame tu idea
              </h3>
              <button
                type="button"
                className="contacto-modal-cerrar"
                aria-label="Cerrar modal"
                onClick={() => setModalAbierto(false)}
              >
                ×
              </button>
            </div>

            <form className="contacto-formulario" onSubmit={manejarEnvio}>
              <div className="contacto-formulario-fila">
                <label className="contacto-campo">
                  Nombre
                  <input
                    required
                    value={formulario.nombre}
                    onChange={(evento) =>
                      setFormulario((anterior) => ({ ...anterior, nombre: evento.target.value }))
                    }
                    className="contacto-input"
                    type="text"
                    name="nombre"
                  />
                </label>

                <label className="contacto-campo">
                  Apellido
                  <input
                    required
                    value={formulario.apellido}
                    onChange={(evento) =>
                      setFormulario((anterior) => ({ ...anterior, apellido: evento.target.value }))
                    }
                    className="contacto-input"
                    type="text"
                    name="apellido"
                  />
                </label>
              </div>

              <label className="contacto-campo">
                Asunto
                <input
                  required
                  value={formulario.asunto}
                  onChange={(evento) =>
                    setFormulario((anterior) => ({ ...anterior, asunto: evento.target.value }))
                  }
                  className="contacto-input"
                  type="text"
                  name="asunto"
                />
              </label>

              <label className="contacto-campo">
                ¿Qué querés construir?
                <textarea
                  required
                  value={formulario.mensaje}
                  onChange={(evento) =>
                    setFormulario((anterior) => ({ ...anterior, mensaje: evento.target.value }))
                  }
                  className="contacto-input contacto-textarea"
                  name="mensaje"
                />
              </label>

              <button type="submit" className="contacto-accion contacto-accion--submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
