import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Atalho para consumir o AuthContext dentro de qualquer componente.
 * Uso: const { user, login, logout, loading } = useAuth();
 */
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>");
  }
  return context;
}
