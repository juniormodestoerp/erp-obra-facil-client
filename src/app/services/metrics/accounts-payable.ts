import { httpClient } from '@app/services/http-client'

interface IAccountsPayable {
	id: string
	userId: string
	categoryId: string | null
	totalAmount: number
	transactionDate: Date
}

export interface Response {
	transactions: IAccountsPayable[]
}

export async function accountsPayable(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/accounts-payable')

	return {
		transactions: data.transactions.map((transaction: IAccountsPayable) => ({
			id: transaction.id,
			userId: transaction.userId,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
			transactionDate: new Date(transaction.transactionDate),
		})),
	}
}
