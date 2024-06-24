import { useQuery } from '@tanstack/react-query'

import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'
import type { WithStatus } from '@app/utils/with-status'

export const COST_AND_PROFIT_CENTERS_QUERY_KEY = ['']

export type CostAndProfitCentersQueryData = WithStatus<ICostAndProfitCenter>[]

export function useCostAndProfitCenters() {
	const { data, isLoading, refetch } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
		queryFn: async () => {
			const costAndProfitCenters = await costAndProfitCentersService.fetch()
			return costAndProfitCenters
		},
	})

	return {
		costAndProfitCenters: data?.costAndProfitCenters ?? [],
		isLoading,
		refetch,
	}
}
