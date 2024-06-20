import { type ReactNode, createContext, useState } from 'react'

interface TransactionContextType {
	isTransactionOpen: boolean
	openTransaction: () => void
	closeTransaction: () => void
}

export const TransactionProviderContext = createContext<
	TransactionContextType | undefined
>(undefined)

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
	const [isTransactionOpen, setTransactionOpen] = useState(false)

	const openTransaction = () => setTransactionOpen(true)
	const closeTransaction = () => setTransactionOpen(false)

	return (
		<TransactionProviderContext.Provider
			value={{ isTransactionOpen, openTransaction, closeTransaction }}
		>
			{children}
		</TransactionProviderContext.Provider>
	)
}
