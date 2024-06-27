import { httpClient } from '@app/services/http-client'

interface ISorting {
	id: string
	desc: boolean
}

export interface ITransactionSearchOptions {
	pageIndex: number
	searchTerm?: string
	sorting?: ISorting[]
}

export interface ITransaction {
	id: string
	type: string | null
	date: string
	amount: number
	description: string
	account: string | null
	transferAccount: string | null
	card: string | null
	category: string | null
	subcategory: string | null
	contact: string | null
	center: string | null
	project: string | null
	method: string | null
	documentNumber: string | null
	notes: string | null
	competenceDate: string | null
	tags: string | null
	createdAt: string
}

export interface ITransactionSearchResponse {
	transactions: ITransaction[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function fetch({
	pageIndex,
	searchTerm,
	sorting,
}: ITransactionSearchOptions): Promise<ITransactionSearchResponse> {
	const normalizeSorting = (sorting: ISorting[] | undefined): string => {
		if (!sorting || sorting.length === 0) return ''

		const withoutClinic = sorting[0].id.replace('transactions', '')
		const normalizedSorting =
			withoutClinic.charAt(0).toLowerCase() + withoutClinic.slice(1)

		return normalizedSorting
	}

	const searchTermQuery = searchTerm ? `&searchTerm=${searchTerm}` : ''
	const sortingQuery = sorting
		? `&sortingField=${normalizeSorting(sorting)}&${
				sorting?.[0]?.desc ? 'orderBy=desc' : 'orderBy=asc'
			}`
		: ''

	const response = await httpClient.get<ITransactionSearchResponse>(
		`/transactions?pageIndex=${pageIndex}${searchTermQuery}${sortingQuery}`,
	)

	return {
		transactions: response?.data.transactions.map((transaction) => ({
			id: transaction.id,
			type: transaction.type,
			date: transaction.date,
			amount: transaction.amount,
			description: transaction.description,
			account: transaction.account,
			transferAccount: transaction.transferAccount,
			card: transaction.card,
			category: transaction.category,
			subcategory: transaction.subcategory,
			contact: transaction.contact,
			center: transaction.center,
			project: transaction.project,
			method: transaction.method,
			documentNumber: transaction.documentNumber,
			notes: transaction.notes,
			competenceDate: transaction.competenceDate,
			tags: transaction.tags,
			createdAt: transaction.createdAt,
		})),
		meta: {
			pageIndex: response?.data.meta.pageIndex,
			perPage: response?.data.meta.perPage,
			totalCount: response?.data.meta.totalCount,
		},
	}
}
