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
import { type AppError, parseError } from '@app/services/http-client'
import { settingsService } from '@app/services/settings'
import type { ISetting } from '@app/services/settings/fetch'
import { transactionsService } from '@app/services/transactions'
import type {
	ITransaction,
	ITransactionSearchOptions,
} from '@app/services/transactions/fetch'
import { mapBankName } from '@app/utils/bank-map'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { useGlobalShortcut } from '@app/utils/global-shortcut'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { columns } from './components/columns'
import { cn } from '@app/utils/cn'
import { useSidebar } from '@app/hooks/use-sidebar'
import { Format } from '@app/utils/format'
import { conciliationsService } from '@app/services/conciliations'

interface RowSelectionState {
	[key: string]: boolean
}

export interface SearchParams {
	pageIndex: number
	searchTerm?: string
}

const schema = z.object({
	type: z.string(strMessage('tipo')),
	date: z.string(dateMessage('data')),
	amount: z
		.union([z.string(strMessage('valor')), z.number(numbMessage('valor'))])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		}),
	description: z.string(strMessage('descrição')),
	account: z.string(strMessage('conta')),
	status: z.string(strMessage('status')),
	card: z.string(strMessage('cartão')).nullable().default(null),
	category: z.string(strMessage('categoria')).nullable().default(null),
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
	tags: z
		.array(z.string(strMessage('tags')))
		.nullable()
		.default(null),
})

export type FormData = z.infer<typeof schema>

export function useTransactionsController() {
	const queryClient = useQueryClient()
	const [searchParams, setSearchParams] = useSearchParams()

	const [selectedTransaction, setSelectedTransaction] = useState<ITransaction>(
		{} as ITransaction,
	)
	const [openCreateDialog, setOpenCreateDialog] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isTransactionOpen, setTransactionOpen] = useState(false)

	const openTransaction = () => setTransactionOpen(true)
	const closeTransaction = () => setTransactionOpen(false)

	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			date: new Date().toISOString(),
			competenceDate: new Date().toISOString(),
		},
	})

	const { mutateAsync: createTransaction } = useMutation({
		mutationFn: async (formData: FormData) => {
			return conciliationsService.addOne(formData)
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
		card: false,
		contact: false,
		project: false,
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
		const { data: result, isLoading } = useQuery({
			queryKey: ['transactions', pageIndex, searchTerm, sorting],
			queryFn: () =>
				transactionsService.fetch({ pageIndex, searchTerm, sorting }),
		})

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

		openTransaction()
		setOpenCreateDialog(true)
	}

	const openModal = useCallback(() => {
		setOpenCreateDialog(true)
	}, [])

	useGlobalShortcut('Ctrl+a', openModal)

	const { isSidebarSmall } = useSidebar()
	const containerClassName = useMemo(() => {
		const transactionsLength = result?.transactions?.length || 0
		return cn(
			isSidebarSmall
				? transactionsLength > 0
					? 'lg:max-w-[calc(100vw-148px)]'
					: 'lg:max-w-[calc(100vw-148px)]'
				: transactionsLength > 0
					? 'lg:max-w-[calc(100vw-294px)]'
					: 'lg:max-w-[calc(100vw-294px)]',
		)
	}, [isSidebarSmall, result?.transactions?.length])

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
		isTransactionOpen,
		containerClassName,
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
		openTransaction,
		closeTransaction,
	}
}
