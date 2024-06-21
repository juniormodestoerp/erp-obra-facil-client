import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	totalAmount: number
}

interface IEvolutionByCategory {
	id?: string
	categoryId: string | null
	evolution: IEvolution[]
}

interface Response {
	transactions: IEvolutionByCategory[]
}

export async function evolutionByCategory(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/evolution-by-category')

	return {
		transactions: data.transactions.map(
			(transaction: IEvolutionByCategory) => ({
				id: transaction.id,
				categoryId: transaction.categoryId,
				evolution: transaction.evolution.map((evolution: IEvolution) => ({
					date: evolution.date,
					totalAmount: evolution.totalAmount,
				})),
			}),
		),
	}
}
