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
	const { data } = await httpClient.get('/metrics/totals-by-center')

	return {
		transactions: data.transactions.map((transaction: ITotalsByCenter) => ({
			id: transaction.id,
			centerId: transaction.centerId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
