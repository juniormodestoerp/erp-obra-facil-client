import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'

export interface ITransactionParams {
	Data: string
	Valor: number
	Descrição: string
	Conta: string
	'Conta transferência': string | null
	Cartão: string | null
	Categoria: string
	Subcategoria: string | null
	Contato: string | null
	Centro: string | null
	Projeto: string | null
	Forma: string
	'N. Documento': string | null
	Observações: string | null
	'Data Competência': string | null
	Tags: string | null
}

export interface IVerifiedTransaction {
	id: string
	date: string
	amount: number
	description: string
	account: string
	transferAccount: string | null
	card: string | null
	category: string
	subcategory: string | null
	contact: string | null
	center: string | null
	project: string | null
	method: string
	documentNumber: string | null
	notes: string | null
	competenceDate: string | null
	tags: string | null
}

export interface IResponse {
	newTransactions: IVerifiedTransaction[]
	conflictingTransactions: IVerifiedTransaction[]
}

export async function verifyXlxl(
	transactions: ITransactionParams[],
): Promise<IResponse> {
	const mappedTransactions = transactions.map((transaction) => ({
		date: Format.excelSerialToDate(Number(transaction.Data)),
		amount: transaction.Valor,
		description: transaction.Descrição,
		account: transaction.Conta,
		transferAccount: transaction['Conta transferência'],
		card: transaction.Cartão,
		category: transaction.Categoria,
		subcategory: transaction.Subcategoria,
		contact: transaction.Contato,
		center: transaction.Centro,
		project: transaction.Projeto,
		method: transaction.Forma,
		documentNumber: transaction['N. Documento'],
		notes: transaction.Observações,
		competenceDate: transaction['Data Competência'],
		tags: transaction.Tags,
	}))

	const { data } = await httpClient.post(
		'/conciliations/import-worksheet',
		mappedTransactions,
	)

	return {
		newTransactions: data.newTransactions,
		conflictingTransactions: data.conflictingTransactions,
	}
	// return data.map((transaction: IResponse) => ({
	// 	// id: transaction.id,
	// 	date: transaction.date,
	// 	amount: transaction.amount,
	// 	description: transaction.description,
	// 	// account: transaction.account,
	// 	// transferAccount: transaction.transferAccount,
	// 	// card: transaction.card,
	// 	// category: transaction.category,
	// 	// subcategory: transaction.subcategory,
	// 	// contact: transaction.contact,
	// 	// center: transaction.center,
	// 	// project: transaction.project,
	// 	// method: transaction.method,
	// 	// documentNumber: transaction.documentNumber,
	// 	// notes: transaction.notes,
	// 	// competenceDate: transaction.competenceDate,
	// 	// tags: transaction.tags,
	// 	// createdAt: transaction.createdAt,
	// }))
}
