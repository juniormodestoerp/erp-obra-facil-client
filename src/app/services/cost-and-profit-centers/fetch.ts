import type { ICostAndProfitCentersDTO } from '@app/dtos/cost-and-profit-center-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<ICostAndProfitCentersDTO[]> {
	const { data } = await httpClient.get('/cost-and-profit-centers')

	return data.map((costAndProfitCenters: ICostAndProfitCentersDTO) => ({
		id: costAndProfitCenters.id,
		name: costAndProfitCenters.name,
		createdAt: costAndProfitCenters.createdAt,
	}))
}
