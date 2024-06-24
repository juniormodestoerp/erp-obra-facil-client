import { httpClient } from '@app/services/http-client'
import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'

type IUpdateCostAndProfitCenterDTO = Partial<
	Omit<ICostAndProfitCenter, 'id'>
> & { id: string }

export interface Response {
	id: string
	name: string
	createdAt: string
}

export async function save({ id, name }: IUpdateCostAndProfitCenterDTO): Promise<Response> {
	console.log('save called with id:', id, 'name:', name)

	const { data } = await httpClient.put<Response>(
		`/cost-and-profit-centers/${id}`,
		{ name },
	)

	console.log('save response data:', data)

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
