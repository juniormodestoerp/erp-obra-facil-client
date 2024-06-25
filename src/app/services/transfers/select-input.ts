import { httpClient } from '@app/services/http-client'

export interface ITransferSelectInput {
	field: string
	value: string
}

export async function selectInput(): Promise<ITransferSelectInput[]> {
	const { data } = await httpClient.get('/transfers/select-input')

	return data?.map((costAndProfitCenter: ITransferSelectInput) => ({
		field: costAndProfitCenter.field,
		value: costAndProfitCenter.value,
	}))
}
