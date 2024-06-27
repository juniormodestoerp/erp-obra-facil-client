import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { columns } from './components/columns'
import { settingsService } from '@app/services/settings'
import { transactionsService } from '@app/services/transactions'
import { mapBankName } from '@app/utils/bank-map'
import {
    dateMessage,
    numbMessage,
    strMessage,
} from '@app/utils/custom-zod-error'
import { useSidebar } from '@app/hooks/use-sidebar'
import { Format } from '@app/utils/format'
import { useCategories } from '@app/hooks/categories/use-categories'
import { useBankAccounts } from '@app/hooks/bank-accounts/use-bank-accounts'
import { useCostAndProfitCenters } from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { usePaymentMethods } from '@app/hooks/payment-methods/use-payment-methods'
import { useTags } from '@app/hooks/tags/use-tags'
import type { ITransactionDTO } from '@app/dtos/transaction-dto'
import type { ISetting } from '@app/services/settings/fetch'
import { type AppError, parseError } from '@app/services/http-client'
import { cn } from '@app/utils/cn'
import { useCreateTransaction } from '@app/hooks/transactions/use-create-transaction'
import { useTransactions } from '@app/hooks/transactions/use-transactions'
import { queryClient } from '@app/services/query-client'

export interface SearchParams {
    pageIndex: number
    searchTerm?: string
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

export function useTransactionsController() {
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionDTO>({} as ITransactionDTO)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const createMethods = useForm<CreateTransactionFormData>({
        resolver: zodResolver(createSchema),
    })

    const updateMethods = useForm<UpdateTransactionFormData>({
        resolver: zodResolver(updateSchema),
    })

    const { setValue: setCreateValue, handleSubmit: handleCreateSubmit } = createMethods
    const { setValue: setUpdateValue } = updateMethods

    function handleOpenCreateModal() {
        setCreateValue('type', '')
        setCreateValue('date', new Date().toISOString())
        setCreateValue('amount', 0)
        setCreateValue('description', '')
        setCreateValue('account', '')
        setCreateValue('category', '')
        setCreateValue('status', '')
        setCreateValue('card', '')
        setCreateValue('contact', '')
        setCreateValue('center', '')
        setCreateValue('project', '')
        setCreateValue('method', '')
        setCreateValue('documentNumber', '')
        setCreateValue('notes', '')
        setCreateValue('competenceDate', new Date().toISOString())
        setCreateValue('tags', '')
        setIsCreateModalOpen(true)
    }

    function handleCloseCreateModal() {
        setIsCreateModalOpen(false)
    }

    function handleOpenUpdateModal(transaction: ITransactionDTO) {
        setSelectedTransaction(transaction)
        setUpdateValue('id', transaction.id)
        setUpdateValue('type', transaction.type)
        setUpdateValue('date', transaction.date)
        setUpdateValue('amount', transaction.amount)
        setUpdateValue('description', transaction.description)
        setUpdateValue('account', transaction.account)
        setUpdateValue('category', transaction.category)
        setUpdateValue('status', transaction.status ?? 'Não informado')
        setUpdateValue('card', transaction.card ?? 'Não informado')
        setUpdateValue('contact', transaction.contact ?? 'Não informado')
        setUpdateValue('center', transaction.center ?? 'Não informado')
        setUpdateValue('project', transaction.project ?? 'Não informado')
        setUpdateValue('method', transaction.method ?? 'Não informado')
        setUpdateValue('documentNumber', transaction.documentNumber ?? 'Não informado')
        setUpdateValue('notes', transaction.notes ?? 'Não informado')
        setUpdateValue('competenceDate', transaction.competenceDate ?? null)
        setUpdateValue('tags', transaction.tags ?? 'Não informado')
        setIsUpdateModalOpen(true)
    }

    function handleCloseUpdateModal() {
        setIsUpdateModalOpen(false)
    }

    function handleOpenDeleteModal(transaction: ITransactionDTO) {
        setSelectedTransaction(transaction)
        setIsDeleteModalOpen(true)
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false)
    }

