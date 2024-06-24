import { cn } from '@app/utils/cn'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@views/components/tooltip'
import { useCategoriesController } from '@views/pages/private/categories/use-categories-controller'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { ExpenseIcon } from '@/assets/icons/expense'
import { IncomeIcon } from '@/assets/icons/income'
import type { ICategory } from '@app/services/categories/fetch'
import { PageTitle } from '@views/components/page-title'
import { Header } from '@views/pages/private/categories/components/header'
import { EditCategoryDialog } from './components/edit-cost-and-profit-center-dialog'
import { RemoveCategoryDialog } from './components/remove-cost-and-profit-center-dialog'

import { useGlobalShortcut } from '@app/utils/global-shortcut'
import { useTransaction } from '@app/hooks/use-transaction'
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'

export function CostAndProfitCenters() {
	const { openTransaction, isTransactionOpen, closeTransaction } =
		useTransaction()

	useGlobalShortcut('Ctrl+a', openTransaction)

	const { currentTab, setCurrentTab, categories } = useCategoriesController()

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const [selectedCategory, setSelectedCategory] = useState<ICategory>(
		{} as ICategory,
	)

	function organizeIncomeCategories(categories: ICategory[]) {
		if (!categories) {
			return []
		}

		const organized = categories
			.filter((category) => category.type === 'income' && !category.categoryId)
			.flatMap((category) => {
				const subcategories = categories
					.filter((sub) => sub.categoryId === category.id)
					.sort((a, b) => a.categoryName.localeCompare(b.categoryName))

				return [category, ...subcategories]
			})

		return organized
	}

	const organizedIncomeCategories = organizeIncomeCategories(categories ?? [])

	function organizeExpenseCategories(categories: ICategory[]) {
		if (!categories || categories.length === 0) {
			return []
		}

		const organized = categories
			.filter((category) => category.type === 'expense' && !category.categoryId)
			.flatMap((category) => {
				const subcategories = categories
					.filter((sub) => sub.categoryId === category.id)
					.sort((a, b) => a.categoryName.localeCompare(b.categoryName))

				return [category, ...subcategories]
			})

		return organized
	}

	const organizedExpenseCategories = organizeExpenseCategories(categories ?? [])

	function openEditModal(category: ICategory) {
		if (category) {
			setSelectedCategory(category)
			setIsEditModalOpen(true)
		}
	}

	function openDeleteModal(category: ICategory) {
		if (category) {
			setSelectedCategory(category)
			setIsDeleteModalOpen(true)
		}
	}

	return (
		<Fragment>
			<Helmet title="Categorias" />

			<PageTitle
				title="Categorias"
				description="Crie e gerencie suas categorias de receitas e despesas."
			/>

			<Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
				{currentTab === 'Receitas'
					? organizedIncomeCategories.length > 0 &&
						organizedIncomeCategories.map((category: ICategory) => {
							const isPrimary = !category.categoryId
							return (
								<div
									key={category.id}
									className={cn(
										'flex items-center justify-start px-3',
										isPrimary
											? 'border-collapse border-t border-gy-200 dark:border-slate-400'
											: 'pl-8',
									)}
								>
									{isPrimary ? (
										<IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
									) : null}

									<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
										<p
											className={cn(
												'font-medium tracking-tight',
												isPrimary
													? ''
													: 'text-sm text-gray-600 dark:text-zinc-300',
											)}
										>
											{!isPrimary && <span className="mr-2">&bull;</span>}
											<span className="w-full">{category.categoryName}</span>
										</p>

										{isPrimary && (
											<div className="flex gap-2">
												<Tooltip text="Editar categoria">
													<button
														type="button"
														onClick={() => openEditModal(category)}
													>
														<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
													</button>
												</Tooltip>

												<Tooltip text="Remover categoria">
													<button
														type="button"
														onClick={() => openDeleteModal(category)}
													>
														<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
													</button>
												</Tooltip>
											</div>
										)}
									</div>
								</div>
							)
						})
					: organizedExpenseCategories.length > 0 &&
						organizedExpenseCategories.map((category: ICategory) => {
							const isPrimary = !category.categoryId
							return (
								<div
									key={category.id}
									className={`flex items-center justify-start px-3 ${
										isPrimary ? 'border-t border-gy-200' : 'pl-8'
									}`}
								>
									{isPrimary ? (
										<ExpenseIcon className="h-5 w-5 text-red-500" />
									) : null}

									<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
										<p
											className={`font-medium tracking-tight ${
												isPrimary
													? ''
													: 'text-sm text-gray-600 dark:text-zinc-300'
											}`}
										>
											{!isPrimary && <span className="mr-2">&bull;</span>}
											<span className="w-full">{category.categoryName}</span>
										</p>

										{isPrimary && (
											<div className="flex gap-2">
												<Tooltip text="Editar categoria">
													<button
														type="button"
														onClick={() => openEditModal(category)}
													>
														<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
													</button>
												</Tooltip>

												<Tooltip text="Remover categoria">
													<button
														type="button"
														onClick={() => openDeleteModal(category)}
													>
														<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
													</button>
												</Tooltip>
											</div>
										)}
									</div>
								</div>
							)
						})}
			</div>

			{isEditModalOpen && (
				<EditCategoryDialog
					category={selectedCategory}
					isEditModalOpen={isEditModalOpen}
					setIsEditModalOpen={setIsEditModalOpen}
				/>
			)}

			{isDeleteModalOpen && (
				<RemoveCategoryDialog
					category={selectedCategory}
					isDeleteModalOpen={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
				/>
			)}

			<Dialog
				open={isTransactionOpen}
				onOpenChange={(open) => {
					open ? openTransaction() : closeTransaction()
				}}
			>
				<DialogOverlay />
				<DialogTrigger asChild>
					<button type="button" className="hidden" />
				</DialogTrigger>
				<NewFundRealeaseContent />
			</Dialog>
		</Fragment>
	)
}
