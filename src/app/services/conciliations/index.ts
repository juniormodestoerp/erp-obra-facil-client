import { create } from '@app/services/conciliations/create'
import { verifyXlxl } from '@app/services/conciliations/verify-xlsx'
import { verifyOfx } from '@app/services/conciliations/verify-ofx'

export const conciliationsService = {
	create,
	verifyXlxl,
	verifyOfx
}