    const { transactions } = useTransactions()
    const { createTransaction } = useCreateTransaction()

    const handleCreate = handleCreateSubmit(async (data: CreateTransactionFormData) => {
        try {
            await createTransaction({
                ...data,
                date: new Date(data.date),
                competenceDate: data.competenceDate ? new Date(data.competenceDate) : null,
            })
            handleCloseCreateModal()
        } catch (error) {
            toast.error(parseError(error as AppError))
        }
    })

    const { data: settings } = useQuery<{ settings: ISetting[] }>({
        queryKey: ['settings'],
        queryFn: () => settingsService.fetch({ pageIndex: 1 }),
    })

    function getFieldInfo(fieldName: string): { isRequired: boolean; isEnabled: boolean } | null {
        const setting = settings?.settings.find(s => s.fieldName === fieldName)
        return setting ? { isRequired: setting.isFieldRequired, isEnabled: setting.isFieldEnable } : null
    }

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

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

    function generateExcel(transactions: ITransactionDTO[]) {
        const worksheetData = transactions.map(transaction => ({
            Type: transaction.type,
            Date: transaction.date,
            Amount: transaction.amount,
            Description: transaction.description,
            Status: transaction.status,
            Card: transaction.card,
            Contact: transaction.contact,
            Project: transaction.project,
            DocumentNumber: transaction.documentNumber,
            Notes: transaction.notes,
            CompetenceDate: transaction.competenceDate,
            Account: transaction.account,
            Category: transaction.category,
            Center: transaction.center,
            Method: transaction.method,
            CreatedAt: transaction.createdAt,
        }))
        const worksheet = XLSX.utils.json_to_sheet(worksheetData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions')
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'transactions.xlsx'
        link.click()
        URL.revokeObjectURL(link.href)
    }

    async function handleRemoveTransaction(id: string) {
        try {
            await transactionsService.remove({ id })
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        } catch (error: unknown) {
            toast.error(parseError(error as AppError))
        }
    }

    const { isSidebarSmall } = useSidebar()
    const containerClassName = useMemo(() => {
        const transactionsLength = transactions.length || 0
        return cn(
            isSidebarSmall
                ? transactionsLength > 0
                    ? 'lg:max-w-[calc(100vw-148px)]'
                    : 'lg:max-w-[calc(100vw-148px)]'
                : transactionsLength > 0
                    ? 'lg:max-w-[calc(100vw-294px)]'
                    : 'lg:max-w-[calc(100vw-294px)]',
        )
    }, [isSidebarSmall, transactions.length])

    const { categories } = useCategories()
    const { bankAccounts } = useBankAccounts()
    const { costAndProfitCenters } = useCostAndProfitCenters()
    const { paymentMethods } = usePaymentMethods()
    const { tags } = useTags()

    const transformedAccounts = bankAccounts.map(account => ({
        field: account.name,
        value: account.name,
    }))
    const transformedCategories = categories.map(category => ({
        field: category.name,
        value: category.name,
    }))
    const transformedCenters = costAndProfitCenters.map(center => ({
        field: center.name,
        value: center.name,
    }))
    const transformedMethod = paymentMethods.map(method => ({
        field: method.name,
        value: method.name,
    }))
    const transformedTags = tags.map(tag => ({
        field: tag.name,
        value: tag.id,
    }))

		console.log('executou');
		

    return {
        table,
        transactions,
        createMethods,
        updateMethods,
        selectedTransaction,
        globalFilter,
        transformedAccounts,
        transformedCategories,
        transformedCenters,
        transformedMethod,
        transformedTags,
        containerClassName,
        handleCreate,
        isCreateModalOpen,
        isUpdateModalOpen,
        isDeleteModalOpen,
        handleRemoveTransaction,
        mapBankName,
        setGlobalFilter,
        setSelectedTransaction,
        getFieldInfo,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleOpenUpdateModal,
        handleCloseUpdateModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
    }
}
