import { PaginationContext } from '@app/contexts/pagination-context'
import { useContext } from 'react'

export function usePagination() {
  return useContext(PaginationContext)
}
