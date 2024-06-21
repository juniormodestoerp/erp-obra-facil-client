import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IAccountsPayable {
	id: string
	categoryId: string | null
	totalAmount: number
	transactionDate: string
}

export interface Response {
	transactions: IAccountsPayable[] | []
}

export async function accountsPayable(): Promise<Response> {
	const response = await httpClient.get('/metrics/accounts-payable')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(`${
				response?.data?.transactions?.length === 1
					? 'Conta carregada'
					: 'Contas carregadas'
			} com sucesso!`)
	}

	return {
		transactions: response.data.transactions.map((transaction: IAccountsPayable) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
		})),
	}
}
