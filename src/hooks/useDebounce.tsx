import { useState, useEffect } from 'react';

const useDebounce = <T,>(
  value: T,
  debouncedFunction: (value: T) => void,
  delay: number,
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedFunction(value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
