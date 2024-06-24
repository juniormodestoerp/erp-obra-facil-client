import { httpClient } from '@app/services/http-client'
import { toast } from 'sonner'

export interface IPaidAccounts {
	id: string
	name: string
	description: string
	totalAmount: number
	transactionDate: string
	status: string
}

interface Response {
	transactions: IPaidAccounts[] | []
}

export async function paidAccounts(): Promise<Response> {
	const response = await httpClient.get('/metrics/paid-accounts')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Conta paga carregada'
					: 'Contas pagas carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IPaidAccounts) => ({
			id: transaction.id,
			name: transaction.name,
			description: transaction.description,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			status: transaction.status,
		})),
	}
}
