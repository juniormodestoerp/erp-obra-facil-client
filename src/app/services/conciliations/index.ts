import { create } from '@app/services/conciliations/create'
import { verifyOfx } from '@app/services/conciliations/verify-ofx'
import { verifyXlxl } from '@app/services/conciliations/verify-xlsx'

export const conciliationsService = {
	create,
	verifyXlxl,
	verifyOfx,
}
