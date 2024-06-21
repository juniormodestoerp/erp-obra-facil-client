import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface ICashEntries {
	id: string
	totalAmount: number
	transactionDate: string
	description: string
}

interface Response {
	transactions: ICashEntries[]
}

export async function cashEntries(): Promise<Response> {
	const response = await httpClient.get('/metrics/cash-entries')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Lançamento carregado'
					: 'Lançamentos carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: ICashEntries) => ({
			id: transaction.id,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			description: transaction.description,
		})),
	}
}
