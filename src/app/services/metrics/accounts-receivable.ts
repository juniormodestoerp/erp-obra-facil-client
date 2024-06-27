import { httpClient } from '@app/services/http-client'
import { toast } from 'sonner'

export interface IAccountsReceivable {
	id: string
	description: string
	amount: number
	date: string
	tags: string[] | null
	method: string | null
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
			description: transaction.description,
			amount: transaction.amount,
			date: transaction.date,
			tags: transaction.tags?.map((tag: string) => tag) || null,
			method: transaction.method,
		})),
	}
}
