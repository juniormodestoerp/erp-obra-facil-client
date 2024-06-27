import { httpClient } from '@app/services/http-client'

export interface IEntriesByCategory {
	id: string
	category: string | null
	description: string
	amount: number
	date: string
}

interface Response {
	transactions: IEntriesByCategory[]
}

export async function entriesByCategory(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-category')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IEntriesByCategory) => ({
			id: transaction.id,
			category: transaction.category,
			description: transaction.description,
			amount: transaction.amount,
			date: transaction.date,
		})),
	}
}
