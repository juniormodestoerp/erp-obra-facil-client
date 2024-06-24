import { httpClient } from '@app/services/http-client'

export interface ICostAndProfitCenterelectInput {
	field: string
	value: string
}

export async function selectInput(): Promise<ICostAndProfitCenterelectInput[]> {
	const { data } = await httpClient.get('/cost-and-profit-centers/select-input')

	return (
		data?.map((costAndProfitCenter: ICostAndProfitCenterelectInput) => ({
			field: costAndProfitCenter.field,
			value: costAndProfitCenter.value,
		})) ?? []
	)
}
