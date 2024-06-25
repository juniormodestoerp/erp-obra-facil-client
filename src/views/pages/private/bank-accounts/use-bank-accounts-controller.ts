import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { useCreateBankAccount } from '@app/hooks/bank-accounts/use-create-bank-account'
import {
	BANK_ACCOUNT_QUERY_KEY,
	useBankAccounts,
} from '@app/hooks/bank-accounts/use-bank-accounts'
import { useUpdateBankAccountCenter } from '@app/hooks/bank-accounts/use-update-bank-account'
import { type AppError, parseError } from '@app/services/http-client'
import { bankAccountsService } from '@app/services/bank-accounts'
import {
	boolMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const createSchema = z.object({
	accountType: z
		.string(strMessage('tipo da conta'))
		.min(1, 'O tipo da conta é obrigatório!'),
	name: z
		.string(strMessage('nome da conta'))
		.min(1, 'O nome da conta é obrigatório!'),
	currency: z.string(strMessage('moeda')).min(1, 'A moeda é obrigatória!'),
	logo: z.string(strMessage('logo da conta')).nullable(),
	limit: z.number(numbMessage('limit da conta')).nullable(),
	limitType: z.enum(['FIXED', 'FLEXIBLE']).nullable(),
	dueDateDay: z.number(numbMessage('dia de vencimento')).nullable(),
	dueDateFirstInvoice: z
		.string(strMessage('data da primeira fatura'))
		.nullable(),
	closingDateInvoice: z
		.number(numbMessage('dias antes do fechamento da fatura'))
		.nullable(),
	balanceFirstInvoice: z
		.number(numbMessage('valor da primeira fatura'))
		.nullable(),
	isFirstInvoice: z.boolean(boolMessage('primeira fatura')).nullable(),
	isCreditCard: z.boolean(boolMessage('cartão de crédito')).nullable(),
	initialBalance: z.number(numbMessage('saldo inicial')),
})

type CreateBankAccountFormData = z.infer<typeof updateSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador da conta')),
	accountType: z
		.string(strMessage('tipo da conta'))
		.min(1, 'O tipo da conta é obrigatório!'),
	type: z
		.string(strMessage('tipo da conta'))
		.min(1, 'O tipo da conta é obrigatório!'),
	name: z
		.string(strMessage('nome da conta'))
		.min(1, 'O nome da conta é obrigatório!'),
	currency: z.string(strMessage('moeda')).min(1, 'A moeda é obrigatória!'),
	logo: z.string(strMessage('logo da conta')).nullable(),
	limit: z.number(numbMessage('limit da conta')).nullable(),
	limitType: z.enum(['FIXED', 'FLEXIBLE']).nullable(),
	dueDateDay: z.number(numbMessage('dia de vencimento')).nullable(),
	dueDateFirstInvoice: z
		.string(strMessage('data da primeira fatura'))
		.nullable(),
	closingDateInvoice: z
		.number(numbMessage('dias antes do fechamento da fatura'))
		.nullable(),
	balanceFirstInvoice: z
		.number(numbMessage('valor da primeira fatura'))
		.nullable(),
	isFirstInvoice: z.boolean(boolMessage('primeira fatura')).nullable(),
	isCreditCard: z.boolean(boolMessage('cartão de crédito')).nullable(),
	initialBalance: z.number(numbMessage('saldo inicial')),
})

type UpdateBankAccountFormData = z.infer<typeof updateSchema>

export function useBankAccountsController() {
	const queryClient = useQueryClient()

	const [selectedBankAccount, setSelectedBankAccount] = useState(
		{} as IBankAccountDTO,
	)

	const {
		handleSubmit: hookFormHandleSubmitCreate,
		register: hookFormRegisterCreate,
		setValue: hookFormSetValueCreate,
		control: hookFormControlCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<UpdateBankAccountFormData>({
		resolver: zodResolver(createSchema),
	})

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		control: hookFormControlUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdateBankAccountFormData>({
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
	function handleOpenUpdateModal(bankAccount: IBankAccountDTO) {
		setSelectedBankAccount(bankAccount)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', bankAccount.id)
		hookFormSetValueUpdate('name', bankAccount.name)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(bankAccount: IBankAccountDTO) {
		setSelectedBankAccount(bankAccount)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { bankAccounts } = useBankAccounts()
	const { createBankAccount } = useCreateBankAccount()
	const { updateBankAccount } = useUpdateBankAccountCenter()

	const handleSubmit = hookFormHandleSubmitCreate(
		async ({
			name,
			currency,
			logo,
			limit,
			limitType,
			dueDateDay,
			dueDateFirstInvoice,
			closingDateInvoice,
			balanceFirstInvoice,
			isFirstInvoice,
			isCreditCard,
			initialBalance,
		}: CreateBankAccountFormData) => {
			try {
				await createBankAccount({
					accountType,
					name,
					currency,
					logo,
					limit,
					limitType,
					dueDateDay,
					dueDateFirstInvoice,
					closingDateInvoice,
					balanceFirstInvoice,
					isFirstInvoice,
					isCreditCard,
					initialBalance,
				})
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async ({ id, name }: UpdateBankAccountFormData) => {
			try {
				await updateBankAccount({ id, name })
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(bankAccount: IBankAccountDTO) {
		bankAccountsService
			.remove({ id: bankAccount.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: BANK_ACCOUNT_QUERY_KEY,
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
				if (
					error.response.data.message ===
					'O método de pagamento solicitado não foi encontrado.'
				) {
					queryClient.setQueryData<IBankAccountDTO[]>(
						BANK_ACCOUNT_QUERY_KEY,
						() => [],
					)
				}
			})
	}

	return {
		bankAccounts,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedBankAccount,
		hookFormErrorsCreate,
		hookFormErrorsUpdate,
		hookFormControlCreate,
		hookFormControlUpdate,
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
