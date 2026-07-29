import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./MusicNotes.module.css";

const SYMBOLS = ["♪", "♫", "♩", "♬"];
const RAIN_DURATION_MS = 4000;

/**
 * Dispara uma chuva de notas musicais por ~4 segundos.
 * Uso: <MusicNotes trigger={algumaVariavelQueMuda} />
 */
export default function MusicNotes({ trigger, count = 26 }) {
  const [active, setActive] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (trigger === undefined || trigger === null || trigger === false) return undefined;
    setActive(true);
    const timeout = setTimeout(() => setActive(false), RAIN_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [trigger]);

  const notes = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: `${index}-${trigger}`,
        left: Math.random() * 100,
        symbol: SYMBOLS[index % SYMBOLS.length],
        duration: 2.4 + Math.random() * 1.6,
        delay: Math.random() * 1.2,
        drift: Math.random() * 60 - 30,
      })),
    [count, trigger]
  );

  if (reducedMotion || !active) return null;

  return (
    <div className={styles.container} aria-hidden="true">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.span
            key={note.id}
            className={styles.note}
            style={{ left: `${note.left}%` }}
            initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: note.drift, rotate: 25 }}
            transition={{ duration: note.duration, delay: note.delay, ease: "easeIn" }}
          >
            {note.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
