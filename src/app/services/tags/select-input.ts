import { httpClient } from '@app/services/http-client'

export interface ITagSelectInput {
	field: string
	value: string
}

export async function selectInput(): Promise<ITagSelectInput[]> {
	const { data } = await httpClient.get('/tags/select-input')

	return data?.map((costAndProfitCenter: ITagSelectInput) => ({
		field: costAndProfitCenter.field,
		value: costAndProfitCenter.value,
	}))
}
