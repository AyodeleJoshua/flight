import { useEffect, useMemo, useState } from 'react';
import FlightFilter from '../../components/FlightFilter';
import { Alert, Table } from '../../lib';
// import useQuery from '../../hooks/useQuery';
import { getFlights } from '../../services/flightServices';
import useDebounce from '../../hooks/useDebounce';
import Spinner from '../../lib/Spinner';
import { useQuery } from '@tanstack/react-query';

const Flights = () => {
  const [searchParams, setSearchParams] = useState<{
    page: number;
    size: number;
    code?: string;
  }>({
    page: 1,
    size: 10,
  });
  const [inputCode, setInputCode] = useState('');
  const [inputCodeForFilter, setInputCodeForFilter] = useState('');

  useDebounce(inputCode, () => setInputCodeForFilter(inputCode), 1000);

  useEffect(() => {
    if (inputCodeForFilter !== '') {
      setSearchParams({ ...searchParams, code: inputCodeForFilter });
    } else {
      const params = { ...searchParams };
      delete params.code;
      setSearchParams(params);
    }
  }, [inputCodeForFilter]);

  const {
    data: flights,
    isLoading: isFlightsLoading,
    error: flightsError,
  } = useQuery({
    queryKey: [
      'all-flights',
      searchParams.size,
      searchParams.page,
      inputCodeForFilter,
    ],
    queryFn: () => getFlights(searchParams),
  });

  const flightsTableColumn = useMemo(
    () => [
      { key: 'id', title: 'ID' },
      { key: 'code', title: 'Code' },
      { key: 'capacity', title: 'Capacity' },
      { key: 'departureDate', title: 'Departure Date' },
      { key: 'status', title: 'Status' },
      {
        key: 'id',
        title: 'Action',
        fn: (flightId: string | number) => (
          <>
            <a href={`/flights/${flightId}`}>View flight</a>
          </>
        ),
      },
    ],
    [],
  );

  const handleFlightFilterChangeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setInputCode(e.currentTarget.value);
  };

  return (
    <div>
      <FlightFilter handleCodeChange={handleFlightFilterChangeChange} />
      {isFlightsLoading && <Spinner />}
      {flightsError && <Alert>{flightsError.message}</Alert>}
      {!isFlightsLoading && flights && (
        <div>
          <Table
            columns={flightsTableColumn}
            dataSource={
              (flights?.resources as unknown as Record<
                string,
                string | number
              >[]) || []
            }
          />
        </div>
      )}
    </div>
  );
};

export default Flights;
