import { motion } from "framer-motion";
import styles from "./Button.module.css";
import Loader from "../Loader/Loader";

/**
 * Botão padrão da aplicação.
 * variant: "primary" | "secondary" | "ghost"
 */
export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  ariaLabel,
  ...rest
}) {
  const classNames = [styles.button, styles[variant], fullWidth ? styles.fullWidth : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {loading ? <Loader size="sm" /> : children}
    </motion.button>
  );
}
