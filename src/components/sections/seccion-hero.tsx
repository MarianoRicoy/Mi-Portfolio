"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroPortfolio } from "@/types/portfolio";

type SeccionHeroProps = {
  hero: HeroPortfolio;
};

export function SeccionHero({ hero }: SeccionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Estados para cada bloque de texto secuencial
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [displayedLabel1, setDisplayedSummaryLabel1] = useState("");
  const [displayedLabel2, setDisplayedSummaryLabel2] = useState("");

  const fullSummary = hero.summary;
  // Obtenemos las etiquetas de la data (asumiendo que vienen en array)
  const label1Text = hero.sideLabels[0] ? `/${hero.sideLabels[0]}` : "";
  const label2Text = hero.sideLabels[1] ? `/${hero.sideLabels[1]}` : "";

  // 1. Detectar scroll para disparar el efecto general o reiniciarlo si vuelve arriba
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Se dispara la animación cuando la sección entra en el 85% de la pantalla
      if (rect.top < windowHeight * 0.85 && !hasStarted) {
        setHasStarted(true);
      }

      // REINICIO: Si el usuario vuelve arriba de todo de la página (scroll menor a 80px),
      // reiniciamos el estado para que pueda dispararse otra vez al volver a bajar.
      if (window.scrollY < 80) {
        setHasStarted(false);
        setDisplayedSummary("");
        setDisplayedSummaryLabel1("");
        setDisplayedSummaryLabel2("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chequeo inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasStarted]);

  // 2. Orquestación secuencial de las máquinas de escribir
  useEffect(() => {
    if (!hasStarted) {
      setDisplayedSummary("");
      setDisplayedSummaryLabel1("");
      setDisplayedSummaryLabel2("");
      return;
    }

    // PASO 1: Escribir el resumen principal
    let summaryIndex = 0;
    const typingInterval = 18; // Milisegundos por letra para el resumen (un poquito más ágil para balancear la secuencia completa)

    const summaryTimer = setInterval(() => {
      if (summaryIndex < fullSummary.length) {
        setDisplayedSummary(fullSummary.slice(0, summaryIndex + 1));
        summaryIndex++;
      } else {
        clearInterval(summaryTimer);
        
        // PASO 2: Empezar etiqueta 1 tras terminar el resumen
        let label1Index = 0;
        const label1Timer = setInterval(() => {
          if (label1Index < label1Text.length) {
            setDisplayedSummaryLabel1(label1Text.slice(0, label1Index + 1));
            label1Index++;
          } else {
            clearInterval(label1Timer);
            
            // PASO 3: Empezar etiqueta 2 tras terminar la etiqueta 1
            let label2Index = 0;
            const label2Timer = setInterval(() => {
              if (label2Index < label2Text.length) {
                setDisplayedSummaryLabel2(label2Text.slice(0, label2Index + 1));
                label2Index++;
              } else {
                clearInterval(label2Timer);
              }
            }, 30); // Milisegundos por letra para las etiquetas
          }
        }, 30);
      }
    }, typingInterval);

    return () => {
      clearInterval(summaryTimer);
    };
  }, [hasStarted, fullSummary, label1Text, label2Text]);

  // Lógica de cursores para saber cuál mostrar en pantalla
  const showSummaryCursor = hasStarted && displayedSummary.length < fullSummary.length;
  const showLabel1Cursor = hasStarted && displayedSummary.length === fullSummary.length && displayedLabel1.length < label1Text.length;
  const showLabel2Cursor = hasStarted && displayedLabel1.length === label1Text.length && displayedLabel2.length < label2Text.length;

  return (
    <section id="hero" className="hero-poster-section pt-14 md:pt-20" ref={containerRef}>
      <div className="hero-poster-composition items-center">
        {/* Lado Izquierdo: Agrupa Título y Sumario en una sola columna con límite de ancho para dar espacio real */}
        <div className="flex flex-col justify-center max-w-[50%] shrink-0">
          <h1 className="title-display hero-poster-title">{hero.headline}</h1>
          
          {/* Subtítulo principal con efecto de máquina de escribir y cursor interactivo */}
          <p className="hero-summary mt-7 max-w-xl text-base leading-relaxed md:text-lg font-light text-black/82 min-h-[4.5em] md:min-h-[5em]">
            <span>{displayedSummary}</span>
            {showSummaryCursor && (
              <span className="inline-block w-[2px] h-[1.1em] bg-black ml-1 animate-pulse" style={{ verticalAlign: "middle" }} />
            )}
          </p>
        </div>

        {/* Lado Derecho: Bloque de la Foto y Textos, centrado de manera absoluta en el medio de la mitad derecha */}
        <div className="flex-1 flex items-center justify-center">
          <div className="hero-photo-block">
            <figure className="hero-photo-frame" aria-label="Foto de Mariano Ricoy">
              <Image
                src="/mfr.jpg"
                alt="Mariano Ricoy"
                fill
                sizes="(max-width: 768px) 240px, 320px"
                className="object-cover object-top"
                priority
              />
            </figure>

            {/* Lista de etiquetas laterales con tipeo secuencial centradas debajo de la foto circular */}
            <ul className="hero-side-labels min-h-[3em] w-full flex flex-col items-center text-center mt-3">
              <li className="flex items-center justify-center">
                <span>{displayedLabel1}</span>
                {showLabel1Cursor && (
                  <span className="inline-block w-[1.5px] h-[1.1em] bg-black ml-0.5 animate-pulse" />
                )}
              </li>
              <li className="flex items-center justify-center mt-1">
                <span>{displayedLabel2}</span>
                {showLabel2Cursor && (
                  <span className="inline-block w-[1.5px] h-[1.1em] bg-black ml-0.5 animate-pulse" />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
