import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ICategoryDTO } from '@app/dtos/category-dto'
import { categoriesService } from '@app/services/categories'
import type { AppError } from '@app/services/http-client'
import type { WithStatus } from '@app/utils/with-status'

export type CategoriesQueryData = WithStatus<ICategoryDTO>[]

export const CATEGORY_QUERY_KEY = ['categories']

export function useCategories() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: CATEGORY_QUERY_KEY,
		queryFn: async () => {
			try {
				return await categoriesService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'A categoria solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ICategoryDTO[]>(CATEGORY_QUERY_KEY, () => [])
				}
			}
		},
	})

	return {
		categories: data ?? [],
		isLoading,
	}
}
