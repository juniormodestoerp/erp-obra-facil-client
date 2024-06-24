import { httpClient } from '@app/services/http-client'
import { toast } from 'sonner'

interface ITotalsByContact {
	id: string
	contact: string | null
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
			contact: transaction.contact,
			totalAmount: transaction.totalAmount,
		})),
	}
}
