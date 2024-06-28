import { httpClient } from '@app/services/http-client'

export interface IAccountsReceivable {
	id: string
	description: string
	amount: number
	date: string
	// tags: string | null
	method: string | null
}

interface Response {
	transactions: IAccountsReceivable[] | []
}

export async function accountsReceivable(): Promise<Response> {
	const response = await httpClient.get('/metrics/accounts-receivable')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IAccountsReceivable) => ({
			id: transaction.id,
			description: transaction.description,
			amount: transaction.amount,
			date: transaction.date,
			// tags: transaction.tags,
			method: transaction.method,
		})),
	}
}
