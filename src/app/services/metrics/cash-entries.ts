import { httpClient } from '@app/services/http-client'
import { toast } from 'sonner'

export interface ICashEntries {
	id: string
	amount: number
	tags: string[]
	description: string
	method: string | null
	date: string
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
			amount: transaction.amount,
			tags: transaction.tags.map((tag: string) => tag),
			description: transaction.description,
			method: transaction.method,
			date: transaction.date,
		})),
	}
}
