"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { HeroPortfolio } from "@/types/portfolio";
import { useMouseRotation } from "@/hooks/use-mouse-rotation";

type SeccionHeroProps = {
  hero: HeroPortfolio;
};

export function SeccionHero({ hero }: SeccionHeroProps) {
  const hasTypedRef = useRef(false);
  const [heroReady, setHeroReady] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [displayedLabel1, setDisplayedSummaryLabel1] = useState("");
  const [displayedLabel2, setDisplayedSummaryLabel2] = useState("");

  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useMouseRotation(18);

  const fullSummary = hero.summary;
  const label1Text = hero.sideLabels[0] ? `/${hero.sideLabels[0]}` : "";
  const label2Text = hero.sideLabels[1] ? `/${hero.sideLabels[1]}` : "";

  // Espera que el navbar termine de escribir su nombre
  useEffect(() => {
    const handler = () => {
      // Pequeña pausa dramática tras el navbar antes de revelar el hero
      setTimeout(() => setHeroReady(true), 120);
    };
    window.addEventListener("navbarTypingDone", handler);
    return () => window.removeEventListener("navbarTypingDone", handler);
  }, []);

  // Arrancan los typewriters del hero solo cuando heroReady = true
  useEffect(() => {
    if (!heroReady || hasTypedRef.current) return;
    hasTypedRef.current = true;

    let summaryIndex = 0;
    const typingInterval = 18;

    const summaryTimer = setInterval(() => {
      if (summaryIndex < fullSummary.length) {
        setDisplayedSummary(fullSummary.slice(0, summaryIndex + 1));
        summaryIndex++;
      } else {
        clearInterval(summaryTimer);

        let label1Index = 0;
        const label1Timer = setInterval(() => {
          if (label1Index < label1Text.length) {
            setDisplayedSummaryLabel1(label1Text.slice(0, label1Index + 1));
            label1Index++;
          } else {
            clearInterval(label1Timer);

            let label2Index = 0;
            const label2Timer = setInterval(() => {
              if (label2Index < label2Text.length) {
                setDisplayedSummaryLabel2(label2Text.slice(0, label2Index + 1));
                label2Index++;
              } else {
                clearInterval(label2Timer);
              }
            }, 30);
          }
        }, 30);
      }
    }, typingInterval);

    return () => clearInterval(summaryTimer);
  }, [heroReady, fullSummary, label1Text, label2Text]);

  const showSummaryCursor = displayedSummary.length < fullSummary.length && heroReady;
  const showLabel1Cursor =
    displayedSummary.length === fullSummary.length && displayedLabel1.length < label1Text.length;
  const showLabel2Cursor =
    displayedLabel1.length === label1Text.length && displayedLabel2.length < label2Text.length;

  return (
    <section
      id="hero"
      className="hero-poster-section pt-14 md:pt-20"
      style={{
        opacity: heroReady ? 1 : 0,
        transform: heroReady ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <div className="hero-poster-composition">
        <div className="flex flex-col justify-center max-w-[50%] shrink-0" style={{ perspective: 1200 }}>
          <motion.h1
            className="title-display hero-poster-title"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {hero.headline.split(/\s+/).map((word) => (
              <span key={word} className="hero-poster-title-line inline-block origin-center" style={{ transform: "translateZ(20px)" }}>
                {word}
              </span>
            ))}
          </motion.h1>

          <p className="hero-summary max-w-xl text-base leading-relaxed md:text-lg font-light text-black/82">
            <span>{displayedSummary}</span>
            {showSummaryCursor && (
              <span className="inline-block w-[2px] h-[1.1em] bg-black ml-1 animate-pulse" style={{ verticalAlign: "middle" }} />
            )}
          </p>
        </div>

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

            <ul className="hero-side-labels" aria-label="Especialidades">
              <li className="hero-side-labels-line">
                <span className="hero-side-labels-text">{displayedLabel1 || "\u00A0"}</span>
                {showLabel1Cursor && (
                  <span className="inline-block w-[1.5px] h-[1.1em] bg-black ml-0.5 animate-pulse" />
                )}
              </li>
              <li className="hero-side-labels-line hero-side-labels-line--second">
                <span className="hero-side-labels-text">{displayedLabel2 || "\u00A0"}</span>
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
