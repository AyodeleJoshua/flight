import TextInput from '../../lib/TextInput';
import styles from './flightFilter.module.css'; // Import the CSS module

interface FlightFilterProps {
  handleCodeChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FlightFilter = ({ handleCodeChange }: FlightFilterProps) => {
  return (
    <div className={styles.filterContainer}>
      <TextInput label="Code" onChange={handleCodeChange} />
    </div>
  );
};

export default FlightFilter;
