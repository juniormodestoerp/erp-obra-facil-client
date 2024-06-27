import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	amount: number
	percentageChange: number
	accumulatedTotal: number
}

interface IEvolutionByCategory {
	id: string
	categoryId: string | null
	categoryName: string | null
	evolution: IEvolution[]
}

interface Response {
	transactions: IEvolutionByCategory[]
}

export async function evolutionByCategory(): Promise<Response> {
	const response = await httpClient.get('/metrics/evolution-by-category')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IEvolutionByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			categoryName: transaction.categoryName,
			evolution: transaction.evolution.map((evolution: IEvolution) => ({
				date: evolution.date,
				amount: evolution.amount,
				percentageChange: evolution.percentageChange,
				accumulatedTotal: evolution.accumulatedTotal,
			})),
		})),
	}
}
