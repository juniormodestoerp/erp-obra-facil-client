import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			retryOnMount: false,
			staleTime: Number.POSITIVE_INFINITY,
		},
	},
})
