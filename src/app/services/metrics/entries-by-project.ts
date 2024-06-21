import { httpClient } from '@app/services/http-client'

interface IEntriesByProject {
	id: string
	project: string | null
	totalAmount: number
}

interface Response {
	transactions: IEntriesByProject[]
}

export async function entriesByProject(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/entries-by-project')

	return {
		transactions: data.transactions.map((transaction: IEntriesByProject) => ({
			id: transaction.id,
			project: transaction.project,
			totalAmount: transaction.totalAmount,
		})),
	}
}
