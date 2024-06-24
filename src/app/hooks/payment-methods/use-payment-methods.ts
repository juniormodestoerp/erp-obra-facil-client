import { useQuery } from '@tanstack/react-query'

import { paymentMethodsService } from '@app/services/payment-methods'
import type { IPaymentMethod } from '@app/services/payment-methods/fetch'
import type { WithStatus } from '@app/utils/with-status'

export const PAYMENT_METHOD_QUERY_KEY = ['paymentMethods']

export type PaymentMethodsQueryData = WithStatus<IPaymentMethod>[]

export function usePaymentMethods() {
	const { data, isLoading, refetch } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: PAYMENT_METHOD_QUERY_KEY,
		queryFn: async () => {
			const paymentMethods = await paymentMethodsService.fetch()
			return paymentMethods
		},
	})

	return {
		paymentMethods: data?.paymentMethods ?? [],
		isLoading,
		refetch,
	}
}
