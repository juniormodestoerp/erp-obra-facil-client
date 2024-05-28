import { create } from '@app/services/transactions/create'
import { fetch } from '@app/services/transactions/fetch'
import { remove } from '@app/services/transactions/remove'
import { save } from '@app/services/transactions/save'

export const transactionsService = {
	fetch,
	create,
	save,
	remove,
}
