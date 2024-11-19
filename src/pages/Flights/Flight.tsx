import { useParams } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import { getFlightDetails, updateFlight } from '../../services/flightServices';
import {
  ApiResponseError,
  FlightDetailsSuccessfulResponseType,
} from '../../utils/types.d';
import Button from '../../lib/Button';
import { useState } from 'react';
import EditFlightForm from '../../components/EditFlightForm';
import { Alert } from '../../lib';
import DeleteFlightConfirmationModal from '../../components/modals/DeleteFlightConfirmationModal';
import FlightDetailsCard from '../../components/FlightDetailsCard';
import styles from './flights.module.css';
import Spinner from '../../lib/Spinner';

const Flight = () => {
  const { flightId } = useParams();
  const [editCount, setEditCount] = useState(1);
  let {
    data: flightDetails,
    isLoading: isLoadingFlightDetails,
    error: flightDetailsError,
  } = useQuery<FlightDetailsSuccessfulResponseType>(
    () => getFlightDetails(flightId as string),
    { a: editCount },
  );
  const [responseError, setResponseError] = useState('');
  const [isEditSuccessful, setIsEditSuccessful] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [
    showDeleteFlightConfirmationModal,
    setShowDeleteFlightConfirmationModal,
  ] = useState(false);

  const [showEditFlightForm, setShowEditFlightForm] = useState(false);

  const handleFormSubmit = async (
    values: any,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true);
    try {
      await updateFlight(flightId as string, values);
      setEditCount(editCount + 1);
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
      {(isEditSuccessful || deleteError) && (
        <Alert>{deleteError || 'Flight update successful'}</Alert>
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
      {flightDetailsError && <div>{flightDetailsError}</div>}

      {flightDetails && showEditFlightForm && (
        <EditFlightForm
          flightDetails={flightDetails}
          onFormSubmit={handleFormSubmit}
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
