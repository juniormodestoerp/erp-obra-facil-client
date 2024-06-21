import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	totalAmount: number
}

interface IEvolutionByContact {
	id?: string
	contactId: string | null
	evolution: IEvolution[]
}

interface Response {
	transactions: IEvolutionByContact[]
}

export async function evolutionByContact(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/evolution-by-contact')

	return {
		transactions: data.transactions.map((transaction: IEvolutionByContact) => ({
			id: transaction.id,
			contactId: transaction.contactId,
			evolution: transaction.evolution.map((evolution: IEvolution) => ({
				date: evolution.date,
				totalAmount: evolution.totalAmount,
			}))
		})),
	}
}
