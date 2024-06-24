import { httpClient } from '@app/services/http-client'

export interface ICategory {
	id: string
	type: string
	name: string
	subcategoryOf: string | null
	createdAt: string
}

interface Response {
	categories: ICategory[]
}

export async function fetch(): Promise<Response> {
	const { data } = await httpClient.get('/categories')

	return {
		categories: data.map((category: ICategory) => ({
			id: category.id,
			type: category.type,
			name: category.name,
			subcategoryOf:
				category.subcategoryOf === null ? '' : category.subcategoryOf,
			createdAt: category.createdAt,
		})),
	}
}
