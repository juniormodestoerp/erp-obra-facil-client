import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import {
	BANK_ACCOUNT_QUERY_KEY,
	useBankAccounts,
} from '@app/hooks/bank-accounts/use-bank-accounts'
import { useCreateBankAccount } from '@app/hooks/bank-accounts/use-create-bank-account'
import { useUpdateBankAccountCenter } from '@app/hooks/bank-accounts/use-update-bank-account'
import { bankAccountsService } from '@app/services/bank-accounts'
import { type AppError, parseError } from '@app/services/http-client'
import {
	boolMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'
import { toast } from 'sonner'

const createSchema = z.object({
	accountType: z
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
		.transform((value) => {
			if (value !== null || value !== '') +value
		})
		.nullable()
		.default(null),
	dueDateFirstInvoice: z
		.string(strMessage('data da primeira fatura'))
		.nullable()
		.default(null),
	closingDateInvoice: z
		.string(strMessage('dias antes do fechamento da fatura'))
		.transform((value) => +value)
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
	dueDateDay: z.coerce
		.string(strMessage('dia de vencimento'))
		.transform((value) => {
			if (value !== null || value !== '') value.toString()
		})
		.nullable()
		.default(null),
	dueDateFirstInvoice: z
		.string(strMessage('data da primeira fatura'))
		.nullable()
		.default(null),
	closingDateInvoice: z
		.string(strMessage('dias antes do fechamento da fatura'))
		.transform((value) => +value)
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
	} = useForm<CreateBankAccountFormData>({
		resolver: zodResolver(createSchema),
	})

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
		hookFormSetValueCreate('accountType', '')
		hookFormSetValueCreate('name', '')
		hookFormSetValueCreate('currency', '')
		hookFormSetValueCreate('logo', '')
		hookFormSetValueCreate('limit', 0)
		hookFormSetValueCreate('initialBalance', 0)
		hookFormSetValueCreate('limitType', null)
		hookFormSetValueCreate('dueDateDay', null)
		hookFormSetValueCreate('dueDateFirstInvoice', null)
		hookFormSetValueCreate('closingDateInvoice', null)
		hookFormSetValueCreate('balanceFirstInvoice', null)
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(bankAccount: IBankAccountDTO) {
		setSelectedBankAccount(bankAccount)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', bankAccount.id)
		hookFormSetValueUpdate('accountType', bankAccount.accountType)
		hookFormSetValueUpdate('name', bankAccount.name)
		hookFormSetValueUpdate('currency', bankAccount.currency)
		hookFormSetValueUpdate('logo', bankAccount.logo)
		hookFormSetValueUpdate('limit', bankAccount.limit)
		hookFormSetValueUpdate('limitType', bankAccount.limitType)
		hookFormSetValueUpdate(
			'dueDateDay',
			bankAccount.dueDateDay !== null ? bankAccount.dueDateDay : 0,
		)
		hookFormSetValueUpdate(
			'dueDateFirstInvoice',
			bankAccount.dueDateFirstInvoice,
		)
		hookFormSetValueUpdate('closingDateInvoice', bankAccount.closingDateInvoice)
		hookFormSetValueUpdate(
			'balanceFirstInvoice',
			bankAccount.balanceFirstInvoice,
		)
		hookFormSetValueUpdate('isFirstInvoice', bankAccount.isFirstInvoice)
		hookFormSetValueUpdate('isCreditCard', bankAccount.isCreditCard)
		hookFormSetValueUpdate('initialBalance', bankAccount.initialBalance)
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

	function getDueDate(day: number): string {
		const today = new Date()
		const currentYear = today.getFullYear()
		const currentMonth = today.getMonth()
		let dueDate = new Date(currentYear, currentMonth, day)
		if (dueDate < today) {
			dueDate = new Date(currentYear, currentMonth + 1, day)
		}
		const formattedDay = dueDate.getDate().toString().padStart(2, '0')
		const formattedMonth = (dueDate.getMonth() + 1).toString().padStart(2, '0') // Mês é zero-indexado
		const formattedYear = dueDate.getFullYear()

		return `${formattedDay}/${formattedMonth}/${formattedYear}`
	}

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
			try {
				await createBankAccount({
					accountType,
					name,
					currency,
					logo,
					limit,
					limitType,
					dueDateDay: dueDateDay ? getDueDate(+dueDateDay) : null,
					dueDateFirstInvoice: dueDateFirstInvoice ? dueDateFirstInvoice : null,
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
				console.log(dueDateDay);
				
				await updateBankAccount({
					id,
					accountType,
					name,
					currency,
					logo,
					limit,
					limitType,
					dueDateDay: dueDateDay ? getDueDate(+dueDateDay) : null,
					dueDateFirstInvoice: dueDateFirstInvoice ? dueDateFirstInvoice : null,
					closingDateInvoice,
					balanceFirstInvoice,
					isFirstInvoice,
					isCreditCard,
					initialBalance,
				});
				handleCloseUpdateModal();
			} catch (error) {
				toast.error(parseError(error as AppError));
			}
		},
	);

	function handleSubmitRemove(bankAccount: IBankAccountDTO) {
		bankAccountsService
			.remove({ id: bankAccount.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: BANK_ACCOUNT_QUERY_KEY,
				})
			})
			.catch((error) => {
				console.error('Error removing account:', error)
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

	function extractPath(input: string): string {
		const regex = /\/src\/.*?\.jpg/
		const match = input.match(regex)
		return match ? match[0] : ''
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
		extractPath,
		hookFormSetValueUpdate,
		hookFormSetValueCreate,
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
