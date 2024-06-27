import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'

export interface IAddOneParams {
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
}

export interface IResponse {
	id: string
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

export async function addOne(transaction: IAddOneParams): Promise<IResponse> {
	console.log('chegou no service', transaction.date)

	const mappedTransactions = {
		date: Format.formatOfxDate(transaction.date),
		amount: transaction.amount,
		description: Format.formatDescription(transaction.description),
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
	}

	const { data } = await httpClient.post(
		'/conciliations/add-one',
		mappedTransactions,
	)

	return {
		...data,
		date: Format.parseIso(data.date),
		createdAt: Format.parseIso(data.createdAt),
	}
}
