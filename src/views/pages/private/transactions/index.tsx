import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import { cn } from '@app/utils/cn'
import { ArrowUpOnSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import { flexRender, type Column } from '@tanstack/react-table'
import { Input } from '@views/components/input'
import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@views/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@views/components/ui/dropdown-menu'
import { Input as RdxInput } from '@views/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@views/components/ui/table'
import { ChevronDownIcon } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { getColumnName } from '../conciliations/components/get-column-name'
import { PaginationControls } from '../conciliations/components/pagination-controls'
import { z } from 'zod'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	TRANSACTION_QUERY_KEY,
	useTransactions,
} from '@app/hooks/transactions/use-transactions'
import { useCreateTransaction } from '@app/hooks/transactions/use-create-transaction'
import { useSettings } from '@app/hooks/settings/use-settings'
import { toast } from 'sonner'
import { type AppError, parseError } from '@app/services/http-client'
import { useUpdateTransaction } from '@app/hooks/transactions/use-update-transaction'
import { useQueryClient } from '@tanstack/react-query'
import { transactionsService } from '@app/services/transactions'
import * as XLSX from 'xlsx'
import {
	type SortingState,
	type VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { useSidebar } from '@app/hooks/use-sidebar'
import { useCategories } from '@app/hooks/categories/use-categories'
import { useBankAccounts } from '@app/hooks/bank-accounts/use-bank-accounts'
import { useCostAndProfitCenters } from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { usePaymentMethods } from '@app/hooks/payment-methods/use-payment-methods'
import { Select } from '@views/components/select'
import { Controller } from 'react-hook-form'
import { InputCurrency } from '@views/components/input/currency'
import { DatePicker } from '@views/components/ui/date-picker'
// import { useTags } from '@app/hooks/tags/use-tags'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { ColumnDef, Row } from '@tanstack/react-table'

import {
	EyeIcon,
	PencilSquareIcon,
	TrashIcon,
} from '@heroicons/react/24/outline'

import { ArrowUpDown } from 'lucide-react'

type IGetFieldInfo = { isRequired: boolean; isEnabled: boolean } | null

interface PropsActionMenu {
	row: Row<ITransactionDTO>
}

const createSchema = z.object({
	type: z.string(strMessage('tipo')),
	date: z.coerce.string(dateMessage('data')),
	amount: z
		.union([z.string(strMessage('valor')), z.number(numbMessage('valor'))])
		.transform((value: string | number) => Format.cleanCurrency(value)),
	description: z.string(strMessage('descrição')),
	account: z.string(strMessage('conta')),
	status: z.string(strMessage('status')),
	category: z.string(strMessage('categoria')),
	card: z.string(strMessage('cartão')).nullable().default(null),
	contact: z.string(strMessage('contato')).nullable().default(null),
	center: z.string(strMessage('centro')).nullable().default(null),
	project: z.string(strMessage('projeto')).nullable().default(null),
	method: z.string(strMessage('forma')).nullable().default(null),
	documentNumber: z.string(strMessage('nº documento')).nullable().default(null),
	notes: z.string(strMessage('observações')).nullable().default(null),
	competenceDate: z.coerce
		.string(dateMessage('data competência'))
		.nullable()
		.default(null),
	tags: z.string(strMessage('tags')).nullable().default(null),
})

export type CreateTransactionFormData = z.infer<typeof createSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador da categoria')),
	type: z.string(strMessage('tipo')),
	date: z.coerce.date(dateMessage('data')),
	amount: z
		.union([z.string(strMessage('valor')), z.number(numbMessage('valor'))])
		.transform((value: string | number) => Format.cleanCurrency(value)),
	description: z.string(strMessage('descrição')),
	account: z.string(strMessage('conta')),
	status: z.string(strMessage('status')),
	category: z.string(strMessage('categoria')),
	card: z.string(strMessage('cartão')).nullable().default(null),
	contact: z.string(strMessage('contato')).nullable().default(null),
	center: z.string(strMessage('centro')).nullable().default(null),
	project: z.string(strMessage('projeto')).nullable().default(null),
	method: z.string(strMessage('forma')).nullable().default(null),
	documentNumber: z.string(strMessage('nº documento')).nullable().default(null),
	notes: z.string(strMessage('observações')).nullable().default(null),
	competenceDate: z.coerce
		.date(dateMessage('data competência'))
		.nullable()
		.default(null),
	tags: z.string(strMessage('tags')).nullable().default(null),
})

