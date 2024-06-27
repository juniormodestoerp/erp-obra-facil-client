import { ExpenseIcon } from '@/assets/icons/expense'
import { IncomeIcon } from '@/assets/icons/income'
import type { ICategoryDTO } from '@app/dtos/category-dto'
import { cn } from '@app/utils/cn'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { PageTitle } from '@views/components/page-title'
import { Select } from '@views/components/select'
import { Tooltip } from '@views/components/tooltip'
import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { useCategoriesController } from '@views/pages/private/categories/use-categories-controller'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckboxGroup } from '../../../components/checkbox-group'

export function Categories() {
	const {
		organizedIncomeCategories,
		organizedExpenseCategories,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedCategory,
		hookFormErrorsCreate,
		hookFormErrorsUpdate,
		modelOptions,
		typeOptions,
		hookFormControlCreate,
		hookFormControlUpdate,
		selectedModelOption,
		selectedTypeOption,
		transformedCategories,
		handleModelCheckboxChange,
		handleTypeCheckboxChange,
		hookFormRegisterCreate,
		hookFormRegisterUpdate,
		handleOpenCreateModal,
		handleCloseCreateModal,
		handleOpenUpdateModal,
		handleCloseUpdateModal,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleSubmit,
		handleSubmitUpdate,
		handleSubmitRemove,
	} = useCategoriesController()

	return (
		<Fragment>
			<Helmet title="Categorias" />

			<PageTitle
				title="Categorias"
				description="Crie e gerencie suas categorias."
			/>

			{organizedExpenseCategories.length === 0 &&
			organizedIncomeCategories.length === 0 ? (
				<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
					<div className="h-24 text-center flex items-center justify-center">
						<p>Nenhum resultado encontrado</p>
					</div>
				</div>
			) : (
				<div className="lg:flex-row flex gap-4 flex-col items-start">
					{organizedIncomeCategories.length > 0 && (
						<div className="w-full">
							<h2 className="text-lg font-semibold text-foreground mb-2">
								Receitas
							</h2>
							<div className="h-auto border-collapse w-full overflow-hidden rounded border border-zinc-300 dark:border-slate-400 dark:bg-slate-800">
								{organizedIncomeCategories.map((category: ICategoryDTO) => {
									const isPrimary = category.subcategoryOf === ''
									return (
										<div
											key={category.id}
											className={cn(
												'flex items-center justify-start px-3',
												isPrimary
													? 'border-collapse border-t border-gy-200 first:border-t-0 dark:border-slate-400'
													: 'pl-8',
											)}
										>
											{isPrimary && (
												<IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
											)}
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
													<span className="w-full">{category.name}</span>
												</p>
												<div className="flex gap-2">
													<Tooltip text="Editar método de pagamento">
														<button
															type="button"
															onClick={() => handleOpenUpdateModal(category)}
														>
															<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
														</button>
													</Tooltip>
													<Tooltip text="Remover método de pagamento">
														<button
															type="button"
															onClick={() => handleOpenDeleteModal(category)}
														>
															<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
														</button>
													</Tooltip>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					)}

					{organizedExpenseCategories.length > 0 && (
						<div className="w-full mt-px">
							<h2 className="text-[17px] font-semibold text-foreground mb-2">
								Despesas
							</h2>
							<div className="h-auto border-collapse w-full overflow-hidden rounded border border-zinc-300 dark:border-slate-400 dark:bg-slate-800">
								{organizedExpenseCategories.map((category: ICategoryDTO) => {
									const isPrimary = category.subcategoryOf === ''
									return (
										<div
											key={category.id}
											className={`flex items-center justify-start px-3 ${
												isPrimary
													? 'border-t border-gy-200 first:border-t-0'
													: 'pl-8'
											}`}
										>
											{isPrimary && (
												<ExpenseIcon className="h-5 w-5 text-red-500" />
											)}
											<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
												<p
													className={`font-medium tracking-tight ${
														isPrimary
															? ''
															: 'text-sm text-gray-600 dark:text-zinc-300'
													}`}
												>
													{!isPrimary && <span className="mr-2">&bull;</span>}
													<span className="w-full">{category.name}</span>
												</p>
												<div className="flex gap-2">
													<Tooltip text="Editar método de pagamento">
														<button
															type="button"
															onClick={() => handleOpenUpdateModal(category)}
														>
															<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
														</button>
													</Tooltip>
													<Tooltip text="Remover método de pagamento">
														<button
															type="button"
															onClick={() => handleOpenDeleteModal(category)}
														>
															<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
														</button>
													</Tooltip>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					)}
				</div>
			)}

			<Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
				<DialogTrigger asChild>
					<button
						type="button"
						onClick={handleOpenCreateModal}
						className="absolute bottom-8 right-12 flex justify-center hover:bg-primary/90 size-10 items-center gap-1 border-2 bg-primary rounded-full border-primary pr-1 text-sm font-medium text-primary"
					>
						<Plus className="size-5 text-white ml-1" strokeWidth={2.5} />
					</button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]" title='Cadastrar categoria'>
					<DialogHeader>
						<DialogTitle>Cadastrar categoria</DialogTitle>
						<DialogDescription>
							Defina uma nova categoria no sistema.
						</DialogDescription>
					</DialogHeader>

					<form
						id="create-category-form"
						onSubmit={handleSubmit}
						className="grid gap-4 py-2 pb-4"
					>
						<CheckboxGroup
							title="Escolha o tipo"
							options={typeOptions}
							selectedOption={selectedTypeOption}
							onOptionChange={handleTypeCheckboxChange}
						/>

						<CheckboxGroup
							title="Escolha o modelo de categoria"
							options={modelOptions}
							selectedOption={selectedModelOption}
							onOptionChange={handleModelCheckboxChange}
						/>

						{selectedModelOption === 'SUBCATEGORY' ? (
							<>
								<Select
									label="Categoria principal:"
									name="subcategoryOf"
									control={hookFormControlCreate}
									data={transformedCategories}
								/>

								<Input
									label="Subcategoria:"
									placeholder="Digite o nome da subcategoria"
									error={hookFormErrorsCreate?.name?.message}
									{...hookFormRegisterCreate('name')}
								/>
							</>
						) : (
							<Input
								label="Categoria:"
								placeholder="Digite o nome da categoria"
								error={hookFormErrorsCreate?.name?.message}
								{...hookFormRegisterCreate('name')}
							/>
						)}

						{/* Campos ocultos para model e type */}
						<input
							type="hidden"
							{...hookFormRegisterCreate('type')}
							value={selectedTypeOption}
						/>
					</form>

					<DialogFooter>
						<Button form="create-category-form" type="submit">
							Cadastrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-[425px]" title='Editar categoria'>
						<DialogHeader>
							<DialogTitle>Editar {selectedCategory?.name}</DialogTitle>
							<DialogDescription>
								Atualize uma categoria no sistema.
							</DialogDescription>
						</DialogHeader>

						<form
							id="edit-category-form"
							onSubmit={handleSubmitUpdate}
							className="grid gap-4 py-2 pb-4"
						>
							<CheckboxGroup
								title="Escolha o tipo"
								options={typeOptions}
								selectedOption={selectedTypeOption}
								onOptionChange={handleTypeCheckboxChange}
							/>

							<CheckboxGroup
								title="Escolha o modelo de categoria"
								options={modelOptions}
								selectedOption={selectedModelOption}
								onOptionChange={handleModelCheckboxChange}
							/>

							{selectedModelOption === 'SUBCATEGORY' ? (
								<>
									<Select
										label="Categoria principal:"
										name="subcategoryOf"
										control={hookFormControlUpdate}
										data={transformedCategories}
									/>

									<Input
										label="Subcategoria:"
										placeholder="Digite o nome da subcategoria"
										error={hookFormErrorsUpdate?.name?.message}
										{...hookFormRegisterUpdate('name')}
									/>
								</>
							) : (
								<Input
									label="Categoria:"
									placeholder="Digite o nome da categoria"
									error={hookFormErrorsUpdate?.name?.message}
									{...hookFormRegisterUpdate('name')}
								/>
							)}

							{/* Campos ocultos para model e type */}
							<input
								type="hidden"
								{...hookFormRegisterUpdate('type')}
								value={selectedTypeOption}
							/>
						</form>
						<DialogFooter>
							<Button form="edit-category-form" type="submit">
								Atualizar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{isDeleteModalOpen && (
				<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
					<DialogContent className="sm:max-w-[425px]" title='Remover categoria'>
						<DialogHeader>
							<DialogTitle>Remover {selectedCategory.name}</DialogTitle>
							<DialogDescription>
								Tem certeza de que deseja remover esta categoria? Essa ação
								poderá ser desfeita.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="mt-4">
							<Button
								type="submit"
								variant="destructive"
								onClick={() => {
									handleSubmitRemove(selectedCategory)
									handleCloseDeleteModal()
								}}
							>
								Remover
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	)
}
