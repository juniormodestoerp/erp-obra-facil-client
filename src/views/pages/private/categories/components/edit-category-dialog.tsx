import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '@views/components/input'
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

import type { ICategory } from '@app/services/categories/fetch'
import { CheckboxGroup } from '@views/pages/private/categories/components/checkbox'
import { useCategoriesController } from '@views/pages/private/categories/use-categories-controller'

interface Props {
	category: ICategory
	isEditModalOpen: boolean
	setIsEditModalOpen: (value: boolean) => void
}

export function EditCategoryDialog({
	category,
	isEditModalOpen,
	setIsEditModalOpen,
}: Props) {
	const { methods, handleSubmit } = useCategoriesController()

	const {
		register,
		setValue,
		formState: { errors },
	} = methods

	const [selectedModelOption, setSelectedModelOption] = useState('category')
	const [selectedTypeOption, setSelectedTypeOption] = useState('income')

	function handleClose() {
		setIsEditModalOpen(!isEditModalOpen)
	}
	function handleOpen() {
		setIsEditModalOpen(!isEditModalOpen)
	}

	function handleModelCheckboxChange(id: string) {
		setSelectedModelOption(id)
		setValue('model', id)
		if (id === 'category') {
			setValue('categoryName', '')
		}
	}
	function handleTypeCheckboxChange(id: string) {
		setSelectedTypeOption(id)
		setValue('type', id)
	}

	const modelOptions = [
		{ id: 'category', label: 'Categoria' },
		{ id: 'subcategory', label: 'Subcategoria' },
	]
	const typeOptions = [
		{ id: 'income', label: 'Receita' },
		{ id: 'expense', label: 'Despesa' },
	]

	useEffect(() => {
		if (selectedModelOption === 'category') {
			setValue('categoryName', '')
			setValue('subcategoryName', '')
		}
	}, [selectedModelOption, setValue])

	useEffect(() => {
		setValue('categoryName', category.categoryName)
		setValue('subcategoryName', category.subcategoryName ?? '')
		setValue('type', category.type)
		setValue('model', category.model)
	}, [setValue, category])

	return (
		<Dialog open={isEditModalOpen} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<button
					type="button"
					onClick={handleOpen}
					className="absolute bottom-0 right-0 hidden h-full items-center justify-center gap-1 border-b-2 border-primary pr-1 text-sm font-medium text-primary sm:flex"
				>
					<Plus className="h-5 w-5" strokeWidth={2.5} />
					<span>Cadastrar</span>
				</button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar {category.categoryName}</DialogTitle>
					<DialogDescription>
						Defina uma nova categoria ou subcategoria no sistema.
					</DialogDescription>
				</DialogHeader>

				<form
					id="create-category-form"
					onSubmit={handleSubmit}
					className="grid gap-4 py-2 pb-4"
				>
					<CheckboxGroup
						title="Escolha o modelo de categoria"
						options={modelOptions}
						selectedOption={selectedModelOption}
						onOptionChange={handleModelCheckboxChange}
					/>

					{selectedModelOption === 'subcategory' && (
						<Input
							label="Categoria principal:"
							placeholder="Digite o nome da categoria principal"
							error={errors?.categoryName?.message}
							{...register('categoryName')}
						/>
					)}

					<CheckboxGroup
						title="Escolha o tipo"
						options={typeOptions}
						selectedOption={selectedTypeOption}
						onOptionChange={handleTypeCheckboxChange}
					/>

					<Input
						label={
							selectedModelOption === 'category'
								? 'Nome da categoria:'
								: 'Nome da subcategoria:'
						}
						placeholder={
							selectedModelOption === 'category'
								? 'Digite o nome da categoria'
								: 'Digite o nome da subcategoria'
						}
						error={
							selectedModelOption === 'category'
								? errors?.categoryName?.message
								: errors?.subcategoryName?.message
						}
						{...register(
							selectedModelOption === 'category'
								? 'categoryName'
								: 'subcategoryName',
						)}
					/>

					{/* Campos ocultos para model e type */}
					<input
						type="hidden"
						{...register('model')}
						value={selectedModelOption}
					/>
					<input
						type="hidden"
						{...register('type')}
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
	)
}
