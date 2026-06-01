import Image from "next/image";
import { useState, useEffect } from "react";

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
    <div className="w-full mt-10 md:mt-12 overflow-hidden">
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

      {/* Modal interactivo */}
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

            {/* Avatar a la derecha */}
            <div className="hidden md:block relative shrink-0 h-[clamp(280px,34vw,390px)] w-[calc(clamp(280px,34vw,390px)*301.5/959.66)]">
              <Image 
                src="/avatarMio3.svg"
                alt="Avatar interactivo"
                fill
                className="object-contain object-bottom opacity-90"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
