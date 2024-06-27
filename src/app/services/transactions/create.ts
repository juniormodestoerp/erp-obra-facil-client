import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'

type ICreateTransactionDTO = Omit<ITransactionDTO, 'id' | 'createdAt'>

export async function create({
	type,
	date,
	amount,
	description,
	account,
	status,
	card,
	category,
	contact,
	center,
	project,
	method,
	documentNumber,
	notes,
	competenceDate,
	tags,
}: ICreateTransactionDTO): Promise<ITransactionDTO> {
	const { data } = await httpClient.post('/transactions', {
		type,
		date,
		amount,
		description,
		account,
		status,
		card,
		category,
		contact,
		center,
		project,
		method,
		documentNumber,
		notes,
		competenceDate,
		tags,
	})

	return {
		id: data.id,
		type: data.type,
		date: Format.parseIso(data.date),
		amount: data.amount,
		description: data.description,
		account: data.account,
		status: data.status,
		card: data.card,
		category: data.category,
		contact: data.contact,
		center: data.center,
		project: data.project,
		method: data.method,
		documentNumber: data.documentNumber,
		notes: data.notes,
		competenceDate: data.competenceDate,
		tags: data.tags,
		createdAt: data.createdAt,
	}
}
