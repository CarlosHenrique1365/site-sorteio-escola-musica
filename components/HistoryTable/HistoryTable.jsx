import { motion } from "framer-motion";
import { formatParticipantNumber, formatDateTime } from "../../utils/format";
import styles from "./HistoryTable.module.css";

/**
 * Tabela reutilizável.
 * variant "participantes": Número | Nome | Telefone
 * variant "historico": Número | Nome | Telefone | Data | Hora
 */
export default function HistoryTable({ rows = [], variant = "participantes", emptyMessage }) {
  if (!rows.length) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.empty}>{emptyMessage || "Nenhum registro encontrado ainda."}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome</th>
            <th>Telefone</th>
            {variant === "historico" && (
              <>
                <th>Data</th>
                <th>Hora</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const { date, time } = row.sorteadoEm ? formatDateTime(row.sorteadoEm) : {};
            return (
              <motion.tr
                key={row.numero ?? index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.4) }}
              >
                <td className={styles.numberCell}>{formatParticipantNumber(row.numero)}</td>
                <td>{row.nome}</td>
                <td>{row.telefone}</td>
                {variant === "historico" && (
                  <>
                    <td>{date}</td>
                    <td>{time}</td>
                  </>
                )}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
