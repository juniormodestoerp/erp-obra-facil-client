import { httpClient } from '@app/services/http-client'

export interface IBankAccountSelectInput {
	field: string
	value: string
}

export async function selectInput(): Promise<IBankAccountSelectInput[]> {
	const { data } = await httpClient.get('/bank-accounts/select-input')

	return data?.map((costAndProfitCenter: IBankAccountSelectInput) => ({
		field: costAndProfitCenter.field,
		value: costAndProfitCenter.value,
	}))
}
