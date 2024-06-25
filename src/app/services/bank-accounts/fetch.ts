import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<IBankAccountDTO[]> {
	const { data } = await httpClient.get('/bank-accounts')

	return data.map((bankAccount: IBankAccountDTO) => ({
		id: bankAccount.id,
		accountType: bankAccount.accountType,
		name: bankAccount.name,
		currency: bankAccount.currency,
		logo: bankAccount.logo,
		limit: bankAccount.limit,
		limitType:
			bankAccount.limitType !== null &&
			(bankAccount.limitType as any) === 'MONTHLY'
				? 'Mensal'
				: 'Total',
		dueDateDay: bankAccount.dueDateDay,
		dueDateFirstInvoice: bankAccount.dueDateFirstInvoice,
		closingDateInvoice: bankAccount.closingDateInvoice,
		balanceFirstInvoice: bankAccount.balanceFirstInvoice,
		isFirstInvoice: bankAccount.isFirstInvoice,
		isCreditCard: bankAccount.isCreditCard,
		initialBalance: bankAccount.initialBalance,
		createdAt: bankAccount.createdAt,
	}))
}
