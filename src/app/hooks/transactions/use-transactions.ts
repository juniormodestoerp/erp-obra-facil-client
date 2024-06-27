import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import { transactionsService } from '@app/services/transactions'
import type { AppError } from '@app/services/http-client'
import type { WithStatus } from '@app/utils/with-status'

export type TransactionsQueryData = WithStatus<ITransactionDTO>[]

export const TRANSACTION_QUERY_KEY = ['transactions']

export function useTransactions() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: TRANSACTION_QUERY_KEY,
		queryFn: async () => {
			try {
				return await transactionsService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'A conta solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ITransactionDTO[]>(
						TRANSACTION_QUERY_KEY,
						() => [],
					)
				}
			}
		},
	})

	return {
		transactions: data ?? [],
		isLoading,
	}
}
