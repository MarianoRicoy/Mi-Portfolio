import { useLayoutEffect, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

export function prefersReducedMotion() {
  return window.matchMedia(QUERY).matches;
}

export function subscribeReducedMotion(onChange: () => void) {
  return subscribe(onChange);
}

/** En el servidor asume movimiento permitido para no desalinear el HTML inicial. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false);
}

export const useIsomorphicLayoutEffect = useLayoutEffect;
