import { httpClient } from '@app/services/http-client'

export interface Params {
	name: string
	email: string
	phone: string
	birthDate: string
	document: string
	password: string
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

export async function signUp({
	name,
	email,
	phone,
	birthDate,
	document,
	password,
}: Params): Promise<Response> {
	const [day, month, year] = birthDate.split('/').map(Number)

	const { data } = await httpClient.put<Response>('/users', {
		name,
		email,
		phone: phone.replace(/[^0-9+]/g, ''),
		birthDate: new Date(year, month - 1, day).toISOString(),
		document: document.replace(/\D/g, ''),
		password,
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
