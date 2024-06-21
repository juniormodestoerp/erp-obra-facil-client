import { toast } from 'sonner'

import { httpClient } from '@app/services/http-client'

interface IProjectResult {
	id: string
	project: string | null
	totalAmount: number
}

interface Response {
	transactions: IProjectResult[]
}

export async function projectResults(): Promise<Response> {
	const response = await httpClient.get('/metrics/project-results')

	if (!response) {
		return {
			transactions: [],
		}
	}

	if (response.status === 200) {
		toast.success(
			`${
				response?.data?.length === 1
					? 'Resultado do projeto carregado'
					: 'Resultados dos projetos carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response.data.map((transaction: IProjectResult) => ({
			id: transaction.id,
			project: transaction.project,
			totalAmount: transaction.totalAmount,
		})),
	}
}
