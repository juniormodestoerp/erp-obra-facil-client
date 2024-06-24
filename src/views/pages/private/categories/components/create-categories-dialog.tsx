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

import { Select } from '@views/components/select'
import { CheckboxGroup } from '@views/pages/private/categories/components/checkbox'
import { useCategoriesController } from '@views/pages/private/categories/use-categories-controller'

export function CreateCategoryDialog() {
	const {
		methods,
		handleSubmit,
		categories,
		isCreateModalOpen,
		handleCloseCreateModal,
		handleOpenCreateModal,
	} = useCategoriesController()

	const {
		register,
		setValue,
		control,
		formState: { errors },
	} = methods

	const [selectedModelOption, setSelectedModelOption] = useState('category')
	const [selectedTypeOption, setSelectedTypeOption] = useState('income') // type

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

	const mappedCategories = categories
		?.filter((category) => category.subcategoryOf === '')
		.map((category) => {
			return {
				field: category.name,
				value: category.name,
			}
		})

	return (
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

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Cadastrar categoria</DialogTitle>
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
					<Button form="create-category-form" type="submit">
						Cadastrar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
