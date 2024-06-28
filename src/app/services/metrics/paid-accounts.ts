import { httpClient } from '@app/services/http-client'

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
