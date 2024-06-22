import { toast } from 'sonner'
import { httpClient } from '@app/services/http-client'

export interface ICashEntries {
	id: string
	totalAmount: number
	tags: string | null
	name: string
	paymentMethod: string
	transactionDate: string
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
			tags: transaction.tags,
			name: transaction.name,
			paymentMethod: transaction.paymentMethod,
			transactionDate: transaction.transactionDate,
		})),
	}
}
