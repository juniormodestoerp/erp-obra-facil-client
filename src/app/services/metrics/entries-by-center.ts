import { httpClient } from '@app/services/http-client'

export interface IEntriesByCenter {
	id: string
	center: string | null
	amount: number
	date: string
	description: string
}

interface Response {
	transactions: IEntriesByCenter[]
}

export async function entriesByCenter(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-center')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IEntriesByCenter) => ({
			id: transaction.id,
			center: transaction.center,
			amount: transaction.amount,
			date: transaction.date,
			description: transaction.description,
		})),
	}
}
