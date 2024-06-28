import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	PAYMENT_METHOD_QUERY_KEY,
	type PaymentMethodsQueryData,
} from '@app/hooks/payment-methods/use-payment-methods'
import { paymentMethodsService } from '@app/services/payment-methods'

export function useCreatePaymentMethod() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: paymentMethodsService.create,
		onMutate: (variables) => {
			const tmpPaymentMethodId = String(Math.random())

			queryClient.setQueryData<PaymentMethodsQueryData>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) => {
					return old?.concat({
						...variables,
						id: tmpPaymentMethodId,
						createdAt: new Date().toISOString(),
					})
				},
			)

			return { tmpPaymentMethodId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY })

			queryClient.setQueryData<PaymentMethodsQueryData>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) =>
					old?.map((paymentMethod) =>
						paymentMethod.id === context.tmpPaymentMethodId
							? data
							: paymentMethod,
					),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY })

			queryClient.setQueryData<PaymentMethodsQueryData>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) =>
					old?.map((paymentMethod) =>
						paymentMethod.id === context?.tmpPaymentMethodId
							? { ...paymentMethod, status: 'error' }
							: paymentMethod,
					),
			)
		},
	})

	return {
		createPaymentMethod: mutateAsync,
		isLoading: isPending,
	}
}
