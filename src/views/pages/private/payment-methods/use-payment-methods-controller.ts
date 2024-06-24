import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreatePaymentMethod } from '@app/hooks/payment-methods/use-create-payment-method'
import { usePaymentMethods } from '@app/hooks/payment-methods/use-payment-methods'
import { useUpdateIPaymentMethodCenter } from '@app/hooks/payment-methods/use-update-payment-method'
import { type AppError, parseError } from '@app/services/http-client'
import { paymentMethodsService } from '@app/services/payment-methods'
import type { IPaymentMethod } from '@app/services/payment-methods/fetch'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const schema = z.object({
	id: z.string(strMessage('identificador do método de pagamento')).optional(),
	name: z
		.string(strMessage('nome do método de pagamento'))
		.min(1, 'O método de pagamento é obrigatório!'),
})

type FormData = z.infer<typeof schema>

export function usePaymentMethodsController() {
	const queryClient = useQueryClient()

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		{} as IPaymentMethod,
	)

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	function handleOpenCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(paymentMethod: IPaymentMethod) {
		setSelectedPaymentMethod(paymentMethod)
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(paymentMethod: IPaymentMethod) {
		setSelectedPaymentMethod(paymentMethod)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { paymentMethods, refetch } = usePaymentMethods()

	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { createPaymentMethod } = useCreatePaymentMethod()
	const { updatePaymentMethod } = useUpdateIPaymentMethodCenter()

	const handleSubmit = methods.handleSubmit(async ({ name }: FormData) => {
		try {
			const { name: paymentMethodName } = await createPaymentMethod({
				name,
			})
			toast.success(
				`Método de pagamento ${paymentMethodName.toLowerCase()} criado com sucesso!`,
			)
			refetch()
			handleCloseCreateModal()
		} catch (error) {
			toast.error(parseError(error as AppError))
		}
	})

	const handleSubmitUpdate = methods.handleSubmit(
		async ({ id, name }: FormData) => {
			if (!id || !selectedPaymentMethod) {
				return
			}

			try {
				await updatePaymentMethod({ id, name })
				refetch()
				setIsUpdateModalOpen(false)
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(paymentMethod: IPaymentMethod) {
		paymentMethodsService
			.remove({ id: paymentMethod.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: ['paymentMethods'],
				})
				refetch().then((result) => {
					if (result.status === 'success') {
						toast.success(
							`Método de pagamento ${paymentMethod.name.toLowerCase()} removido com sucesso!`,
						)
					}

					if (
						result.error?.response.data.message ===
						'O método de pagamento solicitado não foi encontrado.'
					) {
						queryClient.setQueryData(['paymentMethods'], [])
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
		paymentMethods,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedPaymentMethod,
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
