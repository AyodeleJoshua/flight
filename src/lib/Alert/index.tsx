import { ReactNode } from 'react';
import styles from './alert.module.css';

interface AlertProps {
  children: ReactNode;
  success?: boolean;
}

const Alert = ({ children, success }: AlertProps) => {
  return (
    <div className={`${styles.alert} ${success ? styles.successalert : ''}`}>
      <span>{children}</span>
    </div>
  );
};

export default Alert;
