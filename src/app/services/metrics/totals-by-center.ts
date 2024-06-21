import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface ITotalsByCenter {
	id: string
	centerId: string | null
	totalAmount: number
}

interface Response {
	transactions: ITotalsByCenter[]
}

export async function totalsByCenter(): Promise<Response> {
	const response = await httpClient.get('/metrics/totals-by-center')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Total por centro carregado'
					: 'Totais por centro carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: ITotalsByCenter) => ({
			id: transaction.id,
			centerId: transaction.centerId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
