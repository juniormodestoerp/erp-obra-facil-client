import { httpClient } from '@app/services/http-client'
import type { ICostAndProfitCentersDTO } from '@app/dtos/cost-and-profit-center-dto'

type ICreateCostAndProfitCentersDTO = Omit<
	ICostAndProfitCentersDTO,
	'id' | 'createdAt'
>

export interface Params {
	name: string
}

export async function create({
	name,
}: ICreateCostAndProfitCentersDTO): Promise<ICostAndProfitCentersDTO> {
	const { data } = await httpClient.post('/cost-and-profit-centers', {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
