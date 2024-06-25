import type { ITagDTO } from '@app/dtos/tag-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<ITagDTO[]> {
	const { data } = await httpClient.get('/tags')

	return data.map((tag: ITagDTO) => ({
		id: tag.id,
		name: tag.name,
		createdAt: tag.createdAt,
	}))
}
