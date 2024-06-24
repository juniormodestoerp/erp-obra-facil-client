import { toast } from 'sonner'
import { httpClient } from '@app/services/http-client'

export interface ICashFlow {
	id: string
	totalAmount: number
	transactionDate: string
	description: string
}

export interface DailyBalance {
	date: string
	previousDayBalance: number
	totalEntries: number
	totalExits: number
	total: number
	endOfDayBalance: number
	transactions: ICashFlow[]
}

interface Response {
	dailyBalances: DailyBalance[]
}

export async function cashFlow(): Promise<Response> {
	const response = await httpClient.get('/metrics/cash-flow')

	if (!response) {
		return {
			dailyBalances: [],
		}
	}

	if (response.status === 200) {
		toast.success('Fluxo de caixa carregado com sucesso!')
	}

	return {
		dailyBalances: response.data.map((balance: DailyBalance) => ({
			date: balance.date,
			previousDayBalance: balance.previousDayBalance,
			totalEntries: balance.totalEntries,
			totalExits: balance.totalExits,
			total: balance.total,
			endOfDayBalance: balance.endOfDayBalance,
			transactions: balance.transactions.map((transaction: ICashFlow) => ({
				id: transaction.id,
				totalAmount: transaction.totalAmount,
				transactionDate: transaction.transactionDate,
				description: transaction.description,
			})),
		})),
	}
}
