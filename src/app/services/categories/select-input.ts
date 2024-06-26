import { httpClient } from '@app/services/http-client'

export interface ICategorySelectInput {
	field: string
	value: string
}

export async function selectInput(): Promise<ICategorySelectInput[]> {
	const { data } = await httpClient.get('/categories/select-input')

	return data?.map((category: ICategorySelectInput) => ({
		field: category.field,
		value: category.value,
	}))
}
