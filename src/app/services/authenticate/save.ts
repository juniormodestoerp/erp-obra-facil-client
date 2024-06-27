import { httpClient } from '@app/services/http-client'

interface Params {
	name: string
	email: string
	phone: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement?: string
}

export interface Response {
	id: string
	name: string
	document: string
	email: string
	phone: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement?: string
	createdAt: string
}

export async function save({
	name,
	email,
	phone,
	zipCode,
	state,
	city,
	neighborhood,
	street,
	number,
	complement,
}: Params): Promise<Response> {
	const { data } = await httpClient.patch<Response>('/users', {
		name,
		email,
		phone: `+${phone.replace(/\D/g, '')}`,
		zipCode: zipCode.replace(/\D/g, ''),
		state,
		city,
		neighborhood,
		street,
		number,
		complement,
	})

	return {
		id: data.id,
		name: data.name,
		document: data.document,
		email: data.email,
		phone: data.phone,
		zipCode: data.zipCode,
		state: data.state,
		city: data.city,
		neighborhood: data.neighborhood,
		street: data.street,
		number: data.number,
		complement: data.complement,
		createdAt: data.createdAt,
	}
}
