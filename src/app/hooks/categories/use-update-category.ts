import type { ICategoryDTO } from '@app/dtos/category-dto'
import { CATEGORY_QUERY_KEY } from '@app/hooks/categories/use-categories'
import { categoriesService } from '@app/services/categories'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateCategoryCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: categoriesService.save,
		onMutate: (variables) => {
			const previousCategories =
				queryClient.getQueryData<ICategoryDTO[]>(CATEGORY_QUERY_KEY)

			queryClient.setQueryData<ICategoryDTO[]>(CATEGORY_QUERY_KEY, (old) =>
				old?.map((category) =>
					category.id === variables.id
						? { ...category, ...variables }
						: category,
				),
			)

			return { previousCategories }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: CATEGORY_QUERY_KEY })

			queryClient.setQueryData<ICategoryDTO[]>(
				CATEGORY_QUERY_KEY,
				context?.previousCategories,
			)
		},
	})

	return {
		updateCategory: mutateAsync,
		isLoading: isPending,
	}
}
