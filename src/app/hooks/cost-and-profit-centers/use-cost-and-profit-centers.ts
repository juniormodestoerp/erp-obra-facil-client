import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ICostAndProfitCentersDTO } from '@app/dtos/cost-and-profit-center-dto'
import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import type { AppError } from '@app/services/http-client'
import type { WithStatus } from '@app/utils/with-status'

export const COST_AND_PROFIT_CENTERS_QUERY_KEY = ['costAndProfitCenters']

export type CostAndProfitCentersQueryData =
	WithStatus<ICostAndProfitCentersDTO>[]

export function useCostAndProfitCenters() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
		queryFn: async () => {
			try {
				return await costAndProfitCentersService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'O centro de custo solicitado não foi encontrado.'
				) {
					queryClient.setQueryData<ICostAndProfitCentersDTO[]>(
						COST_AND_PROFIT_CENTERS_QUERY_KEY,
						() => [],
					)
				}
			}
		},
	})

	return {
		costAndProfitCenters: data ?? [],
		isLoading,
	}
}
