import { useQuery } from '@tanstack/react-query'

import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { paymentMethodsService } from '@app/services/payment-methods'
import type { WithStatus } from '@app/utils/with-status'

export type PaymentMethodsQueryData = WithStatus<IPaymentMethodDTO>[]

export const PAYMENT_METHOD_QUERY_KEY = ['paymentMethods']

export function usePaymentMethods() {
	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: PAYMENT_METHOD_QUERY_KEY,
		queryFn: async () => {
			return await paymentMethodsService.fetch()
		},
	})

	return {
		paymentMethods: data ?? [],
		isLoading,
	}
}
