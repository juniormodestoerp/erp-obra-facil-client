import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IEvolution {
	date: string
	totalAmount: number
	percentageChange: number
	accumulatedTotal: number
}

interface IEvolutionByCenter {
	id: string
	centerId: string | null
	centerName: string | null
	evolution: IEvolution[]
}

interface Response {
	transactions: IEvolutionByCenter[]
}

export async function evolutionByCenter(): Promise<Response> {
	const response = await httpClient.get('/metrics/evolution-by-center')

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
		transactions: response.data.map((transaction: IEvolutionByCenter) => ({
			id: transaction.id,
			centerId: transaction.centerId,
			centerName: transaction.centerName,
			evolution: transaction.evolution.map((evolution: IEvolution) => ({
				date: evolution.date,
				totalAmount: evolution.totalAmount,
				percentageChange: evolution.percentageChange,
				accumulatedTotal: evolution.accumulatedTotal,
			})),
		})),
	}
}
