import { toast } from 'sonner'
import { httpClient } from '@app/services/http-client'

export interface IEntriesByContact {
	id: string
	contact: string | null
	name: string
	totalAmount: number
	transactionDate: string
}

interface Response {
	transactions: IEntriesByContact[]
}

export async function entriesByContact(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-contact')

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
		transactions: response.data.map((transaction: IEntriesByContact) => ({
			id: transaction.id,
			contact: transaction.contact,
			name: transaction.name,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
		})),
	}
}
