import Card from "../Card/Card";
import useCountUp from "../../hooks/useCountUp";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./CounterCard.module.css";

/** Card compacto com número animado + label + ícone opcional. Usado nos painéis. */
export default function CounterCard({ icon: Icon, value = 0, label }) {
  const reducedMotion = usePrefersReducedMotion();
  const animatedValue = useCountUp(value, 1400, reducedMotion);

  return (
    <Card className={styles.card}>
      {Icon && (
        <span className={styles.icon} aria-hidden="true">
          <Icon size={26} />
        </span>
      )}
      <span className={styles.value}>{animatedValue.toLocaleString("pt-BR")}</span>
      <span className={styles.label}>{label}</span>
    </Card>
  );
}
