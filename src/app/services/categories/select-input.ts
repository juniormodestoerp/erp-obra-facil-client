import { httpClient } from '@app/services/http-client'

export interface ISelectInputCategory {
	field: string
	value: string
}

export async function selectInput(): Promise<ISelectInputCategory[]> {
	const { data } = await httpClient.get<ISelectInputCategory[]>(
		'/categories/select-input',
	)

	return (
		data?.map((category) => ({
			field: category.field,
			value: category.value,
		})) ?? []
	)
}
