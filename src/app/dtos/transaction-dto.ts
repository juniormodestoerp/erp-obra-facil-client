export interface ITransactionDTO {
	id: string
	type: string
	date: Date
	amount: number
	description: string
	account: string
	status: string
	category: string
	card: string | null
	contact: string | null
	center: string | null
	project: string | null
	method: string | null
	documentNumber: string | null
	notes: string | null
	competenceDate: Date | null
	tags: string | null
	createdAt: string
}
