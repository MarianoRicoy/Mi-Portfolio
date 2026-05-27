"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroPortfolio } from "@/types/portfolio";

type SeccionHeroProps = {
  hero: HeroPortfolio;
};

export function SeccionHero({ hero }: SeccionHeroProps) {
  const hasTypedRef = useRef(false);
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [displayedLabel1, setDisplayedSummaryLabel1] = useState("");
  const [displayedLabel2, setDisplayedSummaryLabel2] = useState("");

  const fullSummary = hero.summary;
  const label1Text = hero.sideLabels[0] ? `/${hero.sideLabels[0]}` : "";
  const label2Text = hero.sideLabels[1] ? `/${hero.sideLabels[1]}` : "";

  useEffect(() => {
    if (hasTypedRef.current) return;
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
  }, [fullSummary, label1Text, label2Text]);

  const showSummaryCursor = displayedSummary.length < fullSummary.length;
  const showLabel1Cursor =
    displayedSummary.length === fullSummary.length && displayedLabel1.length < label1Text.length;
  const showLabel2Cursor =
    displayedLabel1.length === label1Text.length && displayedLabel2.length < label2Text.length;

  return (
    <section id="hero" className="hero-poster-section pt-14 md:pt-20">
      <div className="hero-poster-composition">
        <div className="flex flex-col justify-center max-w-[50%] shrink-0">
          <h1 className="title-display hero-poster-title">
            {hero.headline.split(/\s+/).map((word) => (
              <span key={word} className="hero-poster-title-line">
                {word}
              </span>
            ))}
          </h1>

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
