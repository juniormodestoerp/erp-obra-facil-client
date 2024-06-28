import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	CATEGORY_QUERY_KEY,
	type CategoriesQueryData,
} from '@app/hooks/categories/use-categories'
import { categoriesService } from '@app/services/categories'

export function useCreateCategory() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: categoriesService.create,
		onMutate: (variables) => {
			const tmpCategoryId = String(Math.random())

			queryClient.setQueryData<CategoriesQueryData>(
				CATEGORY_QUERY_KEY,
				(old) => {
					return old?.concat({
						...variables,
						id: tmpCategoryId,
						createdAt: new Date().toISOString(),
					})
				},
			)

			return { tmpCategoryId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: CATEGORY_QUERY_KEY })

			queryClient.setQueryData<CategoriesQueryData>(CATEGORY_QUERY_KEY, (old) =>
				old?.map((category) =>
					category.id === context.tmpCategoryId ? data : category,
				),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: CATEGORY_QUERY_KEY })

			queryClient.setQueryData<CategoriesQueryData>(CATEGORY_QUERY_KEY, (old) =>
				old?.map((category) =>
					category.id === context?.tmpCategoryId
						? { ...category, status: 'error' }
						: category,
				),
			)
		},
	})

	return {
		createCategory: mutateAsync,
		isLoading: isPending,
	}
}
