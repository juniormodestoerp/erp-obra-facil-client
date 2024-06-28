import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	BANK_ACCOUNT_QUERY_KEY,
	type BankAccountsQueryData,
} from '@app/hooks/bank-accounts/use-bank-accounts'
import { bankAccountsService } from '@app/services/bank-accounts'

export function useCreateBankAccount() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: bankAccountsService.create,
		onMutate: (variables) => {
			const tmpBankAccountId = String(Math.random())

			queryClient.setQueryData<BankAccountsQueryData>(
				BANK_ACCOUNT_QUERY_KEY,
				(old) => {
					return old?.concat({
						...variables,
						id: tmpBankAccountId,
						createdAt: new Date().toISOString(),
					})
				},
			)

			return { tmpBankAccountId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: BANK_ACCOUNT_QUERY_KEY })

			queryClient.setQueryData<BankAccountsQueryData>(
				BANK_ACCOUNT_QUERY_KEY,
				(old) =>
					old?.map((bankAccount) =>
						bankAccount.id === context.tmpBankAccountId ? data : bankAccount,
					),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: BANK_ACCOUNT_QUERY_KEY })

			queryClient.setQueryData<BankAccountsQueryData>(
				BANK_ACCOUNT_QUERY_KEY,
				(old) =>
					old?.map((bankAccount) =>
						bankAccount.id === context?.tmpBankAccountId
							? { ...bankAccount, status: 'error' }
							: bankAccount,
					),
			)
		},
	})

	return {
		createBankAccount: mutateAsync,
		isLoading: isPending,
	}
}
