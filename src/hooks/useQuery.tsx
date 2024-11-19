import { useState, useEffect, useCallback } from 'react';

interface QueryState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

const cache: Record<string, any> = {};

const useQuery = <T,>(
  fetchFn: (params: Record<string, string | number>) => Promise<T>,
  searchParams: Record<string, string | number>,
): QueryState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cacheKey = JSON.stringify(searchParams);

  const fetchData = useCallback(async () => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await fetchFn(searchParams);
      cache[cacheKey] = result;
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, searchParams, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading };
};

export default useQuery;
