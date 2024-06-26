import { httpClient } from '@app/services/http-client'

export interface Params {
	id?: string
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

export async function save({
	id,
	type,
	name,
	subcategoryOf,
}: Params): Promise<Response> {
	const { data } = await httpClient.put<Response>(`/categories/${id}`, {
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
