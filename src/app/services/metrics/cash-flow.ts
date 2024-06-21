import { httpClient } from '@app/services/http-client'

interface ICashFlow {
	id: string
	userId: string
	totalAmount: number
	transactionDate: Date
	description: string
}
interface Response {
	transactions: ICashFlow[]
}

export async function cashFlow(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/cash-flow')

	return {
		transactions: data.transactions.map((transaction: ICashFlow) => ({
			id: transaction.id,
			userId: transaction.userId,
			totalAmount: transaction.totalAmount,
			transactionDate: new Date(transaction.transactionDate),
			description: transaction.description,
		})),
	}
}
