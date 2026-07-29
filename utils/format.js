/** Formata dígitos para (DD) 9XXXX-XXXX enquanto o usuário digita. */
export function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Garante que o número do participante sempre tenha 6 dígitos: 001248 */
export function formatParticipantNumber(number) {
  return String(number).padStart(6, "0");
}

/** Formata data/hora vindas da API (ISO) para exibição pt-BR. */
export function formatDateTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return { date: "--/--/----", time: "--:--" };
  return {
    date: date.toLocaleDateString("pt-BR"),
    time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  };
}
