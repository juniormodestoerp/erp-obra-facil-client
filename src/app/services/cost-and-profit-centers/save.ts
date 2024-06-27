import type { ICostAndProfitCentersDTO } from '@app/dtos/cost-and-profit-center-dto'
import { httpClient } from '@app/services/http-client'

type IUpdateCostAndProfitCenterDTO = Partial<
	Omit<ICostAndProfitCentersDTO, 'id'>
> & { id: string }

export interface Response {
	id: string
	name: string
	createdAt: string
}

export async function save({
	id,
	name,
}: IUpdateCostAndProfitCenterDTO): Promise<ICostAndProfitCentersDTO> {
	const { data } = await httpClient.patch(`/centers/${id}`, {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
