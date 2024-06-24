import { parseError } from '@app/services/http-client'
import { paymentMethodsService } from '@app/services/payment-methods'
import type { IPaymentMethod } from '@app/services/payment-methods/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { PAYMENT_METHOD_QUERY_KEY } from './use-payment-methods'

interface ICreateIPaymentMethodCenter {
	id: string
	name: string
}

export function useUpdateIPaymentMethodCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async ({
			id,
			name,
		}: ICreateIPaymentMethodCenter): Promise<IPaymentMethod> => {
			return paymentMethodsService.save({ id, name })
		},
		onMutate: (variables) => {
			const previousIPaymentMethodCenters = queryClient.getQueryData<
				IPaymentMethod[]
			>(PAYMENT_METHOD_QUERY_KEY)

			if (!Array.isArray(previousIPaymentMethodCenters)) {
				return { previousIPaymentMethodCenters: [] }
			}

			queryClient.setQueryData<IPaymentMethod[]>(
				PAYMENT_METHOD_QUERY_KEY,
				(old) => {
					if (!Array.isArray(old)) {
						return []
					}
					return old.map((paymentMethod) =>
						paymentMethod.id === variables.id
							? { ...paymentMethod, ...variables }
							: paymentMethod,
					)
				},
			)

			return { previousIPaymentMethodCenters }
		},
		onSuccess: (_data, variables) => {
			toast.success(
				`Método de pagamento ${variables.name.toLowerCase()} atualizado com sucesso!`,
			)
		},
		onError: async (error, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: PAYMENT_METHOD_QUERY_KEY,
			})

			queryClient.setQueryData<IPaymentMethod[]>(
				PAYMENT_METHOD_QUERY_KEY,
				context?.previousIPaymentMethodCenters,
			)

			toast.error(parseError(error))
		},
	})

	return {
		updatePaymentMethod: mutateAsync,
		isLoading: isPending,
	}
}
