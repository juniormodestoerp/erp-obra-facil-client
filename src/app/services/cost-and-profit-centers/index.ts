import { create } from '@app/services/cost-and-profit-centers/create'
import { fetch } from '@app/services/cost-and-profit-centers/fetch'
import { remove } from '@app/services/cost-and-profit-centers/remove'
import { save } from '@app/services/cost-and-profit-centers/save'
import { selectInput } from '@app/services/cost-and-profit-centers/select-input'

export const costAndProfitCentersService = {
	fetch,
	selectInput,
	create,
	save,
	remove,
}
