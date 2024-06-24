import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCostAndProfitCenters } from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { useCreateCostAndProfitCenter } from '@app/hooks/cost-and-profit-centers/use-create-cost-and-profit-center'
import { useUpdateCostAndProfitCenter } from '@app/hooks/cost-and-profit-centers/use-update-cost-and-profit-center'
import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'
import { type AppError, parseError } from '@app/services/http-client'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const schema = z.object({
	id: z.string(strMessage('identificador do centro de custo')).optional(),
	name: z
		.string(strMessage('nome do centro de custo'))
		.min(1, 'O centro de custo é obrigatório!'),
})

type FormData = z.infer<typeof schema>

export function useCostAndProfitCentersController() {
	const queryClient = useQueryClient()

	const [selectedCostAndProfitCenter, setSelectedCostAndProfitCenter] =
		useState({} as ICostAndProfitCenter)

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	function handleOpenCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(costAndProfitCenter: ICostAndProfitCenter) {
		setSelectedCostAndProfitCenter(costAndProfitCenter)
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(costAndProfitCenter: ICostAndProfitCenter) {
		setSelectedCostAndProfitCenter(costAndProfitCenter)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { costAndProfitCenters, refetch } = useCostAndProfitCenters()

	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { createCostAndProfitCenter } = useCreateCostAndProfitCenter()
	const { updateCostAndProfitCenter } = useUpdateCostAndProfitCenter()

	const handleSubmit = methods.handleSubmit(async ({ name }: FormData) => {
		try {
			const { name: costAndProfitCenterName } = await createCostAndProfitCenter(
				{
					name,
				},
			)
			toast.success(
				`Centro de custo ${costAndProfitCenterName.toLowerCase()} criado com sucesso!`,
			)
			refetch()
			handleCloseCreateModal()
		} catch (error) {
			toast.error(parseError(error as AppError))
		}
	})

	const handleSubmitUpdate = methods.handleSubmit(
		async ({ id, name }: FormData) => {
			if (!id || !selectedCostAndProfitCenter) {
				return
			}

			try {
				await updateCostAndProfitCenter({ id, name })
				refetch()
				setIsUpdateModalOpen(false)
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(costAndProfitCenter: ICostAndProfitCenter) {
		costAndProfitCentersService
			.remove({ id: costAndProfitCenter.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: ['costAndProfitCenters'],
				})
				refetch().then((result) => {
					if (result.status === 'success') {
						toast.success(
							`Centro de custo ${costAndProfitCenter.name.toLowerCase()} removido com sucesso!`,
						)
					}

					if (
						result.error?.response.data.message ===
						'O centro de custo solicitado não foi encontrado.'
					) {
						queryClient.setQueryData(['costAndProfitCenters'], [])
						window.location.reload()
					}
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
			})
	}

	return {
		methods,
		costAndProfitCenters,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedCostAndProfitCenter,
		setIsUpdateModalOpen,
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
