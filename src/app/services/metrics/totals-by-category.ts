import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface ITotalsByCategory {
	id: string
	categoryId: string | null
	totalAmount: number
}

interface Response {
	transactions: ITotalsByCategory[]
}

export async function totalsByCategory(): Promise<Response> {
	const response = await httpClient.get('/metrics/totals-by-category')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Total por categoria carregado'
					: 'Totais por categoria carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: ITotalsByCategory) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
