import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useCallback } from "react";

export function useMouseRotation(intensity: number = 15) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map the normalized position (0 to 1) to rotation degrees (-intensity to +intensity)
  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      // Opt-out of interaction for touch devices
      if (window.matchMedia("(hover: none)").matches) return;

      const rect = e.currentTarget.getBoundingClientRect();
      
      // Calculate mouse position relative to the element
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Normalize values between 0 and 1
      x.set(mouseX / rect.width);
      y.set(mouseY / rect.height);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    // Reset to center smoothly when mouse leaves
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
