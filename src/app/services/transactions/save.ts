import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'

type IUpdatePaymentMethodDTO = Partial<
	Omit<ITransactionDTO, 'id' | 'createdAt'>
> & {
	id: string
}

export async function save({
	id,
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
}: IUpdatePaymentMethodDTO): Promise<ITransactionDTO> {
	const { data } = await httpClient.patch(`/transactions/${id}`, {
		type,
		date: date ? Format.parseIso(date?.toISOString()) : null,
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
		competenceDate: competenceDate
			? Format.parseIso(competenceDate.toISOString())
			: null,
		tag: tags,
	})

	return {
		id: data.id,
		type: data.type,
		date: data.date,
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
