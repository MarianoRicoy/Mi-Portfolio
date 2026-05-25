"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import type { PersonaPortfolio, SobreMiPortfolio } from "@/types/portfolio";

type SeccionPortadaProps = {
  nombrePersona: PersonaPortfolio["fullName"];
  sobreMi: SobreMiPortfolio;
};

export function SeccionPortada({ nombrePersona, sobreMi }: SeccionPortadaProps) {
  const [titlePart1, setTitlePart1] = useState("");
  const [titlePart2, setTitlePart2] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [activeCursor, setActiveCursor] = useState<"part1" | "part2" | "body" | "none">("part1");

  const bodyTarget = sobreMi.paragraphs.join("\n\n");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const part1Target = "Hola, ";
    const part2Target = "soy Mariano";

    let p1Index = 0;
    let p2Index = 0;
    let bodyIndex = 0;

    // Velocidades ajustadas: saludo pausado, cuerpo fluido
    const p1Speed = 140; // Ritmo pausado y natural para el saludo (como hablando)
    const p2Speed = 140; // Ritmo pausado para el nombre, sin prisa
    const bodySpeed = 35; // Velocidad fluida para el texto largo, ni tedioso ni estresante

    const conversationalPause1 = 900; // Pausa natural como respirando entre frases
    const conversationalPause2 = 1000; // Pausa cómoda antes del texto largo

    function type() {
      if (p1Index < part1Target.length) {
        setTitlePart1(part1Target.slice(0, p1Index + 1));
        p1Index++;
        timer = setTimeout(type, p1Speed);
      } else if (p1Index === part1Target.length) {
        setActiveCursor("part2");
        p1Index++; // Evita re-entrar
        timer = setTimeout(type, conversationalPause1);
      } else if (p2Index < part2Target.length) {
        setTitlePart2(part2Target.slice(0, p2Index + 1));
        p2Index++;
        timer = setTimeout(type, p2Speed);
      } else if (p2Index === part2Target.length) {
        setActiveCursor("body");
        p2Index++; // Evita re-entrar
        timer = setTimeout(type, conversationalPause2);
      } else if (bodyIndex < bodyTarget.length) {
        setBodyText(bodyTarget.slice(0, bodyIndex + 1));
        bodyIndex++;
        timer = setTimeout(type, bodySpeed);
      } else {
        setActiveCursor("none");
        setIsTypingFinished(true);
      }
    }

    timer = setTimeout(type, 300);

    return () => clearTimeout(timer);
  }, [bodyTarget]);

  return (
    <section id="intro-cover" className="intro-cover relative flex items-center justify-center min-h-[95svh] md:min-h-screen py-20 px-6 md:px-12" aria-label="Foto de la costa">
      <Navbar personName={nombrePersona} isTypingFinished={isTypingFinished} />
      
      {/* Imagen de fondo costero */}
      <Image
        src="/WhatsApp%20Image%202026-03-24%20at%2020.04.02.jpeg"
        alt="Paisaje costero de Miramar"
        fill
        priority
        sizes="100vw"
        className="intro-cover-image"
      />
      
      {/* Overlay oscuro mejorado para legibilidad impecable de las letras crema sobre Miramar */}
      <div className="intro-cover-overlay absolute inset-0 bg-black/68 backdrop-blur-[3px]" aria-hidden="true" />
      
      {/* Texto de Sobre mí simulando máquina de escribir con sombras de alto contraste flotando libre y centrado */}
      <div className="relative z-10 w-[min(720px,92vw)] text-center text-white flex flex-col items-center justify-center">
        {/* Título de bienvenida con estilo unificado al cuerpo */}
        <h2 className="text-base md:text-xl leading-relaxed md:leading-loose text-white font-light text-balance mb-6 md:mb-10 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
          {titlePart1 && (
            <span className="font-semibold text-white/95">
              {titlePart1}
            </span>
          )}
          {titlePart2 && (
            <span className="font-semibold text-white/95">
              {titlePart2}
            </span>
          )}
          {(activeCursor === "part1" || activeCursor === "part2") && (
            <span className="inline-block w-[2px] h-[1.15em] bg-white ml-1 animate-pulse" style={{ verticalAlign: "middle" }} />
          )}
        </h2>

        {/* Bloque descriptivo */}
        <div className="text-base md:text-xl leading-relaxed md:leading-loose text-white font-light text-balance whitespace-pre-line min-h-[14em] md:min-h-[10em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
          <span>
            {bodyText.includes("Tech With Soul") ? (
              <>
                {bodyText.split("Tech With Soul")[0]}
                <span className="font-semibold text-white/95">
                  Tech With Soul
                </span>
                {bodyText.split("Tech With Soul")[1]}
              </>
            ) : (
              bodyText
            )}
          </span>
          {activeCursor === "body" && (
            <span className="inline-block w-[2px] h-[1.15em] bg-white ml-1 animate-pulse" style={{ verticalAlign: "middle" }} />
          )}
        </div>
      </div>
    </section>
  );
}
