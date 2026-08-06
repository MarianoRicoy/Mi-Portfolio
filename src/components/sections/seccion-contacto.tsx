"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import { AnimatedModal } from "@/components/animated-modal";
import type { ContactoPortfolio, PersonaPortfolio } from "@/types/portfolio";

type SeccionContactoProps = {
  contacto: ContactoPortfolio;
  persona: PersonaPortfolio;
};

type FormularioContacto = {
  nombre: string;
  apellido: string;
  email: string;
  asunto: string;
  detalle: string;
};

type EstadoEnvio = "idle" | "loading" | "success" | "error";

const formularioInicial: FormularioContacto = {
  nombre: "",
  apellido: "",
  email: "",
  asunto: "",
  detalle: "",
};

export function SeccionContacto({ contacto, persona }: SeccionContactoProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formulario, setFormulario] = useState<FormularioContacto>(formularioInicial);
  const [estadoEnvio, setEstadoEnvio] = useState<EstadoEnvio>("idle");
  const [mensajeError, setMensajeError] = useState("");

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setFormulario(formularioInicial);
    setEstadoEnvio("idle");
    setMensajeError("");
  }, []);

  useEffect(() => {
    if (!modalAbierto) return;

    const overflowAnterior = document.body.style.overflow;
    const manejarEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape" && estadoEnvio !== "loading") {
        cerrarModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", manejarEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", manejarEscape);
    };
  }, [modalAbierto, estadoEnvio, cerrarModal]);

  useEffect(() => {
    if (estadoEnvio !== "success") return;

    const timeoutId = setTimeout(() => {
      cerrarModal();
    }, 2200);

    return () => clearTimeout(timeoutId);
  }, [estadoEnvio, cerrarModal]);

  const cerrarModalSiPuede = () => {
    if (estadoEnvio === "loading") return;
    cerrarModal();
  };

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setEstadoEnvio("loading");
    setMensajeError("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setEstadoEnvio("error");
      setMensajeError("El formulario todavía no está configurado.");
      return;
    }

    const nombreCompleto = `${formulario.nombre} ${formulario.apellido}`.trim();
    const asunto =
      formulario.asunto.trim() ||
      `Consulta desde portfolio${nombreCompleto ? ` - ${nombreCompleto}` : ""}`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: asunto,
          name: nombreCompleto,
          email: formulario.email.trim(),
          message: [
            `Nombre: ${nombreCompleto}`,
            `Email: ${formulario.email.trim()}`,
            `Asunto: ${asunto}`,
            "",
            "Detalle:",
            formulario.detalle.trim(),
          ].join("\n"),
          botcheck: false,
        }),
      });

      const responseText = await response.text();
      let data: { success?: boolean; message?: string } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText) as { success?: boolean; message?: string };
        } catch {
          throw new Error("Respuesta inválida del servicio de email.");
        }
      }

      if (response.status !== 200 || data.success === false) {
        throw new Error(data.message ?? "No se pudo enviar el mensaje.");
      }

      setEstadoEnvio("success");
    } catch (error) {
      setEstadoEnvio("error");
      setMensajeError(
        error instanceof Error ? error.message : "No se pudo enviar el mensaje.",
      );
    }
  };

  return (
    <>
      <section id="contacto" className="line-divider pt-10 md:pt-14 pb-10 md:pb-20">
        <p className="kicker text-black/60">[ {contacto.title} ]</p>
        <div className="mt-7 contact-panel flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="flex-1 flex flex-col items-center text-center z-10 w-full">
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-black/92 leading-none mb-6 tracking-tight">
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
                <button type="button" className="contacto-accion" onClick={() => setModalAbierto(true)}>
                  Contactar
                </button>
              </div>
            </div>
          </div>

          <div className="contacto-avatar-figure hidden md:block shrink-0 relative right-0" aria-hidden="true" />
        </div>
      </section>

      <AnimatedModal
        open={modalAbierto}
        onClose={cerrarModalSiPuede}
        overlayClassName="contacto-modal-overlay"
        panelClassName="contacto-modal"
        ariaLabelledby="contacto-modal-titulo"
        closeOnOverlay={estadoEnvio !== "loading"}
      >
            <button
              type="button"
              className="contacto-modal-cerrar"
              aria-label="Cerrar modal"
              onClick={cerrarModalSiPuede}
              disabled={estadoEnvio === "loading"}
            >
              ×
            </button>

            <p className="contacto-modal-kicker kicker text-black/60">[ Contacto ]</p>
            <h3 id="contacto-modal-titulo" className="contacto-modal-titulo">
              {estadoEnvio === "success" ? "¡Mensaje enviado!" : "Completá el formulario"}
            </h3>

            {estadoEnvio === "success" ? (
              <p className="contacto-modal-nota contacto-modal-nota--success">
                Gracias por escribirme. Te responderemos en 1-2 días hábiles.
              </p>
            ) : (
              <form className="contacto-formulario" onSubmit={manejarEnvio}>
                <div className="contacto-formulario-fila">
                  <label className="contacto-campo">
                    Nombre
                    <input
                      required
                      disabled={estadoEnvio === "loading"}
                      value={formulario.nombre}
                      onChange={(evento) =>
                        setFormulario((anterior) => ({ ...anterior, nombre: evento.target.value }))
                      }
                      className="contacto-input"
                      type="text"
                      name="nombre"
                      autoComplete="given-name"
                    />
                  </label>

                  <label className="contacto-campo">
                    Apellido
                    <input
                      required
                      disabled={estadoEnvio === "loading"}
                      value={formulario.apellido}
                      onChange={(evento) =>
                        setFormulario((anterior) => ({ ...anterior, apellido: evento.target.value }))
                      }
                      className="contacto-input"
                      type="text"
                      name="apellido"
                      autoComplete="family-name"
                    />
                  </label>
                </div>

                <div className="contacto-formulario-fila">
                  <label className="contacto-campo">
                    Email
                    <input
                      required
                      disabled={estadoEnvio === "loading"}
                      value={formulario.email}
                      onChange={(evento) =>
                        setFormulario((anterior) => ({ ...anterior, email: evento.target.value }))
                      }
                      className="contacto-input"
                      type="email"
                      name="email"
                      autoComplete="email"
                    />
                  </label>

                  <label className="contacto-campo">
                    Asunto
                    <input
                      required
                      disabled={estadoEnvio === "loading"}
                      value={formulario.asunto}
                      onChange={(evento) =>
                        setFormulario((anterior) => ({ ...anterior, asunto: evento.target.value }))
                      }
                      className="contacto-input"
                      type="text"
                      name="asunto"
                    />
                  </label>
                </div>

                <label className="contacto-campo contacto-campo--full">
                  Detalle
                  <textarea
                    required
                    disabled={estadoEnvio === "loading"}
                    value={formulario.detalle}
                    onChange={(evento) =>
                      setFormulario((anterior) => ({ ...anterior, detalle: evento.target.value }))
                    }
                    className="contacto-input contacto-textarea"
                    name="detalle"
                    rows={5}
                  />
                </label>

                {estadoEnvio === "error" && mensajeError && (
                  <p className="contacto-modal-alerta" role="alert">
                    {mensajeError}
                  </p>
                )}

                <button
                  type="submit"
                  className="contacto-accion contacto-accion--submit"
                  disabled={estadoEnvio === "loading"}
                >
                  {estadoEnvio === "loading" ? "Enviando..." : "Enviar"}
                </button>

                <p className="contacto-modal-nota">
                  Te responderemos en 1-2 días hábiles.
                </p>
              </form>
            )}
      </AnimatedModal>
    </>
  );
}
