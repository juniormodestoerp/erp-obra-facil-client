import { httpClient } from '@app/services/http-client'

interface ITotalsByCategory {
	id: string
	categoryId: string | null
	amount: number
}

interface Response {
	transactions: ITotalsByCategory[]
}

export async function totalsByCategory(): Promise<Response> {
	const response = await httpClient.get('/metrics/totals-by-category')

	if (!response) {
		return {
			transactions: [],
		}
	}


	return {
		transactions: response.data.map((transaction: ITotalsByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			amount: transaction.amount,
		})),
	}
}
