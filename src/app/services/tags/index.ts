import { create } from '@app/services/tags/create'
import { fetch } from '@app/services/tags/fetch'
import { remove } from '@app/services/tags/remove'
import { save } from '@app/services/tags/save'
import { selectInput } from '@app/services/tags/select-input'

export const tagsService = {
	fetch,
	selectInput,
	create,
	save,
	remove,
}
