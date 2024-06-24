import { useMutation, useQueryClient } from '@tanstack/react-query'
import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'
import { toast } from 'sonner'
import { COST_AND_PROFIT_CENTERS_QUERY_KEY } from './use-cost-and-profit-centers'
import { parseError } from '@app/services/http-client'

interface ICreateCostAndProfitCenter {
	id: string
	name: string
}

export function useUpdateCostAndProfitCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async ({
			id,
			name,
		}: ICreateCostAndProfitCenter): Promise<ICostAndProfitCenter> => {
			return costAndProfitCentersService.save({ id, name })
		},
		onMutate: (variables) => {
			const previousCostAndProfitCenters = queryClient.getQueryData<
				ICostAndProfitCenter[]
			>(COST_AND_PROFIT_CENTERS_QUERY_KEY)

			if (!Array.isArray(previousCostAndProfitCenters)) {
				return { previousCostAndProfitCenters: [] }
			}

			queryClient.setQueryData<ICostAndProfitCenter[]>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				(old) => {
					if (!Array.isArray(old)) {
						return []
					}
					return old.map((costAndProfitCenter) =>
						costAndProfitCenter.id === variables.id
							? { ...costAndProfitCenter, ...variables }
							: costAndProfitCenter,
					)
				},
			)

			return { previousCostAndProfitCenters }
		},
		onSuccess: (_data, variables) => {
			toast.success(
				`Centro de custo ${variables.name.toLowerCase()} atualizado com sucesso!`,
			)
		},
		onError: async (error, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
			})

			queryClient.setQueryData<ICostAndProfitCenter[]>(
				COST_AND_PROFIT_CENTERS_QUERY_KEY,
				context?.previousCostAndProfitCenters,
			)

			toast.error(parseError(error))
		},
	})

	return {
		updateCostAndProfitCenter: mutateAsync,
		isLoading: isPending,
	}
}
