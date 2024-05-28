import { httpClient } from '@app/services/http-client'

export interface Params {
	id: string
	categoryId?: string
	categoryName: string
	subcategoryName?: string
	type: string
	model: string
}

export interface Response {
	id: string
	userId: string
	categoryId: string | null
	categoryName: string
	subcategoryName: string | null
	model: string
	type: string
	createdAt: Date
}

export async function save({
	id,
	categoryId,
	categoryName,
	subcategoryName,
	type,
	model,
}: Params): Promise<Response> {
	const { data } = await httpClient.put<Response>(`/categories/${id}`, {
		categoryId,
		categoryName,
		subcategoryName,
		type,
		model,
	})

	return {
		id: data.id,
		userId: data.userId,
		categoryId: data.categoryId,
		categoryName: data.categoryName,
		subcategoryName: data.subcategoryName,
		type: data.type,
		model: data.model,
		createdAt: new Date(data.createdAt),
	}
}
