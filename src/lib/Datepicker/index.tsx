import { useState } from 'react';
import { Calendar } from 'react-date-range';
import { format as formatDate } from 'date-fns';
import styles from './datePicker.module.css';
import calendarIcon from '../../assets/icons/calendar.svg';

interface DatePickerProps {
  label: string;
  defaultSelected?: string;
  onDateChange?: React.ChangeEventHandler<HTMLInputElement>;
  format?: string;
  error?: string;
  id?: string;
  hasError?: boolean;
}

function Datepicker({
  label,
  format = 'd LLLL, yy',
  onDateChange,
  defaultSelected,
  error,
  id = 'datepicker',
  hasError,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(
    defaultSelected || 'Select Date',
  );
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={styles.datepicker}>
      <div>{label}</div>
      <button
        type="button"
        className={styles.button}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <img src={calendarIcon} alt="Calendar icon" className={styles.icon} />
        <p>{selectedDate}</p>
      </button>
      {hasError && error && <span>{error}</span>}
      {showCalendar && (
        <Calendar
          className={styles.calendar}
          onChange={(date) => {
            const formattedDate = formatDate(date, format);
            setSelectedDate(formattedDate);
            if (onDateChange) {
              const simulatedEvent = {
                target: {
                  name: id,
                  value: formattedDate,
                },
              } as unknown as React.FormEvent<HTMLInputElement>;
              onDateChange(
                simulatedEvent as React.ChangeEvent<HTMLInputElement>,
              );
            }
            setShowCalendar(false);
          }}
        />
      )}
    </div>
  );
}

export default Datepicker;
