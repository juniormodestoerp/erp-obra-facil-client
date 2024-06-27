import { create } from '@app/services/conciliations/create'
import { verifyOfx } from '@app/services/conciliations/verify-ofx'
import { verifyXlxl } from '@app/services/conciliations/verify-xlsx'
import { addMany } from './add-many'
import { addOne } from './add-one'

export const conciliationsService = {
	create,
	verifyXlxl,
	verifyOfx,
	addOne,
	addMany,
}
