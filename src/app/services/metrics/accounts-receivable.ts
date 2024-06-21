import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IAccountsReceivable {
	id: string
	categoryId: string | null
	totalAmount: number
	transactionDate: string
}

interface Response {
	transactions: IAccountsReceivable[] | []
}

export async function accountsReceivable(): Promise<Response> {
	const response = await httpClient.get('/metrics/accounts-receivable')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1 ? 'Conta carregada' : 'Contas carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IAccountsReceivable) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
		})),
	}
}
