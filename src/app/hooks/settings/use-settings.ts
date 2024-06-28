import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ISettingDTO } from '@app/dtos/setting-dto'
import type { AppError } from '@app/services/http-client'
import type { WithStatus } from '@app/utils/with-status'
import { settingsService } from '@app/services/settings'

export type SettingsQueryData = WithStatus<ISettingDTO>[]

export const SETTINGS_QUERY_KEY = ['settings']

export function useSettings() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: SETTINGS_QUERY_KEY,
		queryFn: async () => {
			try {
				return await settingsService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'A configuração solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ISettingDTO[]>(
						SETTINGS_QUERY_KEY,
						() => [],
					)
				}
			}
		},
	})

	return {
		settings: data ?? [],
		isLoading,
	}
}
