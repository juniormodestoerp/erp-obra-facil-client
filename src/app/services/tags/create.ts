import type { ITagDTO } from '@app/dtos/tag-dto'
import { httpClient } from '@app/services/http-client'

type ICreateTagDTO = Omit<ITagDTO, 'id' | 'createdAt'>

export interface Params {
	name: string
}

export async function create({
	name,
}: ICreateTagDTO): Promise<ITagDTO> {
	const { data } = await httpClient.post('/tags', {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
