import { httpClient } from '@app/services/http-client'

interface IEntriesByCategory {
	id: string
	categoryId: string | null
	totalAmount: number
}
interface Response {
	transactions: IEntriesByCategory[]
}

export async function entriesByCategory(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/entries-by-category')

	return {
		transactions: data.transactions.map((transaction: IEntriesByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
