import { create } from '@app/services/payment-methods/create'
import { fetch } from '@app/services/payment-methods/fetch'
import { remove } from '@app/services/payment-methods/remove'
import { save } from '@app/services/payment-methods/save'
import { selectInput } from '@app/services/payment-methods/select-input'

export const paymentMethodsService = {
	fetch,
	selectInput,
	create,
	save,
	remove,
}
