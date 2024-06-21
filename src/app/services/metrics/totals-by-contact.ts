import { toast } from 'sonner'

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
	const response = await httpClient.get('/metrics/totals-by-contact')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Total por contato carregado'
					: 'Totais por contato carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: ITotalsByContact) => ({
			id: transaction.id,
			contactId: transaction.contactId,
			totalAmount: transaction.totalAmount,
		})),
	}
}
