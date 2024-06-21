import { httpClient } from '@app/services/http-client'

interface IReceivedAccounts {
	id: string
	userId: string
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
	const { data } = await httpClient.get('/metrics/received-accounts')

	return {
		transactions: data.transactions.map((transaction: IReceivedAccounts) => ({
			id: transaction.id,
			userId: transaction.userId,
			name: transaction.name,
			description: transaction.description,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			status: transaction.status,
		})),
	}
}
