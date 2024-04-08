import {
  createContext,
  Dispatch,
  type ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface PaginationContextValue {
  itemsLength: number
  setItemsLength: Dispatch<SetStateAction<number>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const PaginationContext = createContext({} as PaginationContextValue)

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [itemsLength, setItemsLength] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <PaginationContext.Provider
      value={{
        itemsLength,
        setItemsLength,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
