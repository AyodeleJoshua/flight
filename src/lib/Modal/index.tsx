import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose = () => null, children }: ModalProps) => {
  if (!isOpen) return null; // If the modal isn't open, don't render anything

  // Render modal using React Portal
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body, // Render the modal at the body element
  );
};

export default Modal;
