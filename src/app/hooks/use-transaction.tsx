import { useContext } from 'react'

import { TransactionProviderContext } from '@app/contexts/transaction'

export const useTransaction = () => {
	const context = useContext(TransactionProviderContext)
	if (context === undefined) {
		throw new Error('useTransaction must be used within a TransactionProvider')
	}
	return context
}
