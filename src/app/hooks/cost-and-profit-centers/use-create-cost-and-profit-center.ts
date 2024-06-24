import { useMutation } from '@tanstack/react-query'

import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'

interface ICreateCostAndProfitCenter {
	name: string
}

export function useCreateCostAndProfitCenter() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async ({
			name,
		}: ICreateCostAndProfitCenter): Promise<ICostAndProfitCenter> => {
			return costAndProfitCentersService.create({ name })
		},
	})

	return {
		createCostAndProfitCenter: mutateAsync,
		isLoading: isPending,
	}
}
