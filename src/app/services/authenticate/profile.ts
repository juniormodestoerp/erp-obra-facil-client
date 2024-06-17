import { httpClient } from '@app/services/http-client'

export interface Response {
	id: string
	name: string
	document: string
	email: string
	phone: string
	birthDate: string
	role: string
	status: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement?: string
	profilePicture?: string
	createdAt: string
}

export async function profile(): Promise<Response> {
	const { data } = await httpClient.get<Response>('/users/profile')

	return data
}
