import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import type { AppError } from '@app/services/http-client'
import { paymentMethodsService } from '@app/services/payment-methods'
import type { WithStatus } from '@app/utils/with-status'

export type PaymentMethodsQueryData = WithStatus<IPaymentMethodDTO>[]

export const PAYMENT_METHOD_QUERY_KEY = ['paymentMethods']

export function usePaymentMethods() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: PAYMENT_METHOD_QUERY_KEY,
		queryFn: async () => {
			try {
				return await paymentMethodsService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'O método de pagamento solicitado não foi encontrado.'
				) {
					queryClient.setQueryData<IPaymentMethodDTO[]>(
						PAYMENT_METHOD_QUERY_KEY,
						() => [],
					)
				}
			}
		},
	})

	return {
		paymentMethods: data ?? [],
		isLoading,
	}
}
