import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { categoriesService } from '@app/services/categories'
import { strMessage } from '@app/utils/custom-zod-error'

export type TabProps = 'Receitas' | 'Despesas'

const schema = z.object({
	categoryName: z
		.string(strMessage('nome da categoria'))
		.min(1, 'O nome da categoria é obrigatório!'),
	subcategoryName: z.string(strMessage('nome da subcategoria')).optional(),
	type: z.string(strMessage('tipo')).min(1, 'O tipo é obrigatório!'),
	model: z.string(strMessage('modelo')).min(1, 'O modelo é obrigatório!'),
})

type FormData = z.infer<typeof schema>

export function useCategoriesController() {
	const queryClient = useQueryClient()

	const [currentTab, setCurrentTab] = useState<TabProps>('Receitas')

	const { data: response } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoriesService.fetch({ pageIndex: 1 }),
	})

	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { mutateAsync: createCategory } = useMutation({
		mutationFn: async (formData: FormData) => {
			return categoriesService.create(formData)
		},
		onSuccess(newCategory) {
			queryClient.setQueryData(['categories'], (oldData: any) => {
				return {
					...oldData,
					categories: [...(oldData?.categories || []), newCategory],
				}
			})
		},
	})

	const handleSubmit = methods.handleSubmit(async (data: FormData) => {
		await createCategory(data)
	})

	function handleRemoveCategory(id: string) {
		categoriesService.remove({ id }).then(() => {
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			})
		})
	}

	return {
		methods,
		currentTab,
		categories: response?.categories,
		handleSubmit,
		setCurrentTab,
		handleRemoveCategory,
	}
}
