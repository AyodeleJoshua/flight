import { useState } from 'react';
import { Modal } from '../../../lib';
import Button from '../../../lib/Button';
import { deteleFlight } from '../../../services/flightServices';
import { useNavigate } from 'react-router-dom';
import { ApiResponseError } from '../../../utils/types';
import styles from './deleteFlightConfirmationModal.module.css'; // Import the CSS module

interface DeleteFlightConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  flightId: string;
  errorSetter: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteFlightConfirmationModal = ({
  isOpen,
  onClose,
  flightId,
  errorSetter,
}: DeleteFlightConfirmationModalProps) => {
  const [isDeletingFlight, setIsDeletingFlight] = useState(false);
  const navigate = useNavigate();

  const handleFlightDelete = async () => {
    setIsDeletingFlight(true);
    try {
      await deteleFlight(flightId);
      navigate('/flights');
    } catch (error) {
      const responseError = error as ApiResponseError;
      errorSetter(responseError.response.data.message);
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        {!isDeletingFlight ? (
          <>
            <p className={styles.modalMessage}>
              Are you sure you want to delete this flight?
            </p>
            <div className={styles.buttonWrapper}>
              <Button
                className={`${styles.modalButton} ${styles.yesButton}`}
                ghost
                onClick={handleFlightDelete}
              >
                Yes
              </Button>
              <Button
                className={`${styles.modalButton} ${styles.noButton}`}
                onClick={onClose}
              >
                No
              </Button>
            </div>
          </>
        ) : (
          <p className={styles.deletingMessage}>Deleting Flight...</p>
        )}
      </div>
    </Modal>
  );
};

export default DeleteFlightConfirmationModal;
