import { httpClient } from '@app/services/http-client'

interface IEntriesByCenter {
	id: string
	costAndProfitCenters: string | null
	totalAmount: number
}

interface Response {
	transactions: IEntriesByCenter[]
}

export async function entriesByCenter(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/entries-by-center')

	return {
		transactions: data.transactions.map((transaction: IEntriesByCenter) => ({
			id: transaction.id,
			costAndProfitCenters: transaction.costAndProfitCenters,
			totalAmount: transaction.totalAmount,
		})),
	}
}
