import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IEntriesByCategory {
	id: string
	categoryId: string | null
	totalAmount: number
}

interface Response {
	transactions: IEntriesByCategory[]
}

export async function entriesByCategory(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-category')

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
		transactions: response.data.map((transaction: IEntriesByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
