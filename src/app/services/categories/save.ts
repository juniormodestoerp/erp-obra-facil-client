import type { ICategoryDTO } from '@app/dtos/category-dto'
import { httpClient } from '@app/services/http-client'

type IUpdateCategoryDTO = Partial<Omit<ICategoryDTO, 'id' | 'createdAt'>> & {
	id: string
}

export async function save({
	id,
	type,
	name,
	subcategoryOf,
}: IUpdateCategoryDTO): Promise<ICategoryDTO> {
	const { data } = await httpClient.patch(`/categories/${id}`, {
		type,
		name,
		subcategoryOf,
	})

	return {
		id: data.id,
		type: data.type,
		name: data.name,
		subcategoryOf: data.subcategoryOf,
		createdAt: data.createdAt,
	}
}
