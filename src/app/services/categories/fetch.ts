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

export interface ICategory {
	id: string
	userId: string
	categoryId: string | null
	categoryName: string
	subcategoryName: string | null
	model: string
	type: string
	createdAt: Date
}

export interface Response {
	categories: ICategory[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function fetch({ pageIndex }: Params): Promise<Response> {
	const { data } = await httpClient.get<Response>(
		`/categories?pageIndex=${pageIndex}`,
	)

	return {
		categories: data.categories.map((category) => ({
			id: category.id,
			userId: category.userId,
			categoryId: category.categoryId,
			categoryName: category.categoryName,
			subcategoryName: category.subcategoryName,
			model: category.model,
			type: category.type,
			createdAt: new Date(category.createdAt),
		})),
		meta: {
			pageIndex: data.meta.pageIndex,
			perPage: data.meta.perPage,
			totalCount: data.meta.totalCount,
		},
	}
}
