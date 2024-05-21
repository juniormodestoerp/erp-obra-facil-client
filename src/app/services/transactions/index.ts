import { fetch } from '@app/services/categories/fetch'
import { create } from '@app/services/categories/create'
import { save } from '@app/services/categories/save'
import { remove } from '@app/services/categories/remove'

export const transactionsService = {
  fetch,
  create,
  save,
  remove,
}
