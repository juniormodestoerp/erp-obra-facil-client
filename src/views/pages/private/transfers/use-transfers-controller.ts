import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { ITransferDTO } from '@app/dtos/transfer-dto'
import { useCreateTransfer } from '@app/hooks/transfers/use-create-transfer'
import {
	TRANSFER_QUERY_KEY,
	useTransfers,
} from '@app/hooks/transfers/use-transfers'
import { useUpdateTransferCenter } from '@app/hooks/transfers/use-update-transfer'
import { type AppError, parseError } from '@app/services/http-client'
import { transfersService } from '@app/services/transfers'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const createSchema = z.object({
	name: z
		.string(strMessage('nome do tipo de transferência'))
		.min(1, 'O tipo de transferência é obrigatório!'),
})

type CreateTransferFormData = z.infer<typeof updateSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador do tipo de transferência')),
	name: z
		.string(strMessage('nome do tipo de transferência'))
		.min(1, 'O tipo de transferência é obrigatório!'),
})

type UpdateTransferFormData = z.infer<typeof updateSchema>

export function useTransfersController() {
	const queryClient = useQueryClient()

	const [selectedTransfer, setSelectedTransfer] = useState({} as ITransferDTO)

	const {
		handleSubmit: hookFormHandleSubmitCreate,
		register: hookFormRegisterCreate,
		setValue: hookFormSetValueCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<UpdateTransferFormData>({
		resolver: zodResolver(createSchema),
	})

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdateTransferFormData>({
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
	function handleOpenUpdateModal(transfer: ITransferDTO) {
		setSelectedTransfer(transfer)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', transfer.id)
		hookFormSetValueUpdate('name', transfer.name)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(transfer: ITransferDTO) {
		setSelectedTransfer(transfer)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { transfers } = useTransfers()
	const { createTransfer } = useCreateTransfer()
	const { updateTransfer } = useUpdateTransferCenter()

	const handleSubmit = hookFormHandleSubmitCreate(
		async ({ name }: CreateTransferFormData) => {
			try {
				await createTransfer({ name })
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async ({ id, name }: UpdateTransferFormData) => {
			try {
				await updateTransfer({ id, name })
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(transfer: ITransferDTO) {
		transfersService
			.remove({ id: transfer.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: TRANSFER_QUERY_KEY,
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
				if (
					error.response.data.message ===
					'A transferência solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ITransferDTO[]>(TRANSFER_QUERY_KEY, () => [])
				}
			})
	}

	return {
		transfers,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedTransfer,
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
