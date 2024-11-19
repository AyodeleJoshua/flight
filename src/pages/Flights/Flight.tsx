import { useParams } from 'react-router-dom';
import { getFlightDetails, updateFlight } from '../../services/flightServices';
import { ApiResponseError } from '../../utils/types.d';
import Button from '../../lib/Button';
import { useState } from 'react';
import EditFlightForm from '../../components/EditFlightForm';
import { Alert } from '../../lib';
import DeleteFlightConfirmationModal from '../../components/modals/DeleteFlightConfirmationModal';
import FlightDetailsCard from '../../components/FlightDetailsCard';
import styles from './flights.module.css';
import Spinner from '../../lib/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Flight = () => {
  const { flightId } = useParams();
  const {
    data: flightDetails,
    isLoading: isLoadingFlightDetails,
    error: flightDetailsError,
  } = useQuery({
    queryKey: ['flight', flightId],
    queryFn: () => getFlightDetails(flightId as string),
  });
  const queryClient = useQueryClient();
  const [responseError, setResponseError] = useState('');
  const [isEditSuccessful, setIsEditSuccessful] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [
    showDeleteFlightConfirmationModal,
    setShowDeleteFlightConfirmationModal,
  ] = useState(false);

  const [showEditFlightForm, setShowEditFlightForm] = useState(false);

  const handleEditFormSubmit = async (
    values: any,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true);
    try {
      await updateFlight(flightId as string, values);
      queryClient.invalidateQueries({ queryKey: ['flight'] });
      setIsEditSuccessful(true);
      setShowEditFlightForm(false);
    } catch (error) {
      const responseError = error as ApiResponseError;
      setResponseError(responseError.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {deleteError && <Alert>{deleteError}</Alert>}

      {isEditSuccessful && !showEditFlightForm && (
        <Alert success>Flight update successful</Alert>
      )}

      {isLoadingFlightDetails && <Spinner />}
      {!isLoadingFlightDetails && flightDetails && !showEditFlightForm && (
        <>
          <FlightDetailsCard flightDetails={flightDetails} />
          <div className={styles.buttonContainer}>
            <Button onClick={() => setShowEditFlightForm(true)}>
              Edit Flight
            </Button>
            <Button
              ghost
              onClick={() => setShowDeleteFlightConfirmationModal(true)}
            >
              Delete Flight
            </Button>
          </div>
        </>
      )}
      {flightDetailsError && <div>{flightDetailsError.message}</div>}

      {flightDetails && showEditFlightForm && (
        <EditFlightForm
          flightDetails={flightDetails}
          onFormSubmit={handleEditFormSubmit}
          responseError={responseError}
        />
      )}

      <DeleteFlightConfirmationModal
        isOpen={showDeleteFlightConfirmationModal}
        onClose={() => setShowDeleteFlightConfirmationModal(false)}
        flightId={flightId as string}
        errorSetter={setDeleteError}
      />
    </div>
  );
};

export default Flight;
