import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	TRANSFER_QUERY_KEY,
	type TransfersQueryData,
} from '@app/hooks/transfers/use-transfers'
import { transfersService } from '@app/services/transfers'

export function useCreateTransfer() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: transfersService.create,
		onMutate: (variables) => {
			const tmpTransferId = String(Math.random())

			queryClient.setQueryData<TransfersQueryData>(
				TRANSFER_QUERY_KEY,
				(old) => {
					return old?.concat({
						...variables,
						id: tmpTransferId,
						status: 'pending',
						createdAt: new Date().toISOString(),
					})
				},
			)

			return { tmpTransferId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TRANSFER_QUERY_KEY })

			queryClient.setQueryData<TransfersQueryData>(TRANSFER_QUERY_KEY, (old) =>
				old?.map((transfer) =>
					transfer.id === context.tmpTransferId ? data : transfer,
				),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TRANSFER_QUERY_KEY })

			queryClient.setQueryData<TransfersQueryData>(TRANSFER_QUERY_KEY, (old) =>
				old?.map((transfer) =>
					transfer.id === context?.tmpTransferId
						? { ...transfer, status: 'error' }
						: transfer,
				),
			)
		},
	})

	return {
		createTransfer: mutateAsync,
		isLoading: isPending,
	}
}
