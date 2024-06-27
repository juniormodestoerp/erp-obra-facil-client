import { httpClient } from '@app/services/http-client'

interface ITotalsByContact {
	id: string
	contact: string | null
	amount: number
}

interface Response {
	transactions: ITotalsByContact[]
}

export async function totalsByContact(): Promise<Response> {
	const response = await httpClient.get('/metrics/totals-by-contact')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: ITotalsByContact) => ({
			id: transaction.id,
			contact: transaction.contact,
			amount: transaction.amount,
		})),
	}
}
