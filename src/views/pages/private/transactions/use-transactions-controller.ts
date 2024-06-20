import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { categoriesService } from '@app/services/categories'
import { settingsService } from '@app/services/settings'
import type { ISetting } from '@app/services/settings/fetch'
import { transactionsService } from '@app/services/transactions'
import type {
	ITransaction,
	ITransactionSearchOptions,
} from '@app/services/transactions/fetch'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { columns } from './components/columns'
import { toast } from 'sonner'
import { type AppError, parseError } from '@app/services/http-client'
import { mapBankName } from '@app/utils/bank-map'
import { useGlobalShortcut } from '@app/utils/global-shortcut'
import { useTransaction } from '@app/hooks/use-transaction'

interface RowSelectionState {
	[key: string]: boolean
}

export interface SearchParams {
	pageIndex: number
	searchTerm?: string
}

const schema = z.object({
	name: z
		.string(strMessage('nome do lançamento'))
		.min(1, 'O campo nome do lançamento é obrigatório.'),
	description: z
		.string(strMessage('descrição'))
		.min(1, 'O campo descrição é obrigatório.'),
	categoryId: z
		.string(strMessage('categoria'))
		.min(1, 'O campo categoria é obrigatório.'),
	establishmentName: z
		.string(strMessage('nome do estabelecimento'))
		.min(1, 'O campo nome do estabelecimento é obrigatório.'),
	accountType: z
		.string(strMessage('tipo de conta'))
		.min(1, 'O campo tipo de conta é obrigatório.'),
	bankName: z
		.string(strMessage('nome do banco'))
		.min(1, 'O campo nome do banco é obrigatório.'),
	transactionDate: z.coerce.date(dateMessage('data da transação')),
	previousBalance: z
		.string(numbMessage('saldo anterior'))
		.transform((value) => +value.replace(',', '.')),
	totalAmount: z
		.string(numbMessage('valor base do procedimento'))
		.transform((value) => +value.replace(',', '.')),
	currentBalance: z
		.string(numbMessage('valor base do procedimento'))
		.transform((value) => +value.replace(',', '.')),
	paymentMethod: z
		.string(strMessage('forma de pagamento'))
		.min(1, 'O campo forma de pagamento é obrigatório.'),

	// Configurações opcionais adicionais
	competencyDate: z.coerce.date(dateMessage('data de competência')).nullable(),
	costAndProfitCenters: z.string(strMessage('centro de custo')).nullable(),
	tags: z.string(strMessage('tags')).nullable(),
	documentNumber: z.string(strMessage('número do documento')).nullable(),
	associatedContracts: z.string(strMessage('contratos assosiados')).nullable(),
	associatedProjects: z.string(strMessage('projetos assosiados')).nullable(),
	additionalComments: z.string(strMessage('comentários adicionais')).nullable(),
})

export type FormData = z.infer<typeof schema>

export function useTransactionsController() {
	// const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [searchParams, setSearchParams] = useSearchParams()

	const { openTransaction } = useTransaction()

	const [selectedTransaction, setSelectedTransaction] = useState<ITransaction>(
		{} as ITransaction,
	)
	const [openCreateDialog, setOpenCreateDialog] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			transactionDate: new Date(),
			competencyDate: new Date(),
		},
	})

	const { mutateAsync: createTransaction } = useMutation({
		mutationFn: async (formData: FormData) => {
			return transactionsService.create(formData)
		},
		onSuccess(newCategory) {
			queryClient.setQueryData(['transactions'], (oldData: any) => {
				return {
					...oldData,
					categories: [...(oldData?.categories || []), newCategory],
				}
			})
		},
	})

	const handleSubmit = methods.handleSubmit(async (data: FormData) => {
		console.log('data', data, 'executou a transação')

		await createTransaction(data)
		setOpenCreateDialog(false)
	})

	const { data: settings, refetch } = useQuery<{ settings: ISetting[] }>({
		queryKey: ['settings'],
		queryFn: () => settingsService.fetch({ pageIndex: 1 }),
	})

	function getFieldInfo(
		fieldName: string,
	): { isRequired: boolean; isEnabled: boolean } | null {
		const setting = settings?.settings.find((s) => s.fieldName === fieldName)
		if (setting) {
			return {
				isRequired: setting.isFieldRequired,
				isEnabled: setting.isFieldEnable,
			}
		}
		return null
	}

	useEffect(() => {
		refetch()
	}, [refetch])

	/* ====================== TABLE ====================== */

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		description: false,
		establishmentName: false,
		categoryName: false,
	})
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [globalFilter, setGlobalFilter] = useState('')

	const { data: categories } = useQuery({
		queryKey: ['categories/select-input'],
		queryFn: () => categoriesService.selectInput(),
	})

	const filteredCategories = categories

	const useFetchTransactions = ({
		pageIndex,
		searchTerm,
		sorting,
	}: ITransactionSearchOptions) => {
		const {
			data: result,
			isLoading,
			isError,
			error,
		} = useQuery({
			queryKey: ['transactions', pageIndex, searchTerm, sorting],
			queryFn: () =>
				transactionsService.fetch({ pageIndex, searchTerm, sorting }),
		})

		useEffect(() => {
			if (isError && error) {
				toast.error(parseError(error))
			}
		}, [isError, error])

		return { result, isLoading }
	}

	const queryPageIndex = useMemo(() => {
		return z.coerce
			.number(numbMessage('index da página'))
			.transform((page) => page - 1)
			.parse(searchParams.get('page') ?? '1')
	}, [searchParams])

	const { result, isLoading } = useFetchTransactions({
		pageIndex: queryPageIndex,
		searchTerm: globalFilter,
		sorting,
	})

	const transactionsData = result?.transactions ?? []

	const { perPage, totalCount } = result?.meta ?? {}

	const totalPages = Math.ceil((totalCount ?? 0) / (perPage ?? 12))

	const table = useReactTable({
		data: transactionsData,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualSorting: true,
		manualFiltering: true,
		manualPagination: true,
		autoResetPageIndex: true,
		pageCount: totalPages,
		rowCount: totalCount ?? 0,
	})

	function handlePaginate(newPageIndex: number) {
		setSearchParams({ page: (newPageIndex + 1).toString() })
	}

	async function handleRemoveTransaction(id: string) {
		try {
			await transactionsService.remove({ id })
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			toast.success('Lançamento removida com sucesso')
		} catch (error: unknown) {
			toast.error(parseError(error as AppError))
		}
	}

	function handleRowDoubleClick(transaction: ITransaction) {
		setSelectedTransaction(transaction)
		console.log('transaction 2', transaction)

		openTransaction()
		setOpenCreateDialog(true)
	}

	const openModal = useCallback(() => {
		setOpenCreateDialog(true)
	}, [])

	useGlobalShortcut('Ctrl+a', openModal)

	return {
		table,
		result,
		methods,
		openCreateDialog,
		isDeleteModalOpen,
		selectedTransaction,
		globalFilter,
		filteredCategories,
		isLoading,
		handleRowDoubleClick,
		mapBankName,
		setGlobalFilter,
		setSelectedTransaction,
		setIsDeleteModalOpen,
		setOpenCreateDialog,
		getFieldInfo,
		handleSubmit,
		handleRemoveTransaction,
		handlePaginate,
	}
}
