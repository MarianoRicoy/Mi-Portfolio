"use client";

import { useEffect, useRef } from "react";
import {
  prefersReducedMotion,
  subscribeReducedMotion,
} from "@/hooks/use-prefers-reduced-motion";

export function useScrollReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;

    const reveal = (withDelay: boolean) => {
      el.style.transitionDelay = withDelay ? `${delay}ms` : "0ms";
      el.classList.add("scroll-reveal--visible");
      observer?.disconnect();
    };

    const unsubscribe = subscribeReducedMotion(() => {
      if (prefersReducedMotion()) reveal(false);
    });

    if (prefersReducedMotion()) {
      reveal(false);
      return unsubscribe;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      reveal(true);
      return unsubscribe;
    }

    el.style.transitionDelay = `${delay}ms`;
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal--visible");
          observer?.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => {
      unsubscribe();
      observer?.disconnect();
    };
  }, [delay]);

  return ref;
}
