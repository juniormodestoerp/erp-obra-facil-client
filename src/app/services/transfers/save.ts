import type { ITransferDTO } from '@app/dtos/transfer-dto'
import { httpClient } from '@app/services/http-client'

type IUpdateTransferDTO = Partial<Omit<ITransferDTO, 'id' | 'createdAt'>> & {
	id: string
}

export async function save({
	id,
	name,
}: IUpdateTransferDTO): Promise<ITransferDTO> {
	const { data } = await httpClient.patch(`/transfers/${id}`, {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
