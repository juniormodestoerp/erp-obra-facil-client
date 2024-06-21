import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface ITotalsByProject {
	id: string
	projectId: string | null
	totalAmount: number
}

interface Response {
	transactions: ITotalsByProject[]
}

export async function totalsByProject(): Promise<Response> {
	const response = await httpClient.get('/metrics/totals-by-project')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Total por projeto carregado'
					: 'Totais por projeto carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: ITotalsByProject) => ({
			id: transaction.id,
			projectId: transaction.projectId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
