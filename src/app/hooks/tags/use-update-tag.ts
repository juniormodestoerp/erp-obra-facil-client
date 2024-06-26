import type { ITagDTO } from '@app/dtos/tag-dto'
import { TAG_QUERY_KEY } from '@app/hooks/tags/use-tags'
import { tagsService } from '@app/services/tags'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTagCenter() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: tagsService.save,
		onMutate: (variables) => {
			const previousTags = queryClient.getQueryData<ITagDTO[]>(TAG_QUERY_KEY)

			queryClient.setQueryData<ITagDTO[]>(TAG_QUERY_KEY, (old) =>
				old?.map((tag) =>
					tag.id === variables.id ? { ...tag, ...variables } : tag,
				),
			)

			return { previousTags }
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TAG_QUERY_KEY })

			queryClient.setQueryData<ITagDTO[]>(TAG_QUERY_KEY, context?.previousTags)
		},
	})

	return {
		updateTag: mutateAsync,
		isLoading: isPending,
	}
}
