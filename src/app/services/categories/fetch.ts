import type { ICategoryDTO } from '@app/dtos/category-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<ICategoryDTO[]> {
	const { data } = await httpClient.get('/categories')

	return data.map((category: ICategoryDTO) => ({
		id: category.id,
		type: category.type,
		name: category.name,
		subcategoryOf: category.subcategoryOf,
		createdAt: category.createdAt,
	}))
}
