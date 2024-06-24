import { httpClient } from '@app/services/http-client'

export interface Params {
	name: string
}

export interface Response {
	id: string
	name: string
	createdAt: string
}

export async function create({
	name,
}: Params): Promise<Response> {
	const { data } = await httpClient.post('/cost-and-profit-centers', {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
