import { cn } from '@app/utils/cn'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import { useReportsController } from '@views/pages/private/reports/use-reports-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { Card, cashFlowCards, reportCards } from '@/assets/data'
import { ReceiptIcon } from '@/assets/icons/receipt'

export function Reports() {
  const { currentTab, setCurrentTab } = useReportsController()
  return (
    <Fragment>
      <Helmet title="Relatórios" />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>

        <header className="relative flex w-full items-center justify-center">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Selecione uma opção
            </label>

            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
              defaultValue="RevenuesExpenses"
            >
              <option>Receitas e despesas</option>
              <option>Caixa</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setCurrentTab('RevenuesExpenses')}
                  className={cn(
                    currentTab === 'RevenuesExpenses'
                      ? 'border-primary text-primary/90'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                  aria-current={
                    currentTab === 'RevenuesExpenses' ? 'page' : undefined
                  }
                >
                  <CurrencyDollarIcon
                    className={cn(
                      currentTab === 'RevenuesExpenses'
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5',
                    )}
                    aria-hidden="true"
                  />
                  <span>Receitas e despesas</span>
                </button>

                <button
                  onClick={() => setCurrentTab('CashFlow')}
                  className={cn(
                    currentTab === 'CashFlow'
                      ? 'border-primary text-primary/90'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                  aria-current={currentTab === 'CashFlow' ? 'page' : undefined}
                >
                  <ReceiptIcon
                    className={cn(
                      currentTab === 'CashFlow'
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-[18px] w-[18px]',
                    )}
                    aria-hidden="true"
                  />
                  <span>Caixa</span>
                </button>
              </nav>
            </div>
          </div>
        </header>

        <div className="mt-4 grid grid-cols-2 gap-8">
          {currentTab === 'RevenuesExpenses'
            ? reportCards.map((card: Card) => {
                return (
                  <button
                    key={card.id}
                    className="group col-span-1 flex w-full items-center justify-start rounded border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-primary hover:bg-primary dark:border-slate-400 dark:bg-slate-800"
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-white">
                      {card.label}
                    </span>
                  </button>
                )
              })
            : cashFlowCards.map((card: Card) => {
                return (
                  <button
                    key={card.id}
                    className="group col-span-1 flex w-full items-center justify-start rounded border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-primary hover:bg-primary dark:border-slate-400 dark:bg-slate-800"
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-white">
                      {card.label}
                    </span>
                  </button>
                )
              })}
        </div>

        <div className="grid grid-cols-9 gap-4"></div>
      </div>
    </Fragment>
  )
}
