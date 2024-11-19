import { FlightDetailsSuccessfulResponseType } from '../../utils/types';
import styles from './flightDetailsCard.module.css';

interface FlightDetailsCardProps {
  flightDetails: FlightDetailsSuccessfulResponseType;
}

const FlightDetailsCard = ({ flightDetails }: FlightDetailsCardProps) => {
  const details = [
    { key: 'id', displayName: 'ID' },
    { key: 'code', displayName: 'Code' },
    { key: 'capacity', displayName: 'Capacity' },
    { key: 'departureDate', displayName: 'Departure Date' },
    { key: 'status', displayName: 'Status' },
  ];

  return (
    <div className={styles.cardContainer}>
      {details.map((detail) => (
        <div key={detail.key} className={styles.detailsRow}>
          <p className={styles.detailsLabel}>{detail.displayName}</p>
          <p className={styles.detailsValue}>
            {
              flightDetails[
                detail.key as keyof FlightDetailsSuccessfulResponseType
              ]
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default FlightDetailsCard;
