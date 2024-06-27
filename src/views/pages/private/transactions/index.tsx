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
import { useMemo, useState, useEffect, useRef, Fragment } from 'react'
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
import { Input as RdxInput } from '@views/components/ui/input'
import { flexRender, type Column } from '@tanstack/react-table'
import { Pagination } from '@views/components/pagination'
import { Dialog, DialogTrigger } from '@views/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@views/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { FormProvider, Controller } from 'react-hook-form'
import { Input } from '@views/components/input'
import { InputCurrency } from '@views/components/input/currency'
import { Select } from '@views/components/select'
import { Button } from '@views/components/ui/button'
import { DatePicker } from '@views/components/ui/date-picker'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@views/components/ui/dialog'
import axios from 'axios'
import { ChevronDown, ChevronDownIcon } from 'lucide-react'
import { ArrowUpOnSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'
import { PaginationControls } from '../conciliations/components/pagination-controls'
import { getColumnName } from '../conciliations/components/get-column-name'

export interface SearchParams {
    pageIndex: number
    searchTerm?: string
}

const createSchema = z.object({
    type: z.string(strMessage('tipo')),
    date: z.coerce.string(dateMessage('data')),
    amount: z.union([z.string(strMessage('valor')), z.number(numbMessage('valor'))])
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
    competenceDate: z.coerce.string(dateMessage('data competência')).nullable().default(null),
    tags: z.string(strMessage('tags')).nullable().default(null),
})

export type CreateTransactionFormData = z.infer<typeof createSchema>

const updateSchema = z.object({
    id: z.string(strMessage('identificador da categoria')),
    type: z.string(strMessage('tipo')),
    date: z.coerce.date(dateMessage('data')),
    amount: z.union([z.string(strMessage('valor')), z.number(numbMessage('valor'))])
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
    competenceDate: z.coerce.date(dateMessage('data competência')).nullable().default(null),
    tags: z.string(strMessage('tags')).nullable().default(null),
})

export type UpdateTransactionFormData = z.infer<typeof updateSchema>

export function useTransactionsController() {
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionDTO>({} as ITransactionDTO)
    const createMethods = useForm<CreateTransactionFormData>({ resolver: zodResolver(createSchema) })
    const { setValue: hookFormSetValueCreate, handleSubmit: hookFormHandleSubmitCreate } = createMethods
    const updateMethods = useForm<UpdateTransactionFormData>({ resolver: zodResolver(updateSchema) })
    const { setValue: hookFormSetValueUpdate } = updateMethods

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    function handleOpenCreateModal() {
        hookFormSetValueCreate('type', '')
        hookFormSetValueCreate('date', new Date().toISOString())
        hookFormSetValueCreate('amount', 0)
        hookFormSetValueCreate('description', '')
        hookFormSetValueCreate('account', '')
        hookFormSetValueCreate('category', '')
        hookFormSetValueCreate('status', '')
        hookFormSetValueCreate('card', '')
        hookFormSetValueCreate('contact', '')
        hookFormSetValueCreate('center', '')
        hookFormSetValueCreate('project', '')
        hookFormSetValueCreate('method', '')
        hookFormSetValueCreate('documentNumber', '')
        hookFormSetValueCreate('notes', '')
        hookFormSetValueCreate('competenceDate', new Date().toISOString())
        hookFormSetValueCreate('tags', '')
        setIsCreateModalOpen(!isCreateModalOpen)
    }
    function handleCloseCreateModal() {
        setIsCreateModalOpen(!isCreateModalOpen)
    }
    function handleOpenUpdateModal(transaction: ITransactionDTO) {
        setSelectedTransaction(transaction)
        hookFormSetValueUpdate('id', transaction.id)
        hookFormSetValueUpdate('type', transaction.type)
        hookFormSetValueUpdate('date', transaction.date)
        hookFormSetValueUpdate('amount', transaction.amount)
        hookFormSetValueUpdate('description', transaction.description)
        hookFormSetValueUpdate('account', transaction.account)
        hookFormSetValueUpdate('category', transaction.category)
        hookFormSetValueUpdate('status', transaction.status ?? 'Não informado')
        hookFormSetValueUpdate('card', transaction.card ?? 'Não informado')
        hookFormSetValueUpdate('contact', transaction.contact ?? 'Não informado')
        hookFormSetValueUpdate('center', transaction.center ?? 'Não informado')
        hookFormSetValueUpdate('project', transaction.project ?? 'Não informado')
        hookFormSetValueUpdate('method', transaction.method ?? 'Não informado')
        hookFormSetValueUpdate('documentNumber', transaction.documentNumber ?? 'Não informado')
        hookFormSetValueUpdate('notes', transaction.notes ?? 'Não informado')
        hookFormSetValueUpdate('competenceDate', transaction.competenceDate ?? null)
        hookFormSetValueUpdate('tags', transaction.tags ?? 'Não informado')
        setIsUpdateModalOpen(!isUpdateModalOpen)
    }
    function handleCloseUpdateModal() {
        setIsUpdateModalOpen(!isUpdateModalOpen)
    }
    function handleOpenDeleteModal(category: ITransactionDTO) {
        setSelectedTransaction(category)
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }
    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }

    const { transactions } = useTransactions()
    const { createTransaction } = useCreateTransaction()

    const handleSubmit = hookFormHandleSubmitCreate(
        async ({
            type,
            date,
            amount,
            description,
            account,
            category,
            status,
            card,
            contact,
            center,
            project,
            method,
            documentNumber,
            notes,
            competenceDate,
            tags,
        }: CreateTransactionFormData) => {
            try {
                await createTransaction({
                    type,
                    date: new Date(date),
                    amount,
                    description,
                    account,
                    category,
                    status,
                    card,
                    contact,
                    center,
                    project,
                    method,
                    documentNumber,
                    notes,
                    competenceDate: competenceDate ? new Date(competenceDate) : null,
                    tags,
                })
                handleCloseCreateModal()
            } catch (error) {
                toast.error(parseError(error as AppError))
            }
        },
    )

    const { data: settings } = useQuery<{ settings: ISetting[] }>({
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

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        card: false,
        contact: false,
        project: false,
    })
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8,
    })

    const table = useReactTable({
        data: transactions,
        columns,
        state: {
            sorting,
            pagination,
            columnVisibility,
            globalFilter,
        },
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
        const worksheetData = transactions.map((transaction) => ({
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
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        })
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
    const transformedTags = tags.map((tag) => ({
        field: tag.name,
        value: tag.id,
    }))

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
        handleSubmit,
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

export function Transactions() {
    const {
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
        handleSubmit,
        isCreateModalOpen,
        isUpdateModalOpen,
        isDeleteModalOpen,
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
    } = useTransactionsController()

    const {
        control: hookFormControlCreate,
        setValue: hookFormSetValueCreate,
        formState: { errors: hookFormErrosCreate },
        register: hookFormRegisterCreate,
    } = createMethods

    const triggerRef = useRef<HTMLButtonElement>(null)
    const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (triggerRef.current) {
            setDropdownWidth(triggerRef.current.getBoundingClientRect().width)
        }
    }, [])

    async function exportWorksheet() {
        try {
            const response = await axios.get('/conciliations/export-worksheet', {
                responseType: 'blob',
            })
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: 'application/vnd.ms-excel' }),
            )
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'lancamentos-obra-facil.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Erro ao exportar a planilha:', error)
        }
    }

    return (
        <Fragment>
            <Helmet title="Lançamentos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>
                <FormProvider {...createMethods}>
                    <div className={cn('relative w-full space-y-2.5 !overflow-x-auto', containerClassName)}>
                        <div className="w-full">
                            <div className="flex items-center py-4 justify-end">
                                <RdxInput
                                    placeholder="Buscar lançamentos..."
                                    value={globalFilter}
                                    onChange={(event) => setGlobalFilter(event.target.value)}
                                    className="max-w-sm mr-4 min-w-20 h-8 px-2.5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/50 shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-0 focus-visible:border-primary cursor-text"
                                />
                                <div className="flex space-x-4 ml-auto items-center gap-2 p-px">
                                    <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
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
                                        <DialogContent className="sm:max-w-5xl p-8" title="Criar lançamento">
                                            <DialogHeader>
                                                <DialogTitle>Cadastrar lançamento</DialogTitle>
                                                <DialogDescription>
                                                    Preencha os campos abaixo para cadastrar um novo lançamento.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form
                                                onSubmit={handleSubmit}
                                                className="flex flex-col flex-wrap space-y-2 bg-white pt-6 dark:border-slate-400 dark:bg-slate-800"
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
                                                                selected={field.value ? new Date(field.value) : new Date()}
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
                                                                    selected={field.value ? new Date(field.value) : new Date()}
                                                                    onChange={(date) => field.onChange(date)}
                                                                    error={hookFormErrosCreate.competenceDate?.message}
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                    {getFieldInfo('documentNumber')?.isEnabled && (
                                                        <Input
                                                            id="document-number"
                                                            label="Nº do documento"
                                                            placeholder="Digite o número do documento"
                                                            error={hookFormErrosCreate.documentNumber?.message}
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
                                    </Dialog>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="xs"
                                        className="!py-0 text-[13px] font-medium"
                                        onClick={exportWorksheet}
                                    >
                                        <ArrowUpOnSquareIcon className="mr-1.5 size-4" strokeWidth={2} />
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
                                            style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
                                        >
                                            {table
                                                .getAllColumns()
                                                .filter((column: Column<ITransactionDTO>) => column.getCanHide())
                                                .map((column: Column<ITransactionDTO>) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        className="w-full text-[13px]"
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.original.id} data-state={row.getIsSelected() && 'selected'}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center relative">
                                                    <p className="fixed top-[43.8%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 h-24 text-center">
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
        </Fragment>
    )
}
