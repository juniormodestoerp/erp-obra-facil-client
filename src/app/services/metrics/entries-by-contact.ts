import { httpClient } from '@app/services/http-client'

interface IEntriesByContact {
	id: string
	contact: string | null
	totalAmount: number
}

interface Response {
	transactions: IEntriesByContact[]
}

export async function entriesByContact(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/entries-by-contact')

	return {
		transactions: data.transactions.map((transaction: IEntriesByContact) => ({
			id: transaction.id,
			contact: transaction.contact,
			totalAmount: transaction.totalAmount,
		})),
	}
}
