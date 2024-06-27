import { httpClient } from '@app/services/http-client'

interface ITotalsByCenter {
	id: string
	center: string | null
	amount: number
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

	return {
		transactions: response.data.map((transaction: ITotalsByCenter) => ({
			id: transaction.id,
			center: transaction.center,
			amount: transaction.amount,
		})),
	}
}
