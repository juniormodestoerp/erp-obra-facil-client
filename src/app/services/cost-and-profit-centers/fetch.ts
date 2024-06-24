import { httpClient } from '@app/services/http-client'

export interface ICostAndProfitCenter {
	id: string
	name: string
	createdAt: string
}

interface Response {
	costAndProfitCenters: ICostAndProfitCenter[]
}

export async function fetch(): Promise<Response> {
	const { data } = await httpClient.get('/cost-and-profit-centers')

	return {
		costAndProfitCenters: data.map(
			(costAndProfitCenters: ICostAndProfitCenter) => ({
				id: costAndProfitCenters.id,
				name: costAndProfitCenters.name,
				createdAt: costAndProfitCenters.createdAt,
			}),
		),
	}
}
