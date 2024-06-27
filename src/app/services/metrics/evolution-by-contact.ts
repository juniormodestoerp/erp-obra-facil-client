import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	amount: number
	percentageChange: number
	accumulatedTotal: number
}

interface IEvolutionByContact {
	id: string
	contact: string | null
	evolution: IEvolution[]
}

interface Response {
	transactions: IEvolutionByContact[]
}

export async function evolutionByContact(): Promise<Response> {
	const response = await httpClient.get('/metrics/evolution-by-contact')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IEvolutionByContact) => ({
			id: transaction.id,
			contact: transaction.contact,
			evolution: transaction.evolution.map((evolution: IEvolution) => ({
				date: evolution.date,
				amount: evolution.amount,
				percentageChange: evolution.percentageChange,
				accumulatedTotal: evolution.accumulatedTotal,
			})),
		})),
	}
}
