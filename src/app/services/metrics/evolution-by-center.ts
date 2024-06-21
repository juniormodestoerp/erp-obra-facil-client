import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	totalAmount: number
}

interface IEvolutionByCenter {
	id: string
	centerId: string | null
	evolution: IEvolution[]
}

interface Response {
	transactions: IEvolutionByCenter[]
}

export async function evolutionByCenter(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/evolution-by-center')

	return {
		transactions: data.transactions.map((transaction: IEvolutionByCenter) => ({
			id: transaction.id,
			centerId: transaction.centerId,
			evolution: transaction.evolution.map((evolution: IEvolution) => ({
				date: evolution.date,
				totalAmount: evolution.totalAmount,
			})),
		})),
	}
}
