import { zodResolver } from '@hookform/resolvers/zod'
import {
	type QueryKey,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
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
	ITransactionSearchResponse,
} from '@app/services/transactions/fetch'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { columns } from './components/columns'

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
	const queryClient = useQueryClient()
	const [searchParams, setSearchParams] = useSearchParams()

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
		await createTransaction(data)
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
		previousBalance: false,
		description: false,
	})
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [globalFilter, setGlobalFilter] = useState('')

	const useFetchTransactions = ({
		pageIndex,
		searchTerm,
	}: ITransactionSearchOptions) => {
		const params = new URLSearchParams()

		params.append('pageIndex', pageIndex.toString())

		if (searchTerm) {
			params.append('searchTerm', searchTerm)
		}

		const queryString = params.toString()

		const queryKey: QueryKey = ['transactions', queryString]

		return useQuery<ITransactionSearchResponse>({
			queryKey,
			queryFn: () => transactionsService.fetch({ pageIndex, searchTerm }),
		})
	}

	const { data: categories } = useQuery({
		queryKey: ['categories/select-input'],
		queryFn: () => categoriesService.selectInput(),
	})

	console.log('categories', categories)

	const queryPageIndex = z.coerce
		.number(numbMessage('index da página'))
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1')

	const querySearchTerm = searchParams.get('searchTerm') ?? ''

	const {
		data: result,
		isPending,
		isError,
	} = useFetchTransactions({
		pageIndex: queryPageIndex,
		searchTerm: querySearchTerm,
	})

	const { perPage, totalCount } = result?.meta ?? {}

	const totalPages = Math.ceil((totalCount ?? 0) / (perPage ?? 12))

	const table = useReactTable({
		data: result?.transactions ?? [],
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
		manualFiltering: true,
		manualPagination: true,
		autoResetPageIndex: true,
		pageCount: totalPages ?? -1,
		rowCount: totalCount ?? 0,
	})

	function handlePaginate(newPageIndex: number) {
		setSearchParams({
			page: (newPageIndex + 1).toString(),
			searchTerm: globalFilter,
		})
	}

	function fetchData({ pageIndex, searchTerm }: SearchParams) {
		const params = new URLSearchParams()

		params.set('pageIndex', (pageIndex + 1).toString())

		if (searchTerm) {
			params.set('searchTerm', searchTerm)
		}

		queryClient.invalidateQueries({ queryKey: ['transactions'] })
		setSearchParams(params)
	}
	/* ====================== END OF TABLE ====================== */

	function handleRemoveTransaction(id: string) {
		transactionsService.remove({ id }).then(() => {
			queryClient.invalidateQueries({
				queryKey: ['transactions'],
			})
		})
	}

	return {
		table,
		result,
		isError,
		isPending,
		methods,
		openCreateDialog,
		isDeleteModalOpen,
		selectedTransaction,
		globalFilter,
		categories,
		setGlobalFilter,
		setSelectedTransaction,
		setIsDeleteModalOpen,
		setOpenCreateDialog,
		getFieldInfo,
		handleSubmit,
		handleRemoveTransaction,
		fetchData,
		handlePaginate,
	}
}
