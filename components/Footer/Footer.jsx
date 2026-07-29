import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Escola de Música — Sua música começa aqui.</p>
    </footer>
  );
}
