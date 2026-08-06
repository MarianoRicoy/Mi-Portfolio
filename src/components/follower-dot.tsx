"use client";

import { useEffect, useSyncExternalStore } from "react";
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

function subscribeHover(onStoreChange: () => void) {
  const mq = window.matchMedia("(hover: hover)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getHoverSnapshot() {
  return window.matchMedia("(hover: hover)").matches;
}

function subscribeClient(onStoreChange: () => void) {
  void onStoreChange;
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function FollowerDot() {
  const mounted = useSyncExternalStore(
    subscribeClient,
    getClientSnapshot,
    getServerSnapshot,
  );
  const hasHover = useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    () => false,
  );

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springX = useSpring(rawX, SPRING_CONFIG);
  const springY = useSpring(rawY, SPRING_CONFIG);

  const x = useTransform(springX, (v) => v - HALF);
  const y = useTransform(springY, (v) => v - HALF);

  useEffect(() => {
    if (!hasHover) return;

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasHover, rawX, rawY]);

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
