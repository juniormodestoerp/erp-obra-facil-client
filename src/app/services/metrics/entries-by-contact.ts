import { httpClient } from '@app/services/http-client'

export interface IEntriesByContact {
	id: string
	contact: string | null
	description: string
	amount: number
	date: string
}

interface Response {
	transactions: IEntriesByContact[]
}

export async function entriesByContact(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-contact')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IEntriesByContact) => ({
			id: transaction.id,
			contact: transaction.contact,
			description: transaction.description,
			amount: transaction.amount,
			date: transaction.date,
		})),
	}
}
