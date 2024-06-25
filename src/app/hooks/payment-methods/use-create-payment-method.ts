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
			const tmpUserId = String(Math.random())
			console.log('tmpUserId', tmpUserId)

			console.log('variables', variables)

			queryClient.setQueryData<PaymentMethodsQueryData>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) => {
					console.log('old', old)

					console.log(
						'setQueryData',
						old?.concat({
							...variables,
							id: tmpUserId,
							status: 'pending',
							createdAt: new Date().toISOString(),
						}),
					)

					return old?.concat({
						...variables,
						id: tmpUserId,
						status: 'pending',
						createdAt: new Date().toISOString(),
					})
				},
			)

			console.log('tmpUserId', tmpUserId)

			return { tmpUserId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY })

			queryClient.setQueryData<PaymentMethodsQueryData>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) =>
					old?.map((paymentMethod) =>
						paymentMethod.id === context.tmpUserId ? data : paymentMethod,
					),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY })

			queryClient.setQueryData<PaymentMethodsQueryData>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) =>
					old?.map((paymentMethod) =>
						paymentMethod.id === context?.tmpUserId
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
