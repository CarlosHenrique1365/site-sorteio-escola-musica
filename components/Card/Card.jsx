import { motion } from "framer-motion";
import styles from "./Card.module.css";

/**
 * Card genérico com efeito glass.
 * pianoStripes: exibe as listras douradas/creme no topo (referência a teclas de piano).
 */
export default function Card({
  children,
  pianoStripes = false,
  highlight = false,
  className = "",
  as: Component = motion.div,
  ...rest
}) {
  return (
    <Component
      className={`${styles.card} ${highlight ? styles.highlight : ""} ${className}`}
      {...rest}
    >
      {pianoStripes && (
        <span className={styles.pianoStripes} aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} />
          ))}
        </span>
      )}
      {children}
    </Component>
  );
}
