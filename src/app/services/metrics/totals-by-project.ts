import { httpClient } from '@app/services/http-client'

interface ITotalsByProject {
	id: string
	project: string | null
	amount: number
}

interface Response {
	transactions: ITotalsByProject[]
}

export async function totalsByProject(): Promise<Response> {
	const response = await httpClient.get('/metrics/totals-by-project')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: ITotalsByProject) => ({
			id: transaction.id,
			project: transaction.project,
			amount: transaction.amount,
		})),
	}
}
