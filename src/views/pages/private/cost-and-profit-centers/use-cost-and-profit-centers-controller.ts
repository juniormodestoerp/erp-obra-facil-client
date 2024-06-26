import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { ICostAndProfitCentersDTO } from '@app/dtos/cost-and-profit-center-dto'
import {
	COST_AND_PROFIT_CENTERS_QUERY_KEY,
	useCostAndProfitCenters,
} from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { useCreateCostAndProfitCenter } from '@app/hooks/cost-and-profit-centers/use-create-cost-and-profit-center'
import { useUpdateCostAndProfitCenter } from '@app/hooks/cost-and-profit-centers/use-update-cost-and-profit-center'
import { costAndProfitCentersService } from '@app/services/cost-and-profit-centers'
import { type AppError, parseError } from '@app/services/http-client'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const createSchema = z.object({
	name: z
		.string(strMessage('nome do centro de custo'))
		.min(1, 'O centro de custo é obrigatório!'),
})

type CreateCostAndProfitCenterFormData = z.infer<typeof updateSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador do centro de custo')),
	name: z
		.string(strMessage('nome do centro de custo'))
		.min(1, 'O centro de custo é obrigatório!'),
})

type UpdateCostAndProfitCenterFormData = z.infer<typeof updateSchema>

export function useCostAndProfitCentersController() {
	const queryClient = useQueryClient()

	const [selectedCostAndProfitCenter, setSelectedCostAndProfitCenter] =
		useState({} as ICostAndProfitCentersDTO)

	const {
		handleSubmit: hookFormHandleSubmitCreate,
		register: hookFormRegisterCreate,
		setValue: hookFormSetValueCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<UpdateCostAndProfitCenterFormData>({
		resolver: zodResolver(createSchema),
	})

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdateCostAndProfitCenterFormData>({
		resolver: zodResolver(updateSchema),
	})

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	function handleOpenCreateModal() {
		hookFormSetValueCreate('name', '')
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(
		costAndProfitCenter: ICostAndProfitCentersDTO,
	) {
		setSelectedCostAndProfitCenter(costAndProfitCenter)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', costAndProfitCenter.id)
		hookFormSetValueUpdate('name', costAndProfitCenter.name)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(
		costAndProfitCenter: ICostAndProfitCentersDTO,
	) {
		setSelectedCostAndProfitCenter(costAndProfitCenter)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { costAndProfitCenters } = useCostAndProfitCenters()
	const { createCostAndProfitCenter } = useCreateCostAndProfitCenter()
	const { updateCostAndProfitCenter } = useUpdateCostAndProfitCenter()

	const handleSubmit = hookFormHandleSubmitCreate(
		async ({ name }: CreateCostAndProfitCenterFormData) => {
			try {
				await createCostAndProfitCenter({ name })
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async ({ id, name }: UpdateCostAndProfitCenterFormData) => {
			try {
				await updateCostAndProfitCenter({ id, name })
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(costAndProfitCenter: ICostAndProfitCentersDTO) {
		costAndProfitCentersService
			.remove({ id: costAndProfitCenter.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: COST_AND_PROFIT_CENTERS_QUERY_KEY,
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
				if (
					error.response.data.message ===
					'O centro de custo solicitado não foi encontrado.'
				) {
					queryClient.setQueryData<ICostAndProfitCentersDTO[]>(
						COST_AND_PROFIT_CENTERS_QUERY_KEY,
						() => [],
					)
				}
			})
	}

	return {
		costAndProfitCenters,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedCostAndProfitCenter,
		hookFormErrorsCreate,
		hookFormErrorsUpdate,
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
