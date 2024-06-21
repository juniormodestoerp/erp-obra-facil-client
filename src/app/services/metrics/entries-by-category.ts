import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

export interface IEntriesByCategory {
	id: string
	category: string | null
	totalAmount: number
	name: string
	transactionDate: string
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
					? 'Lançamento carregada'
					: 'Lançamentos carregadas'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IEntriesByCategory) => ({
			id: transaction.id,
			category: transaction.category,
			name: transaction.name,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
		})),
	}
}
