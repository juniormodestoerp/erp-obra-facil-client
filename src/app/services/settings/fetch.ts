import { httpClient } from '@app/services/http-client'

export interface ISetting {
	id: string
	userId: string
	fieldName: string
	isFieldEnable: boolean
	isFieldRequired: boolean
	title: string
	description: string
	createdAt: string
}

export interface Params {
	pageIndex: number
}

export interface Response {
	settings: ISetting[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function fetch({ pageIndex }: Params): Promise<Response> {
	const { data } = await httpClient.get<Response>(
		`/settings?pageIndex=${pageIndex}`,
	)

	return data
}
