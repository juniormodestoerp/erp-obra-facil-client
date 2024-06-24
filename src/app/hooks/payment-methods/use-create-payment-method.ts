import { useMutation } from '@tanstack/react-query'

import { paymentMethodsService } from '@app/services/payment-methods'
import type { IPaymentMethod } from '@app/services/payment-methods/fetch'

interface ICreatePaymentMethod {
	name: string
}

export function useCreatePaymentMethod() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async ({
			name,
		}: ICreatePaymentMethod): Promise<IPaymentMethod> => {
			return paymentMethodsService.create({ name })
		},
	})

	return {
		createPaymentMethod: mutateAsync,
		isLoading: isPending,
	}
}
