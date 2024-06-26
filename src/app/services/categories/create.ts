import type { ICategoryDTO, ICategoryType } from '@app/dtos/category-dto'
import { httpClient } from '@app/services/http-client'

type ICreateCategoryDTO = Omit<ICategoryDTO, 'id' | 'createdAt'>

export interface Params {
	type: ICategoryType
	name: string
	subcategoryOf: string | null
}

export async function create({
	type,
	name,
	subcategoryOf,
}: ICreateCategoryDTO): Promise<ICategoryDTO> {
	const { data } = await httpClient.post('/categories', {
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
