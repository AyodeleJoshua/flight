import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentType } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, staleTime: Infinity, refetchOnWindowFocus: false },
  },
});

function withQueryClient(WrappedComponent: ComponentType) {
  return function WithQueryClientComponent() {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent />
      </QueryClientProvider>
    );
  };
}

export default withQueryClient;
