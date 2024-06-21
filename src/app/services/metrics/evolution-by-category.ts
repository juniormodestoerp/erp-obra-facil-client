import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	totalAmount: number
}

interface IEvolutionByCategory {
	id: string
	categoryId: string | null
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

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Evolução carregada'
					: 'Evoluções carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IEvolutionByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			evolution: transaction.evolution.map((evolution: IEvolution) => ({
				date: evolution.date,
				totalAmount: evolution.totalAmount,
			})),
		})),
	}
}
