import { httpClient } from '@app/services/http-client'

interface IAccountsReceivable {
	id: string
	categoryId: string | null
	totalAmount: number
	transactionDate: string
}
interface Response {
	transactions: IAccountsReceivable[]
}

export async function accountsReceivable(): Promise<Response> {
	const { data } = await httpClient.get('/metrics/accounts-receivable')

	return {
		transactions: data.transactions.map((transaction: IAccountsReceivable) => ({
			id: transaction.id,
			categoryId: transaction.categoryId,
			totalAmount: transaction.totalAmount,
			transactionDate: new Date(transaction.transactionDate),
		})),
	}
}
