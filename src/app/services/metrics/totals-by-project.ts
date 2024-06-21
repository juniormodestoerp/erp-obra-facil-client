import { httpClient } from '@app/services/http-client'

interface ITotalsByProject {
	id: string
	projectId: string | null
	totalAmount: number
}

interface Response {
	transactions: ITotalsByProject[]
}

export async function totalsByProject(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/totals-by-project')

	return {
		transactions: data.transactions.map((transaction: ITotalsByProject) => ({
			id: transaction.id,
			projectId: transaction.projectId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
