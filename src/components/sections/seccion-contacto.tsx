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
      <section id="contacto" className="contact-panel rounded-3xl p-8 md:p-10">
        <p className="kicker text-black/58">{contacto.title}</p>
        <h2 className="title-display mt-4 text-[clamp(2.3rem,7vw,5rem)] text-black/92">
          {persona.fullName}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/74">{contacto.description}</p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <button
            type="button"
            className="contacto-accion"
            onClick={() => setModalAbierto(true)}
          >
            {contacto.cta}
          </button>
          <a href={persona.cvUrl} className="contacto-accion">
            {persona.cvLabel}
          </a>
          <a href={persona.linkedin} className="contacto-accion" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={persona.github} className="contacto-accion" target="_blank" rel="noreferrer">
            GitHub
          </a>
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
