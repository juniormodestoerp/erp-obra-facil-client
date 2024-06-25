import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { PAYMENT_METHOD_QUERY_KEY } from '@app/hooks/payment-methods/use-payment-methods'
import { paymentMethodsService } from '@app/services/payment-methods'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdatePaymentMethodCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: paymentMethodsService.save,
		onMutate: (variables) => {
			const previousPaymentMethods = queryClient.getQueryData<
				IPaymentMethodDTO[]
			>(PAYMENT_METHOD_QUERY_KEY)

			queryClient.setQueryData<IPaymentMethodDTO[]>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) =>
					old?.map((paymentMethod) =>
						paymentMethod.id === variables.id
							? { ...paymentMethod, ...variables }
							: paymentMethod,
					),
			)

			return { previousPaymentMethods }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY })

			queryClient.setQueryData<IPaymentMethodDTO[]>(
				PAYMENT_METHOD_QUERY_KEY,
				context?.previousPaymentMethods,
			)
		},
	})

	return {
		updatePaymentMethod: mutateAsync,
		isLoading: isPending,
	}
}
