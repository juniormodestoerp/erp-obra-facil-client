import { httpClient } from '@app/services/http-client'

export interface Params {
	id: string
	fieldName: string
	isFieldEnable: boolean
	isFieldRequired: boolean
	title: string
	description: string
	createdAt: string
}

export interface Response {
	id: string
	userId: string
	fieldName: string
	isFieldEnable: boolean
	isFieldRequired: boolean
	title: string
	description: string
	createdAt: string
}

export async function save({
	id,
	fieldName,
	isFieldEnable,
	isFieldRequired,
	title,
	description,
	createdAt,
}: Params): Promise<Response> {
	const { data } = await httpClient.patch<Response>(`/settings/${id}`, {
		fieldName,
		isFieldEnable,
		isFieldRequired,
		title,
		description,
		createdAt,
	})

	return {
		id: data.id,
		userId: data.userId,
		fieldName: data.fieldName,
		isFieldEnable: data.isFieldEnable,
		isFieldRequired: data.isFieldRequired,
		title: data.title,
		description: data.description,
		createdAt: data.createdAt,
	}
}
