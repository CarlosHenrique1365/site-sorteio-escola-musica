import axios from "axios";

/**
 * Instância central do Axios.
 * Configure VITE_API_URL no seu .env apontando para o webhook do n8n.
 * Ex: VITE_API_URL=https://seu-n8n.exemplo.com/webhook
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5678/webhook",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Anexa o token salvo (login do organizador) em toda requisição, se existir.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@escola-musica:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Cadastra um novo participante. Retorna { numero, nome, totalParticipantes }. */
export async function cadastrarParticipante({ nome, telefone }) {
  const { data } = await api.post("/cadastro", { nome, telefone });
  return data;
}

/** Lista todos os participantes cadastrados. */
export async function listarParticipantes() {
  const { data } = await api.get("/participantes");
  return data;
}

/** Autentica o organizador. Retorna { token, nome }. */
export async function login({ email, senha }) {
  const { data } = await api.post("/login", { email, senha });
  return data;
}

/** Executa o sorteio. Retorna o vencedor: { numero, nome, telefone }. */
export async function sortear({ ignorarGanhadores }) {
  const { data } = await api.post("/sortear", { ignorarGanhadores });
  return data;
}

/**
 * Retorna o histórico de sorteios, mais recente primeiro.
 * Cada item deve ter o formato: { numero, nome, telefone, sorteadoEm }
 * — "sorteadoEm" é uma string ISO 8601, usada pelo HistoryTable para exibir data e hora.
 */
export async function buscarHistorico() {
  const { data } = await api.get("/historico");
  return data;
}

export default api;
