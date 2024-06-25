import type { ITransferDTO } from '@app/dtos/transfer-dto'
import { TRANSFER_QUERY_KEY } from '@app/hooks/transfers/use-transfers'
import { transfersService } from '@app/services/transfers'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTransferCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: transfersService.save,
		onMutate: (variables) => {
			const previousTransfers = queryClient.getQueryData<
				ITransferDTO[]
			>(TRANSFER_QUERY_KEY)

			queryClient.setQueryData<ITransferDTO[]>(
				TRANSFER_QUERY_KEY,
				(old) =>
					old?.map((transfer) =>
						transfer.id === variables.id
							? { ...transfer, ...variables }
							: transfer,
					),
			)

			return { previousTransfers }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TRANSFER_QUERY_KEY })

			queryClient.setQueryData<ITransferDTO[]>(
				TRANSFER_QUERY_KEY,
				context?.previousTransfers,
			)
		},
	})

	return {
		updateTransfer: mutateAsync,
		isLoading: isPending,
	}
}