export type UpdateTransactionFormData = z.infer<typeof updateSchema>

export function Transactions() {
	const queryClient = useQueryClient()

	/**
	 * INÍCIO USE STATES
	 */
	const [selectedTransaction, setSelectedTransaction] =
		useState<ITransactionDTO>({} as ITransactionDTO)
	const [isViewModalOpen, setIsViewModalOpen] = useState(false)
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	/**
	 * FIM USE STATES
	 */

	/* ===============================================================® */

	/**
	 * INÍCIO HOOKFORM
	 */
	const createMethods = useForm<CreateTransactionFormData>({
		resolver: zodResolver(createSchema),
	})
	const {
		handleSubmit: hookFormHandleSubmitCreate,
		control: hookFormControlCreate,
		setValue: hookFormSetValueCreate,
		formState: { errors: hookFormErrosCreate },
		register: hookFormRegisterCreate,
	} = createMethods

	const updateMethods = useForm<UpdateTransactionFormData>({
		resolver: zodResolver(updateSchema),
	})
	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		control: hookFormControlUpdate,
		setValue: hookFormSetValueUpdate,
		formState: { errors: hookFormErrosUpdate },
		register: hookFormRegisterUpdate,
	} = updateMethods

	/**
	 * FIM HOOKFORM
	 */

	/* ===============================================================® */

	/**
	 * INÍCIO MODAIS
	 */
	function handleOpenCreateModal() {
		hookFormSetValueCreate('type', '')
		hookFormSetValueCreate('date', new Date().toISOString())
		hookFormSetValueCreate('amount', 0)
		hookFormSetValueCreate('description', '')
		hookFormSetValueCreate('account', '')
		hookFormSetValueCreate('status', '')
		hookFormSetValueCreate('category', '')
		hookFormSetValueCreate('card', '')
		hookFormSetValueCreate('contact', '')
		hookFormSetValueCreate('center', '')
		hookFormSetValueCreate('project', '')
		hookFormSetValueCreate('method', '')
		hookFormSetValueCreate('documentNumber', '')
		hookFormSetValueCreate('notes', '')
		hookFormSetValueCreate('competenceDate', new Date().toISOString())
		hookFormSetValueCreate('tags', '')
		setIsCreateModalOpen(true)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(false)
	}
	function handleOpenUpdateModal(transaction: ITransactionDTO) {
		hookFormSetValueUpdate('id', transaction.id)
		hookFormSetValueUpdate('type', transaction.type)
		hookFormSetValueUpdate('date', transaction.date)
		hookFormSetValueUpdate('amount', transaction.amount)
		hookFormSetValueUpdate('description', transaction.description)
		hookFormSetValueUpdate('account', transaction.account)
		hookFormSetValueUpdate('status', transaction.status)
		hookFormSetValueUpdate('category', transaction.category)
		hookFormSetValueUpdate('card', transaction.card)
		hookFormSetValueUpdate('contact', transaction.contact)
		hookFormSetValueUpdate('center', transaction.center)
		hookFormSetValueUpdate('project', transaction.project)
		hookFormSetValueUpdate('method', transaction.method)
		hookFormSetValueUpdate('documentNumber', transaction.documentNumber)
		hookFormSetValueUpdate('notes', transaction.notes)
		hookFormSetValueUpdate('competenceDate', transaction.competenceDate)
		hookFormSetValueUpdate('tags', '')
		setIsUpdateModalOpen(true)
	}
	function handleCloseUpdateModal() {
		setIsViewModalOpen(false)
		setIsUpdateModalOpen(false)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(false)
	}
	/**
	 * FIM MODAIS
	 */

	/* ===============================================================® */

	/**
	 * INÍCIO ACTIONS LOGIC
	 */
	const { transactions } = useTransactions()
	const { createTransaction } = useCreateTransaction()
	const { updateTransaction } = useUpdateTransaction()
	const { settings } = useSettings()

	function getFieldInfo(fieldName: string): IGetFieldInfo {
		const setting = settings.find((setting) => setting.fieldName === fieldName)
		const { isFieldRequired, isFieldEnable } = setting ?? {
			isFieldRequired: false,
			isFieldEnable: false,
		}
		return setting
			? { isRequired: isFieldRequired, isEnabled: isFieldEnable }
			: null
	}
	const handleSubmit = hookFormHandleSubmitCreate(
		async (data: CreateTransactionFormData) => {
			try {
				await createTransaction({
					...data,
					date: new Date(data.date),
					competenceDate: data.competenceDate
						? new Date(data.competenceDate)
						: null,
				})
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)
	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async (data: UpdateTransactionFormData) => {
			try {
				await updateTransaction({
					...data,
					date: new Date(data.date),
					competenceDate: data.competenceDate
						? new Date(data.competenceDate)
						: null,
				})
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)
	async function handleRemoveTransaction(id: string) {
		try {
			await transactionsService.remove({ id })
			queryClient.invalidateQueries({ queryKey: TRANSACTION_QUERY_KEY })
		} catch (error: unknown) {
			toast.error(parseError(error as AppError))
		}
	}
	/**
	 * FIM ACTIONS LOGIC
	 */

	/* ===============================================================® */

	/**
	 * INÍCIO TABLE LOGIC
	 */
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [globalFilter, setGlobalFilter] = useState('')
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

	function ActionMenu({ row }: PropsActionMenu) {
		const [openDropdown, setOpenDropdown] = useState(false)

		return (
			<div className="relative mr-4 w-fit">
				<DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuLabel>
							<p>Ações</p>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuItem
							className="group gap-1.5"
							onClick={() => {
								setIsViewModalOpen(true)
								handleOpenUpdateModal(row.original)
								setSelectedTransaction(row.original)
							}}
						>
							<EyeIcon className="h-5 w-5 text-zinc-600" />
							<p className="group-hover:text-zinc-600">Visualizar</p>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="group gap-1.5"
							onClick={() => {
								handleOpenUpdateModal(row.original)
								setSelectedTransaction(row.original)
							}}
						>
							<PencilSquareIcon className="h-5 w-5 text-dark-blue" />
							<p className="group-hover:text-dark-blue">Editar</p>
						</DropdownMenuItem>

						<Dialog>
							<DialogTrigger className="group mx-auto flex w-full gap-1.5 rounded-sm p-2 text-sm hover:bg-zinc-100">
								<TrashIcon className="h-5 w-5 text-rose-600 " />
								<span className="text-rose-600 group-hover:text-rose-600/90">
									Remover
								</span>
							</DialogTrigger>
							<DialogContent title="Remover a lançamento">
								<DialogHeader>
									<DialogTitle>Deseja remover o lançamento?</DialogTitle>
									<DialogDescription>
										Você está prestes a remover um registro. Por favor, confirme
										sua decisão antes de prosseguir.
									</DialogDescription>
								</DialogHeader>

								<div className="flex items-center justify-end gap-3">
									<DialogClose>
										<Button
											type="button"
											variant="outline"
											className="mx-0 rounded-md text-zinc-600"
										>
											<span className="pt-px">Cancelar</span>
										</Button>
									</DialogClose>

									<DialogClose>
										<Button
											type="submit"
											variant="outline"
											onClick={() => handleRemoveTransaction(row.original.id)}
											className="mx-0 rounded-md border border-red-600 bg-transparent text-red-600 hover:bg-red-100 hover:text-red-600/90"
										>
											<TrashIcon className="mr-1 h-5 w-5 " />
											<span className="pt-px">Remover</span>
										</Button>
									</DialogClose>
								</div>
							</DialogContent>
						</Dialog>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		)
	}

	const columns: ColumnDef<ITransactionDTO>[] = [
		{
			accessorKey: 'date',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Data
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{Format.parseIso(row.getValue('date'))}
				</div>
			),
		},
		{
			accessorKey: 'amount',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Valor
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{Format.currency(row.getValue('amount'))}
				</div>
			),
		},
		{
			accessorKey: 'description',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Descrição
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('description')}
				</div>
			),
		},
		{
			accessorKey: 'account',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Conta
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('account')}
				</div>
			),
		},
		{
			accessorKey: 'card',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Cartão
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">{row.getValue('card')}</div>
			),
		},
		{
			accessorKey: 'category',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Categoria
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('category')}
				</div>
			),
		},
		{
			accessorKey: 'contact',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Contato
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('contact')}
				</div>
			),
		},
		{
			accessorKey: 'center',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Centro de custo
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('center')}
				</div>
			),
		},
		{
			accessorKey: 'project',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Projeto
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('project')}
				</div>
			),
		},
		{
			accessorKey: 'method',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="w-fit text-dark-blue hover:text-darker-blue"
					>
						Método de pagamento
						<ArrowUpDown className="ml-1 size-4" />
					</Button>
				)
			},

			cell: ({ row }) => (
				<div className="text-[13px] tracking-tight">
					{row.getValue('method')}
				</div>
			),
		},
		{
			id: 'actions',
			cell: ({ row }) => <ActionMenu row={row} />,
			size: 50,
			minSize: 50,
		},
	]

	const table = useReactTable({
		data: transactions,
		columns,
		state: { sorting, pagination, columnVisibility, globalFilter },
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setGlobalFilter,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})
	const { isSidebarSmall } = useSidebar()
	const containerClassName = useMemo(() => {
		const transactionsLength = transactions.length || 0
		return cn(
			isSidebarSmall
				? transactionsLength > 0
					? 'lg:max-w-[calc(100vw-160px)]'
					: 'lg:max-w-[calc(100vw-168px)]'
				: transactionsLength > 0
					? 'lg:max-w-[calc(100vw-294px)]'
					: 'lg:max-w-[calc(100vw-294px)]',
		)
	}, [isSidebarSmall, transactions.length])
	/**
	 * FIM TABLE LOGIC
	 */

	/**
	 * INÍCIO FETCH DATA
	 */
	const { categories } = useCategories()
	const { bankAccounts } = useBankAccounts()
	const { costAndProfitCenters } = useCostAndProfitCenters()
	const { paymentMethods } = usePaymentMethods()
	// const { tags } = useTags()

	const transformedAccounts = bankAccounts.map((account) => ({
		field: account.name,
		value: account.name,
	}))
	const transformedCategories = categories.map((category) => ({
		field: category.name,
		value: category.name,
	}))
	const transformedCenters = costAndProfitCenters.map((center) => ({
		field: center.name,
		value: center.name,
	}))
	const transformedMethod = paymentMethods.map((method) => ({
		field: method.name,
		value: method.name,
	}))
	// const transformedTags = tags.map((tag) => ({
	// 	field: tag.name,
	// 	value: tag.id,
	// }))
	/**
	 * FIM FETCH DATA
	 */

	/**
	 * DROPDOWN MENU WIDTH
	 */
	const triggerRef = useRef<HTMLButtonElement>(null)
	const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
		undefined,
	)
	useEffect(() => {
		if (triggerRef.current) {
			setDropdownWidth(triggerRef.current.getBoundingClientRect().width)
		}
	}, [])

	/**
	 * INÍCIO EXPORTAR PLANILHA EXCEL
	 */
	function exportWorksheet(transactions: ITransactionDTO[]) {
    const worksheetData = transactions.map((transaction) => ({
        Tipo: transaction.type,
        Data: transaction.date,
        Valor: transaction.amount,
        Descrição: transaction.description,
        Status: transaction.status,
        Cartão: transaction.card,
        Contato: transaction.contact,
        Projeto: transaction.project,
        'Número do documento': transaction.documentNumber,
        Notas: transaction.notes,
        'Data de competência': transaction.competenceDate,
        Conta: transaction.account,
        Categoria: transaction.category,
        Centro: transaction.center,
        Método: transaction.method,
        'Data de criação': Format.parseIso(transaction.createdAt),
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lançamentos - Obra Fácil');
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lancamentos-obra-facil-${Format.parseIso(new Date().toISOString())}.xlsx`
    link.click();
    URL.revokeObjectURL(link.href);
}
	/**
	 * FIM EXPORTAR PLANILHA EXCEL
	 */

	return (
		<Fragment>
			<Helmet title="Lançamentos" />
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>
				<FormProvider {...createMethods}>
					<div
						className={cn(
							'relative w-full space-y-2.5 !overflow-x-auto',
							containerClassName,
						)}
					>
						<div className="w-full">
							<div className="flex items-center py-4 justify-end">
								<RdxInput
									placeholder="Buscar lançamentos..."
									value={globalFilter}
									onChange={(event) => setGlobalFilter(event.target.value)}
									className="max-w-sm mr-4 min-w-20 h-8 px-2.5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/50 shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-0 focus-visible:border-primary cursor-text"
								/>
								<div className="flex space-x-4 ml-auto items-center gap-2 p-px">
									<Dialog
										open={isCreateModalOpen}
										onOpenChange={setIsCreateModalOpen}
									>
										<DialogTrigger asChild>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={handleOpenCreateModal}
												className="!py-0 text-[13px] font-medium"
											>
												<PlusIcon className="mr-1.5 size-4" strokeWidth={2.2} />
												Cadastrar
											</Button>
										</DialogTrigger>
										{isCreateModalOpen && (
											<DialogContent
												className="sm:max-w-5xl p-8"
												title="Criar lançamento"
											>
												<DialogHeader>
													<DialogTitle>Cadastrar lançamento</DialogTitle>
													<DialogDescription>
														Preencha os campos abaixo para cadastrar um novo
														lançamento.
													</DialogDescription>
												</DialogHeader>
												<form
													onSubmit={handleSubmit}
													className="flex flex-col flex-wrap space-y-2 bg-white pt-2 dark:border-slate-400 dark:bg-slate-800"
												>
													<div className="grid grid-cols-3 gap-4 pb-6">
														<Select
															label="Tipo:"
															data={[
																{ field: 'Receita', value: 'Receita' },
																{ field: 'Despesa', value: 'Despesa' },
															]}
															control={hookFormControlCreate}
															setValue={hookFormSetValueCreate}
															error={hookFormErrosCreate.type?.message}
															{...hookFormRegisterCreate('type')}
														/>
														<Controller
															control={hookFormControlCreate}
															name="date"
															render={({ field }) => (
																<DatePicker
																	inputId="date-input"
																	label="Data:"
																	selected={
																		field.value
																			? new Date(field.value)
																			: new Date()
																	}
																	onChange={(date) => field.onChange(date)}
																	error={hookFormErrosCreate.date?.message}
																/>
															)}
														/>
														<InputCurrency
															id="total-amount"
															label="Valor:"
															placeholder="Digite o valor total *"
															control={hookFormControlCreate}
															error={hookFormErrosCreate.amount?.message}
															{...hookFormRegisterCreate('amount')}
														/>
														<Input
															id="description"
															label="Descrição:"
															placeholder="Digite a descrição do lançamento *"
															error={hookFormErrosCreate.description?.message}
															{...hookFormRegisterCreate('description')}
														/>
														<Select
															label="Conta"
															placeholder="Selecione uma conta *"
															data={transformedAccounts}
															control={hookFormControlCreate}
															setValue={hookFormSetValueCreate}
															error={hookFormErrosCreate.account?.message}
															{...hookFormRegisterCreate('account')}
														/>
														<Select
															label="Categoria"
															placeholder="Selecione uma categoria *"
															data={transformedCategories}
															control={hookFormControlCreate}
															setValue={hookFormSetValueCreate}
															error={hookFormErrosCreate.category?.message}
															{...hookFormRegisterCreate('category')}
														/>
														<Select
															label="Status"
															placeholder="Selecione uma categoria *"
															data={[
																{ field: 'Agendado', value: 'Agendado' },
																{ field: 'Conciliado', value: 'Conciliado' },
																{ field: 'Aprovado', value: 'Aprovado' },
															]}
															control={hookFormControlCreate}
															setValue={hookFormSetValueCreate}
															error={hookFormErrosCreate.status?.message}
															{...hookFormRegisterCreate('status')}
														/>
														{getFieldInfo('center')?.isEnabled && (
															<Select
																label="Centro de custo:"
																data={transformedCenters}
																control={hookFormControlCreate}
																setValue={hookFormSetValueCreate}
																error={hookFormErrosCreate.center?.message}
																{...hookFormRegisterCreate('center')}
															/>
														)}
														{getFieldInfo('method')?.isEnabled && (
															<Select
																label="Método de pagamento:"
																data={transformedMethod}
																control={hookFormControlCreate}
																setValue={hookFormSetValueCreate}
																error={hookFormErrosCreate.method?.message}
																{...hookFormRegisterCreate('method')}
															/>
														)}
														{getFieldInfo('card')?.isEnabled && (
															<Input
																id="card"
																label="Cartão:"
																placeholder="Digite o cartão associado"
																error={hookFormErrosCreate.card?.message}
																{...hookFormRegisterCreate('card')}
															/>
														)}
														{getFieldInfo('competenceDate')?.isEnabled && (
															<Controller
																control={hookFormControlCreate}
																name="competenceDate"
																render={({ field }) => (
																	<DatePicker
																		inputId="competence-date"
																		label="Data de competência"
																		selected={
																			field.value
																				? new Date(field.value)
																				: new Date()
																		}
																		onChange={(date) => field.onChange(date)}
																		error={
																			hookFormErrosCreate.competenceDate
																				?.message
																		}
																	/>
																)}
															/>
														)}
														{getFieldInfo('documentNumber')?.isEnabled && (
															<Input
																id="document-number"
																label="Nº do documento"
																placeholder="Digite o número do documento"
																error={
																	hookFormErrosCreate.documentNumber?.message
																}
																{...hookFormRegisterCreate('documentNumber')}
															/>
														)}
														{getFieldInfo('contact')?.isEnabled && (
															<Input
																id="contact"
																label="Contato:"
																placeholder="Digite o contato associado"
																error={hookFormErrosCreate.contact?.message}
																{...hookFormRegisterCreate('contact')}
															/>
														)}
														{getFieldInfo('project')?.isEnabled && (
															<Input
																id="project"
																label="Projeto:"
																placeholder="Digite o projeto associado"
																error={hookFormErrosCreate.project?.message}
																{...hookFormRegisterCreate('project')}
															/>
														)}
														{getFieldInfo('notes')?.isEnabled && (
															<Input
																id="notes"
																label="Observações:"
																placeholder="Digite observações adicionais"
																error={hookFormErrosCreate.notes?.message}
																{...hookFormRegisterCreate('notes')}
															/>
														)}
													</div>
													<Button
														type="submit"
														className="w-full bg-dark-blue px-3 dark:text-slate-100"
													>
														Cadastrar
													</Button>
												</form>
											</DialogContent>
										)}
									</Dialog>
									<Button
										type="button"
										variant="outline"
										size="xs"
										className="!py-0 text-[13px] font-medium"
										onClick={() => exportWorksheet(transactions)}
									>
										<ArrowUpOnSquareIcon
											className="mr-1.5 size-4"
											strokeWidth={2}
										/>
										Exportar
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild className="!py-0">
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="ml-auto !py-0 text-[13px] font-medium"
												ref={triggerRef}
											>
												Selecionar colunas{' '}
												<ChevronDownIcon className="ml-1.5 size-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											style={{
												width: dropdownWidth ? `${dropdownWidth}px` : 'auto',
											}}
										>
											{table
												.getAllColumns()
												.filter((column: Column<ITransactionDTO>) =>
													column.getCanHide(),
												)
												.map((column: Column<ITransactionDTO>) => (
													<DropdownMenuCheckboxItem
														key={column.id}
														className="w-full text-[13px]"
														checked={column.getIsVisible()}
														onCheckedChange={(value) =>
															column.toggleVisibility(!!value)
														}
													>
														{getColumnName(column.id)}
													</DropdownMenuCheckboxItem>
												))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
							<div className="rounded-md border !border-zinc-300">
								<Table>
									<TableHeader>
										{table.getHeaderGroups().map((headerGroup) => (
											<TableRow key={headerGroup.id}>
												{headerGroup.headers.map((header) => (
													<TableHead key={header.id}>
														{header.isPlaceholder
															? null
															: flexRender(
																	header.column.columnDef.header,
																	header.getContext(),
																)}
													</TableHead>
												))}
											</TableRow>
										))}
									</TableHeader>
									<TableBody>
										{table.getRowModel().rows?.length ? (
											table.getRowModel().rows.map((row) => (
												<TableRow
													key={row.original.id}
													data-state={row.getIsSelected() && 'selected'}
													onDoubleClick={() => {
														new Promise<void>((resolve) => {
															setSelectedTransaction(row.original)
															resolve()
														}).then(() => {
															handleOpenUpdateModal(row.original)
														})
													}}
												>
													{row.getVisibleCells().map((cell) => (
														<TableCell key={cell.id}>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext(),
															)}
														</TableCell>
													))}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={columns.length}
													className="h-24 text-center relative"
												>
													<p className="fixed top-[38.5%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 h-24 text-center">
														Nenhum registro encontrado.
													</p>
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
							<PaginationControls table={table} />
						</div>
					</div>
				</FormProvider>
			</div>

			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-5xl p-8" title="Criar lançamento">
						<DialogHeader>
							<DialogTitle>
								{!isViewModalOpen
									? 'Cadastrar lançamento'
									: 'Visualizar lançamento'}
							</DialogTitle>
							<DialogDescription>
								{!isViewModalOpen
									? 'Preencha os campos abaixo para cadastrar um novo lançamento.'
									: 'Visualize os detalhes do lançamento selecionado.'}
							</DialogDescription>
						</DialogHeader>
						<form
							onSubmit={handleSubmitUpdate}
							className={cn(
								'flex flex-col flex-wrap space-y-2 bg-white pt-2 dark:border-slate-400 dark:bg-slate-800',
								isViewModalOpen && 'pointer-events-none select-none',
							)}
						>
							<div
								className={cn(
									'grid grid-cols-3 gap-4',
									!isViewModalOpen && 'pb-6',
								)}
							>
								<Select
									label="Tipo:"
									data={[
										{ field: 'Receita', value: 'Receita' },
										{ field: 'Despesa', value: 'Despesa' },
									]}
									control={hookFormControlUpdate}
									setValue={hookFormSetValueCreate}
									error={hookFormErrosUpdate.type?.message}
									{...hookFormRegisterUpdate('type')}
								/>
								<Controller
									control={hookFormControlUpdate}
									name="date"
									render={({ field }) => (
										<DatePicker
											inputId="date-input"
											label="Data:"
											selected={
												field.value ? new Date(field.value) : new Date()
											}
											onChange={(date) => field.onChange(date)}
											error={hookFormErrosUpdate.date?.message}
										/>
									)}
								/>
								<InputCurrency
									id="total-amount"
									label="Valor:"
									placeholder="Digite o valor total *"
									control={hookFormControlUpdate}
									error={hookFormErrosUpdate.amount?.message}
									{...hookFormRegisterUpdate('amount')}
								/>
								<Input
									id="description"
									label="Descrição:"
									placeholder="Digite a descrição do lançamento *"
									error={hookFormErrosUpdate.description?.message}
									{...hookFormRegisterUpdate('description')}
								/>
								<Select
									label="Conta"
									placeholder="Selecione uma conta *"
									data={transformedAccounts}
									control={hookFormControlUpdate}
									setValue={hookFormSetValueCreate}
									error={hookFormErrosUpdate.account?.message}
									{...hookFormRegisterUpdate('account')}
								/>
								<Select
									label="Categoria"
									placeholder="Selecione uma categoria *"
									data={transformedCategories}
									control={hookFormControlUpdate}
									setValue={hookFormSetValueCreate}
									error={hookFormErrosUpdate.category?.message}
									{...hookFormRegisterUpdate('category')}
								/>
								<Select
									label="Status"
									placeholder="Selecione uma categoria *"
									data={[
										{ field: 'Agendado', value: 'Agendado' },
										{ field: 'Conciliado', value: 'Conciliado' },
										{ field: 'Aprovado', value: 'Aprovado' },
									]}
									control={hookFormControlUpdate}
									setValue={hookFormSetValueCreate}
									error={hookFormErrosUpdate.status?.message}
									{...hookFormRegisterUpdate('status')}
								/>
								{getFieldInfo('center')?.isEnabled && (
									<Select
										label="Centro de custo:"
										data={transformedCenters}
										control={hookFormControlUpdate}
										setValue={hookFormSetValueCreate}
										error={hookFormErrosUpdate.center?.message}
										{...hookFormRegisterUpdate('center')}
									/>
								)}
								{getFieldInfo('method')?.isEnabled && (
									<Select
										label="Método de pagamento:"
										data={transformedMethod}
										control={hookFormControlUpdate}
										setValue={hookFormSetValueCreate}
										error={hookFormErrosUpdate.method?.message}
										{...hookFormRegisterUpdate('method')}
									/>
								)}
								{getFieldInfo('card')?.isEnabled && (
									<Input
										id="card"
										label="Cartão:"
										placeholder="Digite o cartão associado"
										error={hookFormErrosUpdate.card?.message}
										{...hookFormRegisterUpdate('card')}
									/>
								)}
								{getFieldInfo('competenceDate')?.isEnabled && (
									<Controller
										control={hookFormControlUpdate}
										name="competenceDate"
										render={({ field }) => (
											<DatePicker
												inputId="competence-date"
												label="Data de competência"
												selected={
													field.value ? new Date(field.value) : new Date()
												}
												onChange={(date) => field.onChange(date)}
												error={hookFormErrosUpdate.competenceDate?.message}
											/>
										)}
									/>
								)}
								{getFieldInfo('documentNumber')?.isEnabled && (
									<Input
										id="document-number"
										label="Nº do documento"
										placeholder="Digite o número do documento"
										error={hookFormErrosUpdate.documentNumber?.message}
										{...hookFormRegisterUpdate('documentNumber')}
									/>
								)}
								{getFieldInfo('contact')?.isEnabled && (
									<Input
										id="contact"
										label="Contato:"
										placeholder="Digite o contato associado"
										error={hookFormErrosUpdate.contact?.message}
										{...hookFormRegisterUpdate('contact')}
									/>
								)}
								{getFieldInfo('project')?.isEnabled && (
									<Input
										id="project"
										label="Projeto:"
										placeholder="Digite o projeto associado"
										error={hookFormErrosUpdate.project?.message}
										{...hookFormRegisterUpdate('project')}
									/>
								)}
								{getFieldInfo('notes')?.isEnabled && (
									<Input
										id="notes"
										label="Observações:"
										placeholder="Digite observações adicionais"
										error={hookFormErrosUpdate.notes?.message}
										{...hookFormRegisterUpdate('notes')}
									/>
								)}
							</div>
							{!isViewModalOpen && (
								<Button
									type="submit"
									className="w-full bg-dark-blue px-3 dark:text-slate-100"
								>
									Atualizar
								</Button>
							)}
						</form>
					</DialogContent>
				</Dialog>
			)}
			{isDeleteModalOpen && (
				<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
					<DialogContent
						className="sm:max-w-[425px]"
						title="Remover o lançamento"
					>
						<DialogHeader>
							<DialogTitle>Remover lançamento</DialogTitle>
							<DialogDescription>
								Tem certeza de que deseja remover este lançamento? Essa ação não
								poderá ser desfeita.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="mt-4">
							<Button
								type="submit"
								variant="destructive"
								onClick={() => {
									handleRemoveTransaction(selectedTransaction.id)
									handleCloseDeleteModal()
								}}
							>
								Remover lançamento
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	)
}
