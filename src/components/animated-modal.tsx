"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type AnimatedModalProps = {
  open: boolean;
  onClose: () => void;
  overlayClassName: string;
  panelClassName: string;
  children: ReactNode;
  ariaLabelledby?: string;
  ariaLabel?: string;
  closeOnOverlay?: boolean;
  onExitComplete?: () => void;
};

export function AnimatedModal({
  open,
  onClose,
  overlayClassName,
  panelClassName,
  children,
  ariaLabelledby,
  ariaLabel,
  closeOnOverlay = true,
  onExitComplete,
}: AnimatedModalProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          className={overlayClassName}
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={closeOnOverlay ? onClose : undefined}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-label={ariaLabel}
            className={panelClassName}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(evento) => evento.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
