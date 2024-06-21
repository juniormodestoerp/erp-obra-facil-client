import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IEntriesByCenter {
	id: string
	costAndProfitCenters: string | null
	totalAmount: number
}

interface Response {
	transactions: IEntriesByCenter[]
}

export async function entriesByCenter(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-center')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Entrada carregada'
					: 'Entradas carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IEntriesByCenter) => ({
			id: transaction.id,
			costAndProfitCenters: transaction.costAndProfitCenters,
			totalAmount: transaction.totalAmount,
		})),
	}
}
