import { useMemo } from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./Equalizer.module.css";

/**
 * Barras de equalizador discretas no rodapé, com alturas e velocidades
 * levemente aleatórias, simulando um espectro de áudio contínuo.
 */
export default function Equalizer({ barCount = 40 }) {
  const reducedMotion = usePrefersReducedMotion();

  const bars = useMemo(
    () =>
      Array.from({ length: barCount }).map((_, index) => ({
        id: index,
        min: 6 + Math.random() * 10,
        max: 20 + Math.random() * 34,
        duration: 0.9 + Math.random() * 1.2,
        delay: Math.random() * 1.2,
      })),
    [barCount]
  );

  return (
    <div className={styles.equalizer} aria-hidden="true">
      {bars.map((bar) => (
        <motion.span
          key={bar.id}
          className={styles.bar}
          initial={{ height: bar.min }}
          animate={
            reducedMotion
              ? { height: (bar.min + bar.max) / 2 }
              : { height: [bar.min, bar.max, bar.min] }
          }
          transition={{
            duration: bar.duration,
            delay: bar.delay,
            repeat: reducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
