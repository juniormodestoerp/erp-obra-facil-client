import { create } from '@app/services/transfers/create'
import { fetch } from '@app/services/transfers/fetch'
import { remove } from '@app/services/transfers/remove'
import { save } from '@app/services/transfers/save'
import { selectInput } from '@app/services/transfers/select-input'

export const transfersService = {
	fetch,
	selectInput,
	create,
	save,
	remove,
}
