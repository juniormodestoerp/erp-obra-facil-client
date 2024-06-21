import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IEntriesByProject {
	id: string
	project: string | null
	totalAmount: number
}

interface Response {
	transactions: IEntriesByProject[]
}

export async function entriesByProject(): Promise<Response> {
	const response = await httpClient.get('/metrics/entries-by-project')

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
		transactions: response.data.map((transaction: IEntriesByProject) => ({
			id: transaction.id,
			project: transaction.project,
			totalAmount: transaction.totalAmount,
		})),
	}
}
