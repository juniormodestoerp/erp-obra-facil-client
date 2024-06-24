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
import { Select } from '@views/components/select'
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
	const { methods, categories, handleSubmitUpdate } = useCategoriesController()

	const {
		register,
		setValue,
		control,
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
		if (id === 'category') {
			setValue('name', '')
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
			setValue('name', '')
			setValue('subcategoryOf', '')
		}
	}, [selectedModelOption, setValue])

	useEffect(() => {
		setValue('name', category.name)
		setValue('subcategoryOf', category.subcategoryOf ?? '')
		setValue('type', category.type)
	}, [setValue, category])

	const mappedCategories = categories
		?.filter((category) => category.subcategoryOf === '')
		.map((category) => {
			return {
				field: category.name,
				value: category.name,
			}
		})

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
					<DialogTitle>Editar {category.name}</DialogTitle>
					<DialogDescription>
						Defina uma nova categoria ou subcategoria no sistema.
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

					{selectedModelOption === 'subcategory' ? (
						<>
							<Select
								label="Categoria principal:"
								name="subcategoryOf"
								control={control}
								data={mappedCategories}
							/>

							<Input
								label="Subcategoria:"
								placeholder="Digite o nome da subcategoria"
								error={errors?.name?.message}
								{...register('name')}
							/>
						</>
					) : (
						<Input
							label="Categoria:"
							placeholder="Digite o nome da categoria"
							error={errors?.name?.message}
							{...register('name')}
						/>
					)}

					{/* Campos ocultos para model e type */}
					<input
						type="hidden"
						{...register('type')}
						value={selectedTypeOption}
					/>
				</form>

				<DialogFooter>
					<Button form="edit-category-form" type="submit">
						Cadastrar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
