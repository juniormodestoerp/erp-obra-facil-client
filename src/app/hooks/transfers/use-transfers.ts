import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ITransferDTO } from '@app/dtos/transfer-dto'
import { transfersService } from '@app/services/transfers'
import type { WithStatus } from '@app/utils/with-status'
import type { AppError } from '@app/services/http-client'

export type TransfersQueryData = WithStatus<ITransferDTO>[]

export const TRANSFER_QUERY_KEY = ['transfers']

export function useTransfers() {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		staleTime: Number.POSITIVE_INFINITY,
		queryKey: TRANSFER_QUERY_KEY,
		queryFn: async () => {
			try {
				return await transfersService.fetch()
			} catch (error) {
				const appError = error as AppError

				if (
					appError.response.data.message ===
					'A transferência solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ITransferDTO[]>(TRANSFER_QUERY_KEY, () => [])
				}
			}
		},
	})

	return {
		transfers: data ?? [],
		isLoading,
	}
}
