import { cn } from '@app/utils/cn'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ReactTooltip } from '@views/components/tooltip-old'
import { UseSubscriptionsController } from '@views/pages/private/subscriptions/use-subscriptions-controller'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { categoriesOptions, Category } from '@/assets/data'
import { ExpenseIcon } from '@/assets/icons/expense'
import { IncomeIcon } from '@/assets/icons/income'

export function Subscriptions() {
  const { currentTab, setCurrentTab } = UseSubscriptionsController()

  console.log(currentTab === 'Receitas')

  function organizeIncomeCategories(categories: Category[]) {
    // Organizando categorias primárias e suas subcategorias
    const organized = categories
      .filter((category) => category.type === 'income' && !category.parentId) // Filtra apenas as categorias primárias de receita
      .map((category) => {
        // Busca subcategorias dessa categoria primária
        const subcategories = categories
          .filter((sub) => sub.parentId === category.id)
          .sort((a, b) => a.name.localeCompare(b.name)) // Ordena as subcategorias

        return [category, ...subcategories] // Retorna a categoria primária seguida de suas subcategorias ordenadas
      })
      .flat() // Achata o array de arrays em um único array

    return organized
  }

  const organizedIncomeCategories = organizeIncomeCategories(categoriesOptions)

  function organizeExpenseCategories(categories: Category[]) {
    // Organizando categorias primárias e suas subcategorias
    const organized = categories
      .filter((category) => category.type === 'expense' && !category.parentId) // Alteração para 'expense'
      .map((category) => {
        // Busca subcategorias dessa categoria primária
        const subcategories = categories
          .filter((sub) => sub.parentId === category.id)
          .sort((a, b) => a.name.localeCompare(b.name)) // Ordena as subcategorias

        return [category, ...subcategories] // Retorna a categoria primária seguida de suas subcategorias ordenadas
      })
      .flat() // Achata o array de arrays em um único array

    return organized
  }

  const organizedExpenseCategories =
    organizeExpenseCategories(categoriesOptions)

  return (
    <Fragment>
      <Helmet title="Cadastros" />

      <header className="relative">
        <div className="flex w-full items-center justify-center">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Selecione uma opção
            </label>

            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
              defaultValue="Receitas"
            >
              <option>Receitas</option>
              <option>Despesas</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setCurrentTab('Receitas')}
                  className={cn(
                    currentTab === 'Receitas'
                      ? 'border-primary text-primary/90'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                  aria-current={currentTab === 'Receitas' ? 'page' : undefined}
                >
                  <IncomeIcon
                    className={cn(
                      currentTab === 'Receitas'
                        ? 'text-primary'
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
                      ? 'border-primary text-primary/90'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                  aria-current={currentTab === 'Despesas' ? 'page' : undefined}
                >
                  <ExpenseIcon
                    className={cn(
                      currentTab === 'Despesas'
                        ? 'text-primary'
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
        <button className="absolute bottom-0 right-0 hidden h-full items-center justify-center gap-1 border-b-2 border-green-600 pr-1 text-sm font-medium text-green-700 sm:flex">
          <Plus className="h-5 w-5" strokeWidth={2.5} />
          <span>Cadastrar</span>
        </button>
      </header>

      <body className="my-8 h-auto overflow-hidden rounded border border-primary shadow">
        {currentTab === 'Receitas'
          ? organizedIncomeCategories.map((category: Category) => {
              const isPrimary = !category.parentId
              return (
                <div
                  key={category.id}
                  className={cn(
                    'flex items-center justify-start px-3',
                    isPrimary ? 'border-t border-gy-200' : 'pl-8',
                  )}
                >
                  {isPrimary ? (
                    <IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
                  ) : null}

                  <div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
                    <p
                      className={cn(
                        'font-medium tracking-tight',
                        isPrimary ? '' : 'text-sm text-gray-600',
                      )}
                    >
                      {!isPrimary && <span className="mr-2">&bull;</span>}
                      <span className="w-full">{category.name}</span>
                    </p>

                    {isPrimary && (
                      <div className="flex gap-2">
                        <button id="edit-category" className="">
                          <PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
                        </button>
                        <button id="remove-category">
                          <TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          : organizedExpenseCategories.map((category: Category) => {
              const isPrimary = !category.parentId
              return (
                <div
                  key={category.id}
                  className={`flex items-center justify-start px-3 ${isPrimary ? 'border-t border-gy-200' : 'pl-8'}`}
                >
                  {isPrimary ? (
                    <ExpenseIcon className="h-5 w-5 text-red-500" />
                  ) : null}

                  <div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
                    <p
                      className={`font-medium tracking-tight ${isPrimary ? '' : 'text-sm text-gray-600'}`}
                    >
                      {!isPrimary && <span className="mr-2">&bull;</span>}
                      <span className="w-full">{category.name}</span>
                    </p>

                    {isPrimary && (
                      <div className="flex gap-2">
                        <button id="edit-category" className="">
                          <PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
                        </button>
                        <button id="remove-category">
                          <TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
      </body>
      <ReactTooltip id="create-category" text="Criar categoria" />
      <ReactTooltip id="edit-category" text="Editar categoria" />
      <ReactTooltip id="remove-category" text="Remover categoria" />
      <ReactTooltip id="create-subcategory" text="Criar subcategoria" />
      <ReactTooltip id="edit-subcategory" text="Editar subcategoria" />
      <ReactTooltip id="remove-subcategory" text="Remover subcategoria" />
    </Fragment>
  )
}
