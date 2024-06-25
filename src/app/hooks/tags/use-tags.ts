import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ITagDTO } from '@app/dtos/tag-dto'
import { tagsService } from '@app/services/tags'
import type { WithStatus } from '@app/utils/with-status'
import type { AppError } from '@app/services/http-client'

export type TagsQueryData = WithStatus<ITagDTO>[]

export const TAG_QUERY_KEY = ['tags']

export function useTags() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: TAG_QUERY_KEY,
		queryFn: async () => {
			try {
				return await tagsService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'A tag solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ITagDTO[]>(TAG_QUERY_KEY, () => [])
				}
			}
		},
	})

	return {
		tags: data ?? [],
		isLoading,
	}
}
