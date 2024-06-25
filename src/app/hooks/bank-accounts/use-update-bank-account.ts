import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { BANK_ACCOUNT_QUERY_KEY } from '@app/hooks/bank-accounts/use-bank-accounts'
import { bankAccountsService } from '@app/services/bank-accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateBankAccountCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: bankAccountsService.save,
		onMutate: (variables) => {
			const previousBankAccounts = queryClient.getQueryData<
				IBankAccountDTO[]
			>(BANK_ACCOUNT_QUERY_KEY)

			queryClient.setQueryData<IBankAccountDTO[]>(
				BANK_ACCOUNT_QUERY_KEY,
				(old) =>
					old?.map((bankAccount) =>
						bankAccount.id === variables.id
							? { ...bankAccount, ...variables }
							: bankAccount,
					),
			)

			return { previousBankAccounts }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: BANK_ACCOUNT_QUERY_KEY })

			queryClient.setQueryData<IBankAccountDTO[]>(
				BANK_ACCOUNT_QUERY_KEY,
				context?.previousBankAccounts,
			)
		},
	})

	return {
		updateBankAccount: mutateAsync,
		isLoading: isPending,
	}
}
