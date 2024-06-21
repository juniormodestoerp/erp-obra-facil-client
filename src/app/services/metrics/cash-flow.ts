import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface ICashFlow {
	id: string
	totalAmount: number
	transactionDate: string
	description: string
}

interface Response {
	transactions: ICashFlow[]
}

export async function cashFlow(): Promise<Response> {
	const response = await httpClient.get('/metrics/cash-flow')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success('Fluxo de caixa carregado com sucesso!')
	}

	return {
		transactions: response.data.map((transaction: ICashFlow) => ({
			id: transaction.id,
			totalAmount: transaction.totalAmount,
			transactionDate: transaction.transactionDate,
			description: transaction.description,
		})),
	}
}
