import { useState } from 'react'

type TabProps = 'Receitas' | 'Despesas'

export function UseSubscriptionsController() {
  const [currentTab, setCurrentTab] = useState<TabProps>('Receitas')
  return {
    currentTab,
    setCurrentTab,
  }
}
