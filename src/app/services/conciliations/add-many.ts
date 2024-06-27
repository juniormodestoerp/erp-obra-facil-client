import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'

export interface IAddManyParams {
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

export interface IVerifiedTransaction {
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
	createAt: string
}

export interface IResponse {
	transactions: IVerifiedTransaction[]
}

export async function addMany(
	transactions: IAddManyParams[],
): Promise<IResponse> {
	console.log('chegou no service', transactions)

	const isValidDate = (dateString: string) => {
		const date = new Date(dateString)
		return !Number.isNaN(date.getTime())
	}

	const mappedTransactions = transactions.map((transaction) => {
		try {
			console.log('processing transaction', transaction)
			const date = isValidDate(transaction.date)
				? Format.formatOfxDate(transaction.date)
				: null
			return {
				date: date,
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
				method: transaction.method
					? Format.translateAndCapitalize(transaction.method)
					: null,
				documentNumber: transaction.documentNumber,
				notes: transaction.notes
					? Format.formatDescription(transaction.notes)
					: null,
				competenceDate: transaction.competenceDate,
				tags: transaction.tags,
			}
		} catch (error) {
			console.error('Error processing transaction', transaction, error)
			return null
		}
	})

	console.log('mappedTransactions', mappedTransactions)

	const { data } = await httpClient.post(
		'/conciliations/add-many',
		mappedTransactions,
	)

	return {
		transactions: data.transactions,
	}
}
