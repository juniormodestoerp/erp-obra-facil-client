import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	COST_AND_PROFIT_CENTERS_QUERY_KEY,
	type CostAndProfitCentersQueryData,
} from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'

export function useCreateCostAndProfitCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: costAndProfitCentersService.create,
		onMutate: (variables) => {
			const tmpCostAndProfitCenterId = String(Math.random())

			queryClient.setQueryData<CostAndProfitCentersQueryData>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				(old) => {
					return old?.concat({
						...variables,
						id: tmpCostAndProfitCenterId,
						createdAt: new Date().toISOString(),
					})
				},
			)

			return { tmpCostAndProfitCenterId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
			})

			queryClient.setQueryData<CostAndProfitCentersQueryData>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				(old) =>
					old?.map((costAndProfitCenter) =>
						costAndProfitCenter.id === context.tmpCostAndProfitCenterId
							? data
							: costAndProfitCenter,
					),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
			})

			queryClient.setQueryData<CostAndProfitCentersQueryData>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				(old) =>
					old?.map((costAndProfitCenter) =>
						costAndProfitCenter.id === context?.tmpCostAndProfitCenterId
							? { ...costAndProfitCenter, status: 'error' }
							: costAndProfitCenter,
					),
			)
		},
	})

	return {
		createCostAndProfitCenter: mutateAsync,
		isLoading: isPending,
	}
}
