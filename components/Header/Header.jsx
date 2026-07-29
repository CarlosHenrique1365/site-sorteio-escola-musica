import { FiMusic, FiLogOut } from "react-icons/fi";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.css";

/** Cabeçalho fixo. Mostra ações de sessão apenas quando há usuário autenticado. */
export default function Header({ title = "Escola de Música" }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <FiMusic aria-hidden="true" />
        <span>{title}</span>
      </div>
      {isAuthenticated && (
        <div className={styles.actions}>
          <span className={styles.userName}>Olá, {user?.nome}</span>
          <Button variant="ghost" onClick={logout} ariaLabel="Sair da conta">
            <FiLogOut />
            Sair
          </Button>
        </div>
      )}
    </header>
  );
}
