import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import { TRANSACTION_QUERY_KEY } from '@app/hooks/transactions/use-transactions'
import { transactionsService } from '@app/services/transactions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTransaction() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: transactionsService.save,
		onMutate: (variables) => {
			const previousTransactions = queryClient.getQueryData<ITransactionDTO[]>(
				TRANSACTION_QUERY_KEY,
			)

			queryClient.setQueryData<ITransactionDTO[]>(
				TRANSACTION_QUERY_KEY,
				(old) =>
					old?.map((transaction) =>
						transaction.id === variables.id
							? { ...transaction, ...variables }
							: transaction,
					),
			)

			return { previousTransactions }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TRANSACTION_QUERY_KEY })

			queryClient.setQueryData<ITransactionDTO[]>(
				TRANSACTION_QUERY_KEY,
				context?.previousTransactions,
			)
		},
	})

	return {
		updateTransaction: mutateAsync,
		isLoading: isPending,
	}
}
