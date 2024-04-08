import { useState } from 'react'

type TabProps = 'RevenuesExpenses' | 'CashFlow'

export function useReportsController() {
  const [currentTab, setCurrentTab] = useState<TabProps>('RevenuesExpenses')

  return {
    currentTab,
    setCurrentTab,
  }
}
