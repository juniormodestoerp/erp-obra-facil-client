import { fetch } from '@app/services/transactions/fetch'
import { create } from '@app/services/transactions/create'
import { save } from '@app/services/transactions/save'
import { remove } from '@app/services/transactions/remove'

export const transactionsService = {
  fetch,
  create,
  save,
  remove,
}
