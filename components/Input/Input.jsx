import { useId } from "react";
import styles from "./Input.module.css";

/**
 * Campo de formulário com label, ícone opcional e mensagem de erro acessível.
 */
export default function Input({
  label,
  icon: Icon,
  error,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  required = false,
  ...rest
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div className={styles.group}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.inputWrapper} ${error ? styles.error : ""}`}>
        {Icon && (
          <span className={styles.icon} aria-hidden="true">
            <Icon size={18} />
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={styles.input}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
      </div>
      {error && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
