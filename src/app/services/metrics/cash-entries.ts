import { httpClient } from '@app/services/http-client'

interface ICashEntries {
	id: string
	userId: string
	totalAmount: number
	transactionDate: Date
	description: string
}
interface Response {
	transactions: ICashEntries[]
}

export async function cashEntries(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/cash-entries')

	return {
		transactions: data.transactions.map((transaction: ICashEntries) => ({
			id: transaction.id,
			userId: transaction.userId,
			totalAmount: transaction.totalAmount,
			transactionDate: new Date(transaction.transactionDate),
			description: transaction.description,
		})),
	}
}
