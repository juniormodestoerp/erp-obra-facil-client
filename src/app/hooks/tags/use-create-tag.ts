import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TAG_QUERY_KEY, type TagsQueryData } from '@app/hooks/tags/use-tags'
import { tagsService } from '@app/services/tags'

export function useCreateTag() {
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: tagsService.create,
		onMutate: (variables) => {
			const tmpTagId = String(Math.random())

			queryClient.setQueryData<TagsQueryData>(TAG_QUERY_KEY, (old) => {
				return old?.concat({
					...variables,
					id: tmpTagId,
					status: 'pending',
					createdAt: new Date().toISOString(),
				})
			})

			return { tmpTagId }
		},
		onSuccess: async (data, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TAG_QUERY_KEY })

			queryClient.setQueryData<TagsQueryData>(TAG_QUERY_KEY, (old) =>
				old?.map((tag) => (tag.id === context.tmpTagId ? data : tag)),
			)
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({ queryKey: TAG_QUERY_KEY })

			queryClient.setQueryData<TagsQueryData>(TAG_QUERY_KEY, (old) =>
				old?.map((tag) =>
					tag.id === context?.tmpTagId ? { ...tag, status: 'error' } : tag,
				),
			)
		},
	})

	return {
		createTag: mutateAsync,
		isLoading: isPending,
	}
}
