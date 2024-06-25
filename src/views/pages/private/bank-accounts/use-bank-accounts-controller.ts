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
import { Format } from '@app/utils/format'

const createSchema = z.object({
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
	logo: z.string(strMessage('logo da conta')).nullable().default(null),
	limit: z
		.union([
			z.string(strMessage('limit da conta')),
			z.number(numbMessage('limit da conta')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	limitType: z.enum(['Total', 'Mensal']).nullable().default(null),
	dueDateDay: z
		.string(strMessage('dia de vencimento'))
		.nullable()
		.default(null),
	dueDateFirstInvoice: z
		.string(strMessage('data da primeira fatura'))
		.nullable()
		.default(null),
	closingDateInvoice: z
		.union([
			z.string(strMessage('dias antes do fechamento da fatura')),
			z.number(numbMessage('dias antes do fechamento da fatura')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	balanceFirstInvoice: z
		.union([
			z.string(strMessage('saldo inicial')),
			z.number(numbMessage('saldo inicial')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	isFirstInvoice: z
		.boolean(boolMessage('primeira fatura'))
		.nullable()
		.default(null),
	isCreditCard: z
		.boolean(boolMessage('cartão de crédito'))
		.nullable()
		.default(null),
	initialBalance: z
		.union([
			z.string(strMessage('saldo inicial')),
			z.number(numbMessage('saldo inicial')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		}),
})

type CreateBankAccountFormData = z.infer<typeof createSchema>

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
	logo: z.string(strMessage('logo da conta')).nullable().default(null),
	limit: z
		.union([
			z.string(strMessage('limit da conta')),
			z.number(numbMessage('limit da conta')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	limitType: z.enum(['Total', 'Mensal']).nullable().default(null),
	dueDateDay: z
		.string(strMessage('dia de vencimento'))
		.nullable()
		.default(null),
	dueDateFirstInvoice: z
		.string(strMessage('data da primeira fatura'))
		.nullable()
		.default(null),
	closingDateInvoice: z
		.union([
			z.string(strMessage('dias antes do fechamento da fatura')),
			z.number(numbMessage('dias antes do fechamento da fatura')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	balanceFirstInvoice: z
		.union([
			z.string(strMessage('saldo inicial')),
			z.number(numbMessage('saldo inicial')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	isFirstInvoice: z
		.boolean(boolMessage('primeira fatura'))
		.nullable()
		.default(null),
	isCreditCard: z
		.boolean(boolMessage('cartão de crédito'))
		.nullable()
		.default(null),
	initialBalance: z
		.union([
			z.string(strMessage('saldo inicial')),
			z.number(numbMessage('saldo inicial')),
		])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		}),
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
		watch: hookFormWatchCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<UpdateBankAccountFormData>({
		resolver: zodResolver(createSchema),
	})

	console.log(hookFormWatchCreate('accountType'))

	const isCreateCreditCard =
		hookFormWatchCreate('accountType') === 'Cartão de crédito'

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		control: hookFormControlUpdate,
		watch: hookFormWatchUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdateBankAccountFormData>({
		resolver: zodResolver(updateSchema),
	})

	const isUpdateCreditCard =
		hookFormWatchUpdate('accountType') === 'Cartão de crédito'

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
		}: CreateBankAccountFormData) => {
			console.log('data submit', {
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
		async ({
			id,
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
		}: UpdateBankAccountFormData) => {
			try {
				await updateBankAccount({
					id,
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
					'A conta solicitada não foi encontrada.'
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
		isCreateCreditCard,
		isUpdateCreditCard,
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
