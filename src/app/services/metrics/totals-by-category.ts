import { httpClient } from '@app/services/http-client'

interface ITotalsByCategory {
	id: string
	categoryId: string | null
	totalAmount: number
}

interface Response {
	transactions: ITotalsByCategory[]
}

export async function totalsByCategory(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/totals-by-category')

	return {
		transactions: data.transactions.map((transaction: ITotalsByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
