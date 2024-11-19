import { ReactNode } from 'react';
import styles from './alert.module.css';

interface AlertProps {
  children: ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  return (
    <div className={styles.alert}>
      <span>{children}</span>
      <button className={styles.closeButton} aria-label="Close">
        ×
      </button>
    </div>
  );
};

export default Alert;
