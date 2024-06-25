import type { ITransferDTO } from '@app/dtos/transfer-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<ITransferDTO[]> {
	const { data } = await httpClient.get('/transfers')

	return data.map((transfer: ITransferDTO) => ({
		id: transfer.id,
		name: transfer.name,
		createdAt: transfer.createdAt,
	}))
}
