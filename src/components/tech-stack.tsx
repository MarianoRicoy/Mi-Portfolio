import Image from "next/image";

type Technology = {
  name: string;
  src: string;
};

const technologies: Technology[] = [
  { name: "JavaScript", src: "/iconoJS.svg" },
  { name: "Next.js", src: "/iconoNext.svg" },
  { name: "React", src: "/iconoReact.png" },
  { name: "Tailwind CSS", src: "/iconoTailwind.svg" },
  { name: "TypeScript", src: "/iconoTS.svg" },
];

export function TechStack() {
  return (
    <div className="w-full mt-10 md:mt-12 overflow-hidden">
      {/* Etiqueta respetando el design system */}
      <p className="text-[0.74rem] tracking-[0.16em] uppercase font-bold text-black/60 mb-8">
        [ Stack Tecnológico ]
      </p>

      {/* Caja contenedor con bordes y fondo claro como el original */}
      <div className="relative w-full bg-surface/50 border border-line/5 py-8 px-6 rounded-xl overflow-hidden">
        
        {/* Contenedor del Marquee Infinito */}
        <div className="marquee-container">
          
          {/* Bloque 1 de la tira */}
          <div className="marquee-content">
            {technologies.map((tech, index) => (
              <div
                key={`${tech.name}-b1-${index}`}
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
    </div>
  );
}
