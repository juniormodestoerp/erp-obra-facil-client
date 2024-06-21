import { httpClient } from '@app/services/http-client'

interface ITotalsByContact {
	id: string
	contactId: string | null
	totalAmount: number
}

interface Response {
	transactions: ITotalsByContact[]
}

export async function totalsByContact(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/totals-by-contact')

	return {
		transactions: data.transactions.map((transaction: ITotalsByContact) => ({
			id: transaction.id,
			contactId: transaction.contactId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
