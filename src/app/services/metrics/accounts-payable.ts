import { httpClient } from '@app/services/http-client'
import { toast } from 'sonner'

export interface IAccountsPayable {
	id: string
	name: string
	totalAmount: number
	transactionDate: string
	tags: string | null
	paymentMethod: string
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
		toast.success(
			`${
				response?.data?.length === 1 ? 'Conta carregada' : 'Contas carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IAccountsPayable) => ({
			id: transaction.id,
			name: transaction.name,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			tags: transaction.tags,
			paymentMethod: transaction.paymentMethod,
		})),
	}
}
