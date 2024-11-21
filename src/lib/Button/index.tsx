import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  ghost?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, ghost, ...props }, ref) => (
    <button
      type="button"
      role="button"
      ref={ref}
      {...props}
      className={`${styles.button} ${ghost ? styles.ghostButton : ''}`}
    >
      {loading ? 'loading...' : <span>{children}</span>}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
