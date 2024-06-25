import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { useCreatePaymentMethod } from '@app/hooks/payment-methods/use-create-payment-method'
import {
	PAYMENT_METHOD_QUERY_KEY,
	usePaymentMethods,
} from '@app/hooks/payment-methods/use-payment-methods'
import { useUpdatePaymentMethodCenter } from '@app/hooks/payment-methods/use-update-payment-method'
import { type AppError, parseError } from '@app/services/http-client'
import { paymentMethodsService } from '@app/services/payment-methods'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const createSchema = z.object({
	name: z
		.string(strMessage('nome do método de pagamento'))
		.min(1, 'O método de pagamento é obrigatório!'),
})

type CreatePaymentMethodFormData = z.infer<typeof updateSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador do método de pagamento')),
	name: z
		.string(strMessage('nome do método de pagamento'))
		.min(1, 'O método de pagamento é obrigatório!'),
})

type UpdatePaymentMethodFormData = z.infer<typeof updateSchema>

export function usePaymentMethodsController() {
	const queryClient = useQueryClient()

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		{} as IPaymentMethodDTO,
	)

	const {
		handleSubmit: hookFormHandleSubmitCreate,
		register: hookFormRegisterCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<UpdatePaymentMethodFormData>({
		resolver: zodResolver(createSchema),
	})

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdatePaymentMethodFormData>({
		resolver: zodResolver(updateSchema),
	})

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	function handleOpenCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(paymentMethod: IPaymentMethodDTO) {
		setSelectedPaymentMethod(paymentMethod)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', paymentMethod.id)
		hookFormSetValueUpdate('name', paymentMethod.name)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(paymentMethod: IPaymentMethodDTO) {
		setSelectedPaymentMethod(paymentMethod)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { paymentMethods } = usePaymentMethods()
	const { createPaymentMethod } = useCreatePaymentMethod()
	const { updatePaymentMethod } = useUpdatePaymentMethodCenter()

	const handleSubmit = hookFormHandleSubmitCreate(
		async ({ name }: CreatePaymentMethodFormData) => {
			try {
				await createPaymentMethod({ name })
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async ({ id, name }: UpdatePaymentMethodFormData) => {
			try {
				await updatePaymentMethod({ id, name })
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(paymentMethod: IPaymentMethodDTO) {
		paymentMethodsService
			.remove({ id: paymentMethod.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: PAYMENT_METHOD_QUERY_KEY,
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
			})
	}

	return {
		paymentMethods,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedPaymentMethod,
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
