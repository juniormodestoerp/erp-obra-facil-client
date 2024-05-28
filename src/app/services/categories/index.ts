import { create } from '@app/services/categories/create'
import { fetch } from '@app/services/categories/fetch'
import { remove } from '@app/services/categories/remove'
import { save } from '@app/services/categories/save'
import { selectInput } from '@app/services/categories/select-input'

export const categoriesService = {
	fetch,
	selectInput,
	create,
	save,
	remove,
}
