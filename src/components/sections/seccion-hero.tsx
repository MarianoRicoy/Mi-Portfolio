"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import type { HeroPortfolio } from "@/types/portfolio";
import { useMouseRotation } from "@/hooks/use-mouse-rotation";
import {
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/hooks/use-prefers-reduced-motion";

type SeccionHeroProps = {
  hero: HeroPortfolio;
};

export function SeccionHero({ hero }: SeccionHeroProps) {
  const hasTypedRef = useRef(false);
  const dispatchedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const [titleVisible, setTitleVisible] = useState(false);
  const [mouseEnabled, setMouseEnabled] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(0);

  const [displayedSummary, setDisplayedSummary] = useState("");
  const [displayedLabel1, setDisplayedLabel1] = useState("");
  const [displayedLabel2, setDisplayedLabel2] = useState("");

  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, x, y } =
    useMouseRotation(18);

  const fullSummary = hero.summary;
  const label1Text = hero.sideLabels[0] ? `/${hero.sideLabels[0]}` : "";
  const label2Text = hero.sideLabels[1] ? `/${hero.sideLabels[1]}` : "";

  const clearAllTimers = () => {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];
  };

  const showStaticHero = useCallback(() => {
    setTitleVisible(true);
    setTitleOpacity(1);
    setMouseEnabled(false);
    setContentVisible(true);
    setDisplayedSummary(fullSummary);
    setDisplayedLabel1(label1Text);
    setDisplayedLabel2(label2Text);
    hasTypedRef.current = true;
    dispatchedRef.current = true;
    clearAllTimers();
  }, [fullSummary, label1Text, label2Text]);

  useIsomorphicLayoutEffect(() => {
    if (!prefersReducedMotion()) return;
    showStaticHero();
  }, [fullSummary, label1Text, label2Text]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) showStaticHero();
    };
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [showStaticHero]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      showStaticHero();
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const handler = () => {
      timeoutId = setTimeout(() => setTitleVisible(true), 120);
    };
    window.addEventListener("navbarTypingDone", handler);
    return () => {
      window.removeEventListener("navbarTypingDone", handler);
      clearTimeout(timeoutId);
    };
  }, [showStaticHero]);

  useEffect(() => {
    if (!titleVisible) return;
    if (prefersReducedMotion()) {
      showStaticHero();
      return;
    }

    setTitleOpacity(1);

    let contentTimeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const controls: Array<{ stop: () => void }> = [];

    const play = async (
      value: typeof x,
      frames: number[],
      durations: number[],
    ) => {
      for (let index = 0; index < frames.length; index += 1) {
        if (cancelled) return;
        const control = animate(value, frames[index], {
          duration: durations[index],
          ease: [0.22, 1, 0.36, 1],
        });
        controls.push(control);
        await control;
      }
    };

    Promise.all([
      play(x, [0.1, 0.9, 0.5], [0.5, 0.55, 0.45]),
      play(y, [0.2, 0.8, 0.5], [0.5, 0.55, 0.45]),
    ]).then(() => {
      if (cancelled) return;
      setMouseEnabled(true);
      contentTimeoutId = setTimeout(() => setContentVisible(true), 180);
    });

    return () => {
      cancelled = true;
      controls.forEach((control) => control.stop());
      clearTimeout(contentTimeoutId);
    };
  }, [titleVisible, x, y, showStaticHero]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      showStaticHero();
      return;
    }
    if (!contentVisible || hasTypedRef.current) return;
    hasTypedRef.current = true;

    let si = 0;
    const summaryTimer = setInterval(() => {
      if (prefersReducedMotion()) {
        clearInterval(summaryTimer);
        showStaticHero();
        return;
      }
      if (si < fullSummary.length) {
        setDisplayedSummary(fullSummary.slice(0, si + 1));
        si++;
      } else {
        clearInterval(summaryTimer);
        let l1 = 0;
        const label1Timer = setInterval(() => {
          if (l1 < label1Text.length) {
            setDisplayedLabel1(label1Text.slice(0, l1 + 1));
            l1++;
          } else {
            clearInterval(label1Timer);
            if (label2Text.length === 0) return;
            let l2 = 0;
            const label2Timer = setInterval(() => {
              if (l2 < label2Text.length) {
                setDisplayedLabel2(label2Text.slice(0, l2 + 1));
                l2++;
              } else {
                clearInterval(label2Timer);
              }
            }, 30);
            timersRef.current.push(label2Timer);
          }
        }, 30);
        timersRef.current.push(label1Timer);
      }
    }, 18);
    timersRef.current.push(summaryTimer);

    return () => {
      clearAllTimers();
      hasTypedRef.current = false;
    };
  }, [contentVisible, fullSummary, label1Text, label2Text, showStaticHero]);

  useEffect(() => {
    if (!contentVisible || dispatchedRef.current) return;

    const summaryDone = displayedSummary.length === fullSummary.length;
    const label1Done =
      label1Text.length === 0 || displayedLabel1.length === label1Text.length;
    const label2Done =
      label2Text.length === 0 || displayedLabel2.length === label2Text.length;

    if (!summaryDone || !label1Done || !label2Done) return;

    dispatchedRef.current = true;
    const timeoutId = setTimeout(
      () => window.dispatchEvent(new CustomEvent("heroContentDone")),
      280,
    );
    return () => clearTimeout(timeoutId);
  }, [
    contentVisible,
    displayedSummary,
    fullSummary,
    displayedLabel1,
    label1Text,
    displayedLabel2,
    label2Text,
  ]);

  const showSummaryCursor =
    contentVisible && displayedSummary.length < fullSummary.length;
  const showLabel1Cursor =
    displayedSummary.length === fullSummary.length &&
    displayedLabel1.length < label1Text.length;
  const showLabel2Cursor =
    displayedLabel1.length === label1Text.length &&
    label2Text.length > 0 &&
    displayedLabel2.length < label2Text.length;

  return (
    <section id="hero" className="hero-poster-section pt-14 md:pt-20">
      <div className="hero-poster-composition">
        <div
          className="hero-copy-column flex flex-col justify-center w-full md:max-w-[50%] shrink-0"
          style={{ perspective: 1200 }}
        >
          <motion.h1
            className="title-display hero-poster-title"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              opacity: titleOpacity,
              transition: "opacity 500ms ease",
            }}
            onMouseMove={mouseEnabled ? handleMouseMove : undefined}
            onMouseLeave={mouseEnabled ? handleMouseLeave : undefined}
          >
            {hero.headline.split(/\s+/).map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="hero-poster-title-line inline-block origin-center"
                style={{ transform: "translateZ(20px)" }}
              >
                {word}
              </span>
            ))}
          </motion.h1>

          <p
            className="hero-summary max-w-xl text-base leading-relaxed md:text-lg font-light text-black/82"
            style={{
              opacity: contentVisible ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          >
            <span>{displayedSummary}</span>
            {showSummaryCursor && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-black ml-1 animate-pulse"
                style={{ verticalAlign: "middle" }}
              />
            )}
          </p>
        </div>

        <div
          className="hero-reveal flex-1 flex items-center justify-center"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 600ms ease 150ms, transform 600ms ease 150ms",
          }}
        >
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
                <span className="hero-side-labels-text">
                  {displayedLabel1 || "\u00A0"}
                </span>
                {showLabel1Cursor && (
                  <span className="inline-block w-[1.5px] h-[1.1em] bg-black ml-0.5 animate-pulse" />
                )}
              </li>
              <li className="hero-side-labels-line hero-side-labels-line--second">
                <span className="hero-side-labels-text">
                  {displayedLabel2 || "\u00A0"}
                </span>
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
