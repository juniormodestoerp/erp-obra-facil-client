import { httpClient } from '@app/services/http-client'

interface Params {
	id: string
	name: string
	email: string
	phone: string
}

export interface Response {
	id: string
	name: string
	document: string
	email: string
	phone: string
	birthDate: string
	role: string
	status: string
	createdAt: string
}

export async function save({
	id,
	name,
	email,
	phone,
}: Params): Promise<Response> {
	const { data } = await httpClient.put<Response>(`/users/${id}`, {
		name,
		email,
		phone: `+${phone.replace(/\D/g, '')}`,
	})

	return {
		id: data.id,
		name: data.name,
		document: data.document,
		email: data.email,
		phone: data.phone,
		birthDate: data.birthDate,
		role: data.role,
		status: data.status,
		createdAt: data.createdAt,
	}
}
