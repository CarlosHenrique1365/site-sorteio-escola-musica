import styles from "./Loader.module.css";

/** Spinner simples. size: "sm" | "md" | "lg" */
export default function Loader({ size = "md", label = "Carregando" }) {
  return (
    <span className={styles.wrapper} role="status" aria-label={label}>
      <span className={`${styles.spinner} ${styles[size]}`} />
    </span>
  );
}
