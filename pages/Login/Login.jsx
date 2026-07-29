import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import Header from "../../components/Header/Header";
import WaveBackground from "../../components/WaveBackground/WaveBackground";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/organizador");
    } catch {
      setError("E-mail ou senha inválidos. Verifique e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <WaveBackground />
      <Header />
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card pianoStripes className={styles.card}>
            <h2 className={styles.title}>Acesso do organizador</h2>
            <p className={styles.subtitle}>Entre para acompanhar cadastros e realizar o sorteio.</p>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                label="E-mail"
                icon={FiMail}
                type="email"
                placeholder="voce@escoladamusica.com"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
              <Input
                label="Senha"
                icon={FiLock}
                type="password"
                placeholder="••••••••"
                value={form.senha}
                onChange={(event) => setForm((prev) => ({ ...prev, senha: event.target.value }))}
                required
              />
              {error && (
                <p role="alert" style={{ color: "var(--color-error)", fontSize: "var(--fs-sm)" }}>
                  {error}
                </p>
              )}
              <Button type="submit" fullWidth loading={loading}>
                Entrar
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
