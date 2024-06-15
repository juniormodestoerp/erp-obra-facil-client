import { httpClient } from '@app/services/http-client'

export interface Params {
	document: string
	password: string
}

export interface Response {
	accessToken: string
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

export async function signIn({
	document,
	password,
}: Params): Promise<Response> {
	const { data } = await httpClient.post<Response>('/sessions', {
		document: document.replace(/\D/g, ''),
		password,
	})

	return {
		accessToken: data.accessToken,
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
