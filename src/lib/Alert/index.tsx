import { ReactNode } from 'react';
import styles from './alert.module.css';

interface AlertProps {
  children: ReactNode;
  success?: boolean;
}

const Alert = ({ children, success }: AlertProps) => {
  return (
    <div
      role="alert"
      className={`${styles.alert} ${success ? styles.successalert : ''}`}
    >
      {children}
    </div>
  );
};

export default Alert;
