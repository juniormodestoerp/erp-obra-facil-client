export interface ITransactionDTO {
	id: string
	type: string
	date: string
	amount: number
	description: string
	account: string
	status: string
	card: string | null
	category: string | null
	contact: string | null
	center: string | null
	project: string | null
	method: string | null
	documentNumber: string | null
	notes: string | null
	competenceDate: string | null
	tags: string[] | null
	createdAt: string
}