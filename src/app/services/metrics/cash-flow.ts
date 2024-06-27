import { httpClient } from '@app/services/http-client'

export interface ICashFlow {
	id: string
	amount: number
	date: string
	description: string
}

export interface IDailyBalance {
	date: string
	previousDayBalance: number
	totalEntries: number
	totalExits: number
	total: number
	endOfDayBalance: number
	transactions: ICashFlow[]
}

interface IResponse {
	transactions: IDailyBalance[]
}

export async function cashFlow(): Promise<IResponse> {
	const response = await httpClient.get('/metrics/cash-flow')

	if (!response) {
		return {
			transactions: [],
		}
	}

	return {
		transactions: response.data.map((balance: IDailyBalance) => ({
			date: balance.date,
			previousDayBalance: balance.previousDayBalance,
			totalEntries: balance.totalEntries,
			totalExits: balance.totalExits,
			total: balance.total,
			endOfDayBalance: balance.endOfDayBalance,
			transactions: balance.transactions.map((transaction: ICashFlow) => ({
				id: transaction.id,
				amount: transaction.amount,
				date: transaction.date,
				description: transaction.description,
			})),
		})),
	}
}
