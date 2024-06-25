import type { ITransferDTO } from '@app/dtos/transfer-dto'
import { httpClient } from '@app/services/http-client'

type ICreateTransferDTO = Omit<ITransferDTO, 'id' | 'createdAt'>

export interface Params {
	name: string
}

export async function create({
	name,
}: ICreateTransferDTO): Promise<ITransferDTO> {
	const { data } = await httpClient.post('/transfers', {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
