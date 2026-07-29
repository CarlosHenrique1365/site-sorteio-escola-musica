import { useMemo } from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./WaveBackground.module.css";

/**
 * Background ambiente inspirado em um palco de concerto: painéis de madeira,
 * spotlights, silhuetas de piano/violão/microfone e partículas douradas.
 * O centro permanece livre para leitura, conforme o briefing.
 */
export default function WaveBackground() {
  const reducedMotion = usePrefersReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 6,
      })),
    []
  );

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={`${styles.woodPanel} ${styles.left}`} />
      <div className={`${styles.woodPanel} ${styles.right}`} />
      <div className={`${styles.spotlight} ${styles.spotlightLeft}`} />
      <div className={`${styles.spotlight} ${styles.spotlightRight}`} />

      {/* Silhueta de piano de cauda */}
      <svg className={`${styles.silhouette} ${styles.piano}`} viewBox="0 0 200 120" fill="currentColor">
        <path d="M10 90 C 40 60, 120 40, 190 55 L 190 70 C 130 62, 55 78, 20 105 Z" />
        <rect x="18" y="100" width="150" height="8" rx="2" />
      </svg>

      {/* Silhueta de violão */}
      <svg className={`${styles.silhouette} ${styles.guitar}`} viewBox="0 0 100 220" fill="currentColor">
        <path d="M50 5 L54 90 C78 100 84 130 68 155 C86 168 86 200 55 212 C24 200 24 168 42 155 C26 130 32 100 46 90 Z" />
      </svg>

      {/* Silhueta de microfone */}
      <svg className={`${styles.silhouette} ${styles.mic}`} viewBox="0 0 60 100" fill="currentColor">
        <rect x="20" y="4" width="20" height="42" rx="10" />
        <path d="M12 40 a18 18 0 0 0 36 0" stroke="currentColor" strokeWidth="4" fill="none" />
        <line x1="30" y1="58" x2="30" y2="90" stroke="currentColor" strokeWidth="4" />
      </svg>

      {!reducedMotion &&
        particles.map((particle) => (
          <motion.span
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.6, 0] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {!reducedMotion && (
        <>
          <motion.div
            className={styles.soundWave}
            style={{ top: "30%" }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={styles.soundWave}
            style={{ top: "62%" }}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </>
      )}
    </div>
  );
}
