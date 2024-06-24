import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { categoriesService } from '@app/services/categories';
import { strMessage } from '@app/utils/custom-zod-error';
import { toast } from 'sonner';
import { parseError } from '@app/services/http-client';
import type { ICategory } from '@app/services/categories/fetch';

export type TabProps = 'Receitas' | 'Despesas';

const schema = z.object({
	type: z.string(strMessage('tipo')).min(1, 'O tipo é obrigatório!'),
	name: z
		.string(strMessage('nome da categoria'))
		.min(1, 'O nome da categoria é obrigatório!'),
	subcategoryOf: z.string(strMessage('subcategoria da categoria')),
});

type FormData = z.infer<typeof schema>;

export function useCategoriesController() {
	const queryClient = useQueryClient();

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [, setUpdateCategoryId] = useState('');

	const [currentTab, setCurrentTab] = useState<TabProps>('Receitas');

	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen);
	}
	function handleOpenCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen);
	}

	const { data: categories, refetch } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => await categoriesService.fetch(),
	});

	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync: createCategory } = useMutation({
		mutationFn: async (formData: FormData) => {
			return categoriesService.create(formData);
		},
		onSuccess(newCategory) {
			queryClient.setQueryData(['categories'], (oldData: any) => {
				return {
					...oldData,
					categories: [...(oldData?.categories || []), newCategory],
				};
			});
			refetch();
			toast.success(
				`${newCategory.subcategoryOf === null ? 'Categoria' : 'Subcategoria'} ${newCategory.name.toLowerCase()} criada com sucesso!`,
			);
			handleCloseCreateModal();
		},
		onError(err) {
			toast.error(parseError(err));
		},
	});

	const { mutateAsync: updateCategory } = useMutation({
		mutationFn: async (formData: FormData) => {
			return categoriesService.save(formData);
		},
		onSuccess(updatedCategory) {
			queryClient.setQueryData(['categories'], (oldData: any) => {
				const updatedCategories = oldData?.categories.map((cat: ICategory) =>
					cat.id === updatedCategory.id ? updatedCategory : cat,
				);
				return {
					...oldData,
					categories: updatedCategories,
				};
			});
			refetch();
			toast.success(
				`${updatedCategory.subcategoryOf === null ? 'Categoria' : 'Subcategoria'} ${updatedCategory.name.toLowerCase()} atualizada com sucesso!`,
			);
			// handleCloseCreateModal();
		},
		onError(err) {
			toast.error(parseError(err));
		},
	});

	const handleSubmit = methods.handleSubmit(async (data: FormData) => {
		await createCategory(data);
	});

	const handleSubmitUpdate = methods.handleSubmit(async (data: FormData) => {

		await updateCategory(data);
	});

	function handleRemoveCategory(id: string) {
		categoriesService.remove({ id }).then(() => {
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			});
		});
	}

	return {
		methods,
		currentTab,
		categories: categories?.categories || [],
		isCreateModalOpen,
		setUpdateCategoryId,
		handleSubmitUpdate,
		handleCloseCreateModal,
		handleOpenCreateModal,
		handleSubmit,
		setCurrentTab,
		handleRemoveCategory,
	};
}
