"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type Technology = {
  name: string;
  src: string;
  description: string;
};

const technologies: Technology[] = [
  { name: "JavaScript", src: "/iconoJS.svg", description: "El \"motor\" de la web. Es el lenguaje que permite que una página deje de ser estática y se vuelva interactiva (animaciones, botones, actualización de datos en tiempo real)." },
  { name: "Next.js", src: "/iconoNext.svg", description: "Una herramienta avanzada que potencia el desarrollo web. Su función principal es garantizar que las páginas carguen a máxima velocidad y logren un excelente posicionamiento en buscadores (SEO)." },
  { name: "React", src: "/iconoReact.png", description: "Un sistema moderno para construir interfaces de usuario. Funciona como bloques de Lego: permite armar componentes visuales reutilizables para crear páginas rápidas y dinámicas." },
  { name: "Tailwind CSS", src: "/iconoTailwind.svg", description: "Una herramienta de diseño ágil. Permite aplicar estilos visuales (colores, tipografías, espacios) de manera directa y ordenada, asegurando que el sitio se vea moderno y se adapte perfectamente a celulares y computadoras." },
  { name: "TypeScript", src: "/iconoTS.svg", description: "Una versión más estructurada y segura de JavaScript. Ayuda a detectar y corregir errores antes de que la página se publique, garantizando un producto final mucho más estable." },
];

export function TechStack() {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [elevatorUp, setElevatorUp] = useState(false);
  const [avatarMounted, setAvatarMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Elevator: se activa cada vez que el usuario pasa por la sección
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearAllTimers();
        if (entry.isIntersecting) {
          // La sección es visible: montar y subir
          setAvatarMounted(true);
          timersRef.current.push(setTimeout(() => setElevatorUp(true), 120));
          // Bajar automáticamente después de 5s (ELIMINADO: ahora se queda hasta hacer scroll)
        } else {
          // La sección salió del viewport: bajar inmediatamente
          setElevatorUp(false);
          timersRef.current.push(setTimeout(() => setAvatarMounted(false), 1000));
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearAllTimers();
    };
  }, []);


  // Lock scroll when modal open
  useEffect(() => {
    if (!selectedTech) return;
    const overflowAnterior = document.body.style.overflow;
    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTech(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", manejarEscape);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", manejarEscape);
    };
  }, [selectedTech]);

  return (
    <div ref={sectionRef} className="w-full mt-10 md:mt-12 relative">
      {/* Etiqueta respetando el design system */}
      <p className="text-[0.74rem] tracking-[0.16em] uppercase font-bold text-black/60 mb-8">
        [ Stack Tecnológico ]
      </p>

      {/* Caja contenedor con bordes y fondo claro como el original */}
      <div className="relative w-full bg-white/45 border border-black/15 py-8 px-6 rounded-2xl overflow-hidden">

        {/* Contenedor del Marquee Infinito */}
        <div className="marquee-container">

          {/* Bloque 1 de la tira */}
          <div className="marquee-content">
            {technologies.map((tech, index) => (
              <div
                key={`${tech.name}-b1-${index}`}
                onDoubleClick={() => setSelectedTech(tech)}
                className="flex flex-col items-center justify-center gap-3 group cursor-pointer shrink-0 px-4 min-w-[120px]"
              >
                {/* Contenedor de la Imagen con Filtro Blanco y Negro con Hover de Color - Escalamos Tailwind para emparejar */}
                <div className={`relative w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ease-in-out grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 ${tech.name === "Tailwind CSS" ? "scale-[1.20]" : ""}`}>
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    sizes="(max-width: 768px) 48px, 56px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Label de la tecnología con hover reactivo */}
                <span className="text-[0.68rem] tracking-wider uppercase font-bold text-black/40 group-hover:text-black transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* Bloque 2 idéntico para continuar la cola de animación sin dejar baches en blanco */}
          <div className="marquee-content" aria-hidden="true">
            {technologies.map((tech, index) => (
              <div
                key={`${tech.name}-b2-${index}`}
                onDoubleClick={() => setSelectedTech(tech)}
                className="flex flex-col items-center justify-center gap-3 group cursor-pointer shrink-0 px-4 min-w-[120px]"
              >
                {/* Contenedor de la Imagen con Filtro Blanco y Negro con Hover de Color - Escalamos Tailwind para emparejar */}
                <div className={`relative w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ease-in-out grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 ${tech.name === "Tailwind CSS" ? "scale-[1.20]" : ""}`}>
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    sizes="(max-width: 768px) 48px, 56px"
                    className="object-contain"
                  />
                </div>

                {/* Label de la tecnología con hover reactivo */}
                <span className="text-[0.68rem] tracking-wider uppercase font-bold text-black/40 group-hover:text-black transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Elevator Avatar — aparece cada vez que el usuario pasa por esta sección */}
      {avatarMounted && (
        <div
          aria-hidden="true"
          className="hidden lg:flex flex-col items-center pointer-events-none"
          style={{
            position: "absolute",
            left: "calc((100vw - min(1120px, 92vw)) / -4 - 110px)",
            top: "0px",
            zIndex: 40,
            transition: "transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease",
            transform: elevatorUp ? "translateY(0)" : "translateY(120px)",
            opacity: elevatorUp ? 1 : 0,
          }}
        >
          {/* Globo de conversación */}
          <div
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "0.9rem",
              padding: "0.6rem 0.9rem",
              marginLeft: "0.6rem",
              marginBottom: "0.5rem",
              maxWidth: 220,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                lineHeight: 1.5,
                color: "rgba(0,0,0,0.65)",
                margin: 0,
              }}
            >
              Hace doble click sobre los stacks para saber mas !
            </p>
            {/* Triángulo apuntando hacia abajo (al avatar) */}
            <span
              style={{
                position: "absolute",
                bottom: -8,
                left: 24,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(255,255,255,0.88)",
              }}
            />
          </div>

          {/* Avatar */}
          <div style={{ position: "relative", width: 130, height: 210, mixBlendMode: "multiply" }}>
            <Image
              src="/avatarMio4.svg"
              alt="Hint avatar"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      )}

      {selectedTech && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedTech(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-4xl bg-white/45 backdrop-blur-xl border border-black/15 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-black/60 hover:text-black transition-colors z-20"
              onClick={() => setSelectedTech(null)}
              aria-label="Cerrar modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Avatar a la izquierda */}
            <div className="hidden md:block relative shrink-0 h-[clamp(280px,34vw,390px)] w-[calc(clamp(280px,34vw,390px)*301.5/959.66)]">
              <Image
                src="/avatarMio3.svg"
                alt="Avatar interactivo"
                fill
                className="object-contain object-bottom opacity-90"
              />
            </div>

            {/* Contenido textual */}
            <div className="flex-1 flex flex-col items-center text-center z-10">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6">
                <Image
                  src={selectedTech.src}
                  alt={selectedTech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-black/92 leading-none mb-6 tracking-tight">
                {selectedTech.name}
              </h3>
              <p className="max-w-2xl text-[clamp(1rem,1.3vw,1.1rem)] leading-relaxed text-black/80 text-balance">
                {selectedTech.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
