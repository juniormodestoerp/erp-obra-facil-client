import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<ITransactionDTO[]> {
	const { data } = await httpClient.get('/transactions')

	return data.map((transaction: ITransactionDTO) => ({
		id: transaction.id,
		type: transaction.type,
		date: transaction.date,
		amount: transaction.amount,
		description: transaction.description,
		account: transaction.account,
		status: transaction.status,
		card: transaction.card,
		category: transaction.category,
		contact: transaction.contact,
		center: transaction.center,
		project: transaction.project,
		method: transaction.method,
		documentNumber: transaction.documentNumber,
		notes: transaction.notes,
		competenceDate: transaction.competenceDate,
		tags: transaction.tags,
		createdAt: transaction.createdAt,
	}))
}


// export async function fetch(): Promise<ITransactionDTO[]> {
// 	const { data } = await httpClient.get('/transactions')

// 	return data.transactions.map((transaction: ITransactionDTO) => ({
// 		id: transaction.id,
// 		type: transaction.type,
// 		date: transaction.date,
// 		amount: transaction.amount,
// 		description: transaction.description,
// 		account: transaction.account,
// 		status: transaction.status,
// 		card: transaction.card,
// 		category: transaction.category,
// 		contact: transaction.contact,
// 		center: transaction.center,
// 		project: transaction.project,
// 		method: transaction.method,
// 		documentNumber: transaction.documentNumber,
// 		notes: transaction.notes,
// 		competenceDate: transaction.competenceDate,
// 		tags: transaction.tags,
// 		createdAt: transaction.createdAt,
// 	}))
// }

// interface ISorting {
// 	id: string
// 	desc: boolean
// }
// export interface ITransactionSearchOptions {
// 	pageIndex: number
// 	searchTerm?: string
// 	sorting?: ISorting[]
// }
// export interface ITransactionSearchResponse {
// 	transactions: ITransactionDTO[]
// meta: {
// 	pageIndex: number
// 	perPage: number
// 	totalCount: number
// }
// }
// 	{
// 	pageIndex,
// 	searchTerm,
// 	sorting,
// }: ITransactionSearchOptions
// const normalizeSorting = (sorting: ISorting[] | undefined): string => {
// 	if (!sorting || sorting.length === 0) return ''
// 	const withoutClinic = sorting[0].id.replace('transactions', '')
// 	const normalizedSorting =
// 		withoutClinic.charAt(0).toLowerCase() + withoutClinic.slice(1)
// 	return normalizedSorting
// }
// const searchTermQuery = searchTerm ? `&searchTerm=${searchTerm}` : ''
// const sortingQuery = sorting
// 	? `&sortingField=${normalizeSorting(sorting)}&${
// 			sorting?.[0]?.desc ? 'orderBy=desc' : 'orderBy=asc'
// 		}`
// 	: ''
// ?pageIndex=${pageIndex}${searchTermQuery}${sortingQuery}
// meta: {
// 	pageIndex: response?.data.meta.pageIndex,
// 	perPage: response?.data.meta.perPage,
// 	totalCount: response?.data.meta.totalCount,
// },
