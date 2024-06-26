import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { bankAccountsService } from '@app/services/bank-accounts'
import type { AppError } from '@app/services/http-client'
import type { WithStatus } from '@app/utils/with-status'

export type BankAccountsQueryData = WithStatus<IBankAccountDTO>[]

export const BANK_ACCOUNT_QUERY_KEY = ['bankAccounts']

export function useBankAccounts() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: BANK_ACCOUNT_QUERY_KEY,
		queryFn: async () => {
			try {
				return await bankAccountsService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'A conta solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<IBankAccountDTO[]>(
						BANK_ACCOUNT_QUERY_KEY,
						() => [],
					)
				}
			}
		},
	})

	return {
		bankAccounts: data ?? [],
		isLoading,
	}
}
