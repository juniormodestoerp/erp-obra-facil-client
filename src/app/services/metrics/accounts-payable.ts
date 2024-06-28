import { httpClient } from '@app/services/http-client'

export interface IAccountsPayable {
	id: string
	description: string
	amount: number
	date: string
	// tags: string
	method: string | null
}

export interface Response {
	transactions: IAccountsPayable[] | []
}

export async function accountsPayable(): Promise<Response> {
	const response = await httpClient.get('/metrics/accounts-payable')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((transaction: IAccountsPayable) => ({
			id: transaction.id,
			description: transaction.description,
			amount: transaction.amount,
			date: transaction.date,
			// tags: transaction.tags,
			method: transaction.method,
		})),
	}
}
