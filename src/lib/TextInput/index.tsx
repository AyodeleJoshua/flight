import { InputHTMLAttributes } from 'react';
import styles from './textInput.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = ({
  label,
  id = 'text-input',
  type,
  error,
  ...props
}: InputProps) => {
  return (
    <div className={styles.textInputContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} {...props} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TextInput;
