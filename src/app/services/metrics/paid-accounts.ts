import { httpClient } from '@app/services/http-client'

interface IPaidAccounts {
	id: string
	userId: string
	name: string
	description: string
	totalAmount: number
	transactionDate: Date
	status: string
}

interface Response {
	transactions: IPaidAccounts[]
}

export async function paidAccounts(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/paid-accounts')

	return {
		transactions: data.transactions.map((transaction: IPaidAccounts) => ({
			id: transaction.id,
			userId: transaction.userId,
			name: transaction.name,
			description: transaction.description,
			totalAmount: transaction.totalAmount,
			transactionDate: new Date(transaction.transactionDate),
			status: transaction.status,
		})),
	}
}
