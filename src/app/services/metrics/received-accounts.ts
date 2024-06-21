import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IReceivedAccounts {
	id: string
	name: string
	description: string
	totalAmount: number
	transactionDate: string
	status: string
}

interface Response {
	transactions: IReceivedAccounts[]
}

export async function receivedAccounts(): Promise<Response> {
	const response = await httpClient.get('/metrics/received-accounts')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Conta recebida carregada'
					: 'Contas recebidas carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IReceivedAccounts) => ({
			id: transaction.id,
			name: transaction.name,
			description: transaction.description,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			status: transaction.status,
		})),
	}
}
