import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { httpClient } from '@app/services/http-client'

type ICreateBankAccountDTO = Omit<IBankAccountDTO, 'id' | 'createdAt'>

export interface Params {
	name: string
}

export async function create({
	accountType,
	name,
	currency,
	logo,
	limit,
	limitType,
	dueDateDay,
	dueDateFirstInvoice,
	closingDateInvoice,
	balanceFirstInvoice,
	isFirstInvoice,
	isCreditCard,
	initialBalance,
}: ICreateBankAccountDTO): Promise<IBankAccountDTO> {
	const { data } = await httpClient.post('/accounts', {
		accountType,
		name,
		currency,
		logo,
		limit,
		limitType: limitType === 'Mensal' ? 'MONTHLY' : 'TOTAL',
		dueDateDay,
		dueDateFirstInvoice: dueDateFirstInvoice,
		closingDateInvoice,
		balanceFirstInvoice,
		isFirstInvoice,
		isCreditCard,
		initialBalance,
	})

	return {
		id: data.id,
		accountType: data.accountType,
		name: data.name,
		currency: data.currency,
		logo: data.logo,
		limit: data.limit,
		limitType: data.limitType === 'MONTHLY' ? 'Mensal' : 'Total',
		dueDateDay: data.dueDateDay,
		dueDateFirstInvoice: data.dueDateFirstInvoice,
		closingDateInvoice: data.closingDateInvoice,
		balanceFirstInvoice: data.balanceFirstInvoice,
		isFirstInvoice: data.isFirstInvoice,
		isCreditCard: data.isCreditCard,
		initialBalance: data.initialBalance,
		createdAt: data.createdAt,
	}
}
