import { create } from '@app/services/bank-accounts/create'
import { fetch } from '@app/services/bank-accounts/fetch'
import { remove } from '@app/services/bank-accounts/remove'
import { save } from '@app/services/bank-accounts/save'
import { selectInput } from '@app/services/bank-accounts/select-input'

export const bankAccountsService = {
	fetch,
	selectInput,
	create,
	save,
	remove,
}
