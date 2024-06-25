import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<IBankAccountDTO[]> {
	const { data } = await httpClient.get('/bank-accounts')

	return data.map((bankAccount: IBankAccountDTO) => ({
		id: bankAccount.id,
		name: bankAccount.name,
		createdAt: bankAccount.createdAt,
	}))
}
