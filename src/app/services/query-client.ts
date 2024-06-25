import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5000,
			retry: false,
			refetchOnWindowFocus: false,
			gcTime: 10 * 60 * 1000, // 10 minutes
		},
	},
})
