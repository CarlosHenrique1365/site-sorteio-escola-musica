/**
 * Divide um título em palavras prontas para animação stagger no Framer Motion.
 * Uso: const words = useWordReveal("Sua música começa aqui");
 */
export default function useWordReveal(text) {
  return text.split(" ");
}
