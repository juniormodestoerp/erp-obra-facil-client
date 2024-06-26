import type { ITagDTO } from '@app/dtos/tag-dto'
import { httpClient } from '@app/services/http-client'

type IUpdateTagDTO = Partial<Omit<ITagDTO, 'id' | 'createdAt'>> & {
	id: string
}

export async function save({ id, name }: IUpdateTagDTO): Promise<ITagDTO> {
	const { data } = await httpClient.patch(`/tags/${id}`, {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
