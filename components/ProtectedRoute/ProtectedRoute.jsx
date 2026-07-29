import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

/** Bloqueia o acesso a rotas restritas (ex: /organizador) sem login válido. */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <Loader size="lg" label="Verificando sessão" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
