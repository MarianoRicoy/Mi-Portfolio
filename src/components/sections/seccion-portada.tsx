import Image from "next/image";
import { Navbar } from "@/components/navbar";
import type { PersonaPortfolio, SobreMiPortfolio } from "@/types/portfolio";

type SeccionPortadaProps = {
  nombrePersona: PersonaPortfolio["fullName"];
  sobreMi: SobreMiPortfolio;
};

export function SeccionPortada({ nombrePersona, sobreMi }: SeccionPortadaProps) {
  return (
    <section id="intro-cover" className="intro-cover relative flex items-center justify-center min-h-[90svh] md:min-h-screen py-16" aria-label="Sobre mí">
      <Navbar personName={nombrePersona} />
      
      {/* Imagen de Fondo */}
      <Image
        src="/WhatsApp%20Image%202026-03-24%20at%2020.04.02.jpeg"
        alt="Paisaje costero de Miramar"
        fill
        priority
        sizes="100vw"
        className="intro-cover-image"
      />
      
      {/* Overlay oscuro de alto contraste para que el texto crema/blanco se lea perfecto */}
      <div className="intro-cover-overlay absolute inset-0 bg-black/55 backdrop-blur-[2px]" aria-hidden="true" />
      
      {/* Contenido "Sobre mí" superpuesto y centrado en el medio de la imagen */}
      <div className="relative z-10 w-[min(680px,88vw)] text-center text-white flex flex-col items-center justify-center">
        <h2 className="text-sm tracking-[0.2em] uppercase font-bold text-white/70 mb-4">
          Hola, soy Mariano
        </h2>
        <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed text-white/92 font-light">
          {sobreMi.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-balance">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
