import { useContext } from 'react'

import { BalanceProviderContext } from '@app/contexts/balance'

export function useBalance() {
  const context = useContext(BalanceProviderContext)

  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider')
  }

  return context
}
