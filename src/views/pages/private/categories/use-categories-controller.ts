import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { ICategoryDTO } from '@app/dtos/category-dto'
import {
	CATEGORY_QUERY_KEY,
	useCategories,
} from '@app/hooks/categories/use-categories'
import { useCreateCategory } from '@app/hooks/categories/use-create-category'
import { useUpdateCategoryCenter } from '@app/hooks/categories/use-update-category'
import { categoriesService } from '@app/services/categories'
import { type AppError, parseError } from '@app/services/http-client'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

export enum ICategoryType {
	EXPENSE = 'EXPENSE',
	INCOME = 'INCOME',
}

const createSchema = z.object({
	type: z.nativeEnum(ICategoryType),
	name: z
		.string(strMessage('nome da categoria'))
		.min(1, 'A categoria é obrigatória!'),
	subcategoryOf: z
		.string(strMessage('subcategoria de'))
		.nullable()
		.default(null),
})

type CreateCategoryFormData = z.infer<typeof createSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador da categoria')),
	type: z.nativeEnum(ICategoryType),
	name: z
		.string(strMessage('nome da categoria'))
		.min(1, 'A categoria é obrigatória!'),
	subcategoryOf: z
		.string(strMessage('subcategoria de'))
		.nullable()
		.default(null),
})

type UpdateCategoryFormData = z.infer<typeof updateSchema>

export function useCategoriesController() {
	const queryClient = useQueryClient()

	const [selectedCategory, setSelectedCategory] = useState({} as ICategoryDTO)
	const [selectedModelOption, setSelectedModelOption] = useState('CATEGORY')
	const [selectedTypeOption, setSelectedTypeOption] = useState<ICategoryType>(
		ICategoryType.INCOME,
	)

	const {
		handleSubmit: hookFormHandleSubmitCreate,
		register: hookFormRegisterCreate,
		setValue: hookFormSetValueCreate,
		control: hookFormControlCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<CreateCategoryFormData>({
		resolver: zodResolver(createSchema),
	})

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		control: hookFormControlUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdateCategoryFormData>({
		resolver: zodResolver(updateSchema),
	})

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	function handleOpenCreateModal() {
		hookFormSetValueCreate('name', '')
		hookFormSetValueCreate('subcategoryOf', '')
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(category: ICategoryDTO) {
		setSelectedCategory(category)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', category.id)
		hookFormSetValueUpdate('type', category.type as ICategoryType)
		hookFormSetValueUpdate('name', category.name)
		hookFormSetValueUpdate('subcategoryOf', category.subcategoryOf)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(category: ICategoryDTO) {
		setSelectedCategory(category)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { categories } = useCategories()
	const { createCategory } = useCreateCategory()
	const { updateCategory } = useUpdateCategoryCenter()

	const handleSubmit = hookFormHandleSubmitCreate(
		async ({ type, name, subcategoryOf }: CreateCategoryFormData) => {
			try {
				await createCategory({ type, name, subcategoryOf })
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async ({ id, type, name, subcategoryOf }: UpdateCategoryFormData) => {
			try {
				await updateCategory({ id, type, name, subcategoryOf })
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(category: ICategoryDTO) {
		categoriesService
			.remove({ id: category.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: CATEGORY_QUERY_KEY,
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
				if (
					error.response.data.message ===
					'A categoria solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ICategoryDTO[]>(CATEGORY_QUERY_KEY, () => [])
				}
			})
	}

	function organizeIncomeCategories(categories: ICategoryDTO[]) {
		if (!categories) {
			return []
		}

		const organized = categories
			.filter(
				(category) =>
					category.type === 'INCOME' && category.subcategoryOf === '',
			)
			.flatMap((category) => {
				const subcategories = categories.filter(
					(sub) => sub.subcategoryOf === category.name,
				)

				return [category, ...subcategories]
			})

		return organized
	}

	function organizeExpenseCategories(categories: ICategoryDTO[]) {
		if (!categories) {
			return []
		}

		const organized = categories
			.filter(
				(category) =>
					category.type === 'EXPENSE' && category.subcategoryOf === '',
			)
			.flatMap((category) => {
				const subcategories = categories.filter(
					(sub) => sub.subcategoryOf === category.name,
				)

				return [category, ...subcategories]
			})

		return organized
	}

	const organizedIncomeCategories = organizeIncomeCategories(categories ?? [])
	const organizedExpenseCategories = organizeExpenseCategories(categories ?? [])

	const modelOptions = [
		{ id: 'CATEGORY', label: 'Categoria' },
		{ id: 'SUBCATEGORY', label: 'Subcategoria' },
	]
	const typeOptions = [
		{ id: 'INCOME', label: 'Receita' },
		{ id: 'EXPENSE', label: 'Despesa' },
	]

	useEffect(() => {
		if (selectedModelOption === 'CATEGORY') {
			if (isCreateModalOpen) {
				hookFormSetValueCreate('name', '')
				hookFormSetValueCreate('subcategoryOf', '')
			}

			if (isUpdateModalOpen) {
				hookFormSetValueUpdate('name', '')
				hookFormSetValueUpdate('subcategoryOf', '')
			}
		}
	}, [
		selectedModelOption,
		hookFormSetValueCreate,
		hookFormSetValueUpdate,
		isCreateModalOpen,
		isUpdateModalOpen,
	])

	function handleModelCheckboxChange(model: string) {
		setSelectedModelOption(model)
		if (model === 'CATEGORY') {
			if (isCreateModalOpen) {
				hookFormSetValueCreate('name', '')
			}

			if (isUpdateModalOpen) {
				hookFormSetValueUpdate('name', '')
			}
		}
	}

	function handleTypeCheckboxChange(type: ICategoryType) {
		setSelectedTypeOption(type)
		if (isCreateModalOpen) {
			hookFormSetValueCreate('type', type)
		}

		if (isUpdateModalOpen) {
			hookFormSetValueUpdate('type', type)
		}
	}

	const transformedCategories = categories
		?.filter((category) => category.subcategoryOf === '')
		.map((category) => {
			return {
				field: category.name,
				value: category.name,
			}
		})

	return {
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
	}
}
