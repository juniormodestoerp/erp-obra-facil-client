import { httpClient } from '@app/services/http-client'

export interface Params {
	zipCode: string
}

export interface Response {
	zipCode: string
	state: string
	city: string
	neighborhood?: string
	street?: string
}

export async function showAddress({ zipCode }: Params): Promise<Response> {
	console.log('zipCode service', zipCode)

	const { data } = await httpClient.get<Response>(
		`/utils/zip-codes/${zipCode.replace(/\D/g, '')}/addresses`,
	)

	return {
		zipCode: data.zipCode,
		state: data.state,
		city: data.city,
		neighborhood: data.neighborhood,
		street: data.street,
	}
}
