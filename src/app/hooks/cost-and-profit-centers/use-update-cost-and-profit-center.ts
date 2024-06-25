import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	COST_AND_PROFIT_CENTERS_QUERY_KEY,
	type CostAndProfitCentersQueryData,
} from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'

export function useUpdateCostAndProfitCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: costAndProfitCentersService.save,
		onMutate: (variables) => {
			const previousCostAndProfitCenters =
				queryClient.getQueryData<CostAndProfitCentersQueryData>(
					COST_AND_PROFIT_CENTERS_QUERY_KEY,
				)

			queryClient.setQueryData<CostAndProfitCentersQueryData>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				(old) =>
					old?.map((costAndProfitCenter) =>
						costAndProfitCenter.id === variables.id
							? { ...costAndProfitCenter, ...variables }
							: costAndProfitCenter,
					),
			)

			return { previousCostAndProfitCenters }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
			})

			queryClient.setQueryData<CostAndProfitCentersQueryData>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				context?.previousCostAndProfitCenters,
			)
		},
	})

	return {
		updateCostAndProfitCenter: mutateAsync,
		isLoading: isPending,
	}
}
