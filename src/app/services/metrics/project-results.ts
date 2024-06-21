import { httpClient } from '@app/services/http-client'

interface IProjectResult {
	id: string
	project: string | null
	totalAmount: number
}

interface Response {
	transactions: IProjectResult[]
}

export async function projectResults(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/project-results')

	return {
		transactions: data.transactions.map((transaction: IProjectResult) => ({
			id: transaction.id,
			project: transaction.project,
			totalAmount: transaction.totalAmount,
		})),
	}
}
