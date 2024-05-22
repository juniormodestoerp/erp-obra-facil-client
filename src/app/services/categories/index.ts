import { fetch } from '@app/services/categories/fetch'
import { selectInput } from '@app/services/categories/select-input'
import { create } from '@app/services/categories/create'
import { save } from '@app/services/categories/save'
import { remove } from '@app/services/categories/remove'

export const categoriesService = {
  fetch,
  selectInput,
  create,
  save,
  remove,
}
