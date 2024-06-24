import { httpClient } from '@app/services/http-client'
import { toast } from 'sonner'

export interface IAccountsReceivable {
	id: string
	name: string
	totalAmount: number
	transactionDate: string
	tags: string | null
	paymentMethod: string
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
			name: transaction.name,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			tags: transaction.tags,
			paymentMethod: transaction.paymentMethod,
		})),
	}
}
