import { httpClient } from '@app/services/http-client'

export interface IEntriesByProject {
	id: string
	project: string | null
	description: string
	amount: number
	date: string
}

interface Response {
	transactions: IEntriesByProject[]
}

export async function entriesByProject(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-project')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IEntriesByProject) => ({
			id: transaction.id,
			project: transaction.project,
			description: transaction.description,
			amount: transaction.amount,
			date: transaction.date,
		})),
	}
}
