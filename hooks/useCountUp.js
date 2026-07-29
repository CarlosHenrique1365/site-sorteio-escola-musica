import { useEffect, useState } from "react";

/**
 * Anima um número de 0 (ou do valor anterior) até `target` em `duration` ms.
 * Usado no CounterCard e nos números da roleta.
 */
export default function useCountUp(target = 0, duration = 1200, disabled = false) {
  const [value, setValue] = useState(disabled ? target : 0);

  useEffect(() => {
    if (disabled) {
      setValue(target);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const startValue = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, disabled]);

  return value;
}
