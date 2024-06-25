import { httpClient } from '@app/services/http-client'

export interface IPaymentMethodSelectInput {
	field: string
	value: string
}

export async function selectInput(): Promise<IPaymentMethodSelectInput[]> {
	const { data } = await httpClient.get('/payment-methods/select-input')

	return data?.map((costAndProfitCenter: IPaymentMethodSelectInput) => ({
		field: costAndProfitCenter.field,
		value: costAndProfitCenter.value,
	}))
}
