import { httpClient } from '@app/services/http-client'

export interface Params {
	type: string
	name: string
	subcategoryOf: string
}

export interface Response {
	id: string
	type: string
	name: string
	subcategoryOf: string | null
	createdAt: string
}

export async function create({
	type,
	name,
	subcategoryOf,
}: Params): Promise<Response> {
	const { data } = await httpClient.post('/categories', {
		type,
		name,
		subcategoryOf: subcategoryOf || null,
	})

	return {
		id: data.id,
		type: data.type,
		name: data.name,
		subcategoryOf: data.subcategoryOf,
		createdAt: data.createdAt,
	}
}
