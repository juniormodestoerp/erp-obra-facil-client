import { cn } from '@app/utils/cn'

import { ExpenseIcon } from '@/assets/icons/expense'
import { IncomeIcon } from '@/assets/icons/income'
import { CreateCategoryDialog } from '@views/pages/private/categories/components/create-category-dialog'

import { TabProps } from '@views/pages/private/categories/use-categories-controller'

interface Props {
  currentTab: TabProps
  setCurrentTab: (value: TabProps) => void
}

export function Header({ currentTab, setCurrentTab }: Props) {
  return (
    <header className="relative">
      <div className="flex w-full items-center sm:justify-center">
        {/* DESKTOP */}
        <div className="flex justify-start sm:justify-center">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setCurrentTab('Receitas')}
                className={cn(
                  currentTab === 'Receitas'
                    ? 'border-dark-blue text-dark-blue'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                )}
                aria-current={currentTab === 'Receitas' ? 'page' : undefined}
              >
                <IncomeIcon
                  className={cn(
                    currentTab === 'Receitas'
                      ? 'text-dark-blue'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span>Receitas</span>
              </button>

              <button
                onClick={() => setCurrentTab('Despesas')}
                className={cn(
                  currentTab === 'Despesas'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                )}
                aria-current={currentTab === 'Despesas' ? 'page' : undefined}
              >
                <ExpenseIcon
                  className={cn(
                    currentTab === 'Despesas'
                      ? 'text-red-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span>Despesas</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <CreateCategoryDialog />
    </header>
  )
}
