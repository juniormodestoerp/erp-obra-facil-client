import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	TRANSACTION_QUERY_KEY,
	type TransactionsQueryData,
} from '@app/hooks/transactions/use-transactions'
import { transactionsService } from '@app/services/transactions'

export function useCreateTransaction() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: transactionsService.create,
		onMutate: (variables) => {
			const tmpTransactionId = String(Math.random())

			queryClient.setQueryData<TransactionsQueryData>(
				TRANSACTION_QUERY_KEY,
				(old) => {
					return old?.concat({
						...variables,
						id: tmpTransactionId,
						status: 'pending',
						createdAt: new Date().toISOString(),
					})
				},
			)

			return { tmpTransactionId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TRANSACTION_QUERY_KEY })

			queryClient.setQueryData<TransactionsQueryData>(
				TRANSACTION_QUERY_KEY,
				(old) =>
					old?.map((transaction) =>
						transaction.id === context.tmpTransactionId ? data : transaction,
					),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TRANSACTION_QUERY_KEY })

			queryClient.setQueryData<TransactionsQueryData>(
				TRANSACTION_QUERY_KEY,
				(old) =>
					old?.map((transaction) =>
						transaction.id === context?.tmpTransactionId
							? { ...transaction, status: 'error' }
							: transaction,
					),
			)
		},
	})

	return {
		createTransaction: mutateAsync,
		isLoading: isPending,
	}
}
