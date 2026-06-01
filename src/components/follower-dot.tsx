"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

/** Tamaño del punto en px — se resta la mitad para centrarlo exactamente */
const DOT_SIZE = 8;
const HALF = DOT_SIZE / 2;

/** Parámetros del resorte: retraso orgánico y suave */
const SPRING_CONFIG = {
  stiffness: 150,
  damping: 15,
  mass: 0.5,
};

export function FollowerDot() {
  const [mounted, setMounted] = useState(false);
  const [hasHover, setHasHover] = useState(false);

  // Motion values crudas (sin spring) para la posición real del mouse
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Valores con física de resorte aplicada
  const springX = useSpring(rawX, SPRING_CONFIG);
  const springY = useSpring(rawY, SPRING_CONFIG);

  // Restamos la mitad del tamaño para centrar el punto en la punta del cursor
  const x = useTransform(springX, (v) => v - HALF);
  const y = useTransform(springY, (v) => v - HALF);

  useEffect(() => {
    setMounted(true);
    // Solo en dispositivos que soportan hover real (no táctiles)
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (!hasHover) return;

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasHover, rawX, rawY]);

  // No renderizar en SSR ni en táctil
  if (!mounted || !hasHover) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, width: DOT_SIZE, height: DOT_SIZE }}
      className="
        fixed top-0 left-0 z-[9999]
        rounded-full
        bg-[var(--foreground)]
        opacity-55
        pointer-events-none
        will-change-transform
      "
    />
  );
}
