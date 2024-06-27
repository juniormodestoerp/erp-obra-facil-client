import { useBankAccounts } from '@app/hooks/bank-accounts/use-bank-accounts'
import { useCategories } from '@app/hooks/categories/use-categories'
import { useCostAndProfitCenters } from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { usePaymentMethods } from '@app/hooks/payment-methods/use-payment-methods'
import { useTags } from '@app/hooks/tags/use-tags'
import { useSidebar } from '@app/hooks/use-sidebar'
import { conciliationsService } from '@app/services/conciliations'
import type { IOFXTransactionParams } from '@app/services/conciliations/verify-ofx'
import type {
	ITransactionParams,
	IVerifiedTransaction,
} from '@app/services/conciliations/verify-xlsx'
import { type AppError, parseError } from '@app/services/http-client'
import { cn } from '@app/utils/cn'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Input } from '@views/components/input'
import { InputCurrency } from '@views/components/input/currency'
import { InputMask } from '@views/components/input/mask'
import { PageTitle } from '@views/components/page-title'
import { Select } from '@views/components/select'
import { Button } from '@views/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
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
import { Caption } from '@views/pages/private/conciliations/components/caption'
import { columns } from '@views/pages/private/conciliations/components/columns'
import { getColumnName } from '@views/pages/private/conciliations/components/get-column-name'
import { PaginationControls } from '@views/pages/private/conciliations/components/pagination-controls'
import { ChevronDown } from 'lucide-react'
import ofx from 'node-ofx-parser'
import { type ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'
import { z } from 'zod'

interface IVerifiedExcelData {
	newTransactions: IVerifiedTransaction[]
	conflictingTransactions: IVerifiedTransaction[]
}

const createSchema = z.object({
	type: z.string(strMessage('tipo')).nullable().default(null),
	date: z.string(dateMessage('data')).nullable().default(null),
	amount: z
		.union([z.string(strMessage('valor')), z.number(numbMessage('valor'))])
		.transform((value: string | number) => {
			const fmtValue = Format.cleanCurrency(value)
			return fmtValue
		})
		.nullable()
		.default(null),
	description: z.string(strMessage('descrição')).nullable().default(null),
	account: z.string(strMessage('conta')).nullable().default(null),
	transferAccount: z
		.string(strMessage('conta transferência'))
		.nullable()
		.default(null),
	card: z.string(strMessage('cartão')).nullable().default(null),
	category: z.string(strMessage('categoria')).nullable().default(null),
	subcategory: z.string(strMessage('subcategoria')).nullable().default(null),
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
type CreateFormData = z.infer<typeof createSchema>

export function Conciliations() {
	const {
		register: createRegister,
		control: createControl,
		setValue: createSetValue,
		handleSubmit: createHandleSubmit,
		formState: { errors: createErrors },
	} = useForm<CreateFormData>({
		resolver: zodResolver(createSchema),
	})

	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])
	const [excelData, setExcelData] = useState<IVerifiedExcelData>(
		{} as IVerifiedExcelData,
	)

	const combinedData = useMemo(
		() => [
			...(excelData.newTransactions ?? []),
			...(excelData.conflictingTransactions ?? []),
		],
		[excelData],
	)

	const isSingleImport = selectedRowIds.length === 1

	useEffect(() => {
		const findTransactionById = (
			id: string,
			transactions: IVerifiedTransaction[],
		): IVerifiedTransaction | undefined => {
			return transactions.find((transaction) => transaction.id === id)
		}
		if (isSingleImport) {
			createSetValue(
				'type',
				(findTransactionById(selectedRowIds[0], combinedData)
					?.amount as number) > 0
					? 'Receita'
					: 'Despesa',
			)
			createSetValue(
				'amount',
				findTransactionById(selectedRowIds[0], combinedData)?.amount as number,
			)
			createSetValue(
				'description',
				findTransactionById(selectedRowIds[0], combinedData)
					?.description as string,
			)
			createSetValue(
				'date',
				Format.parseIso(
					findTransactionById(selectedRowIds[0], combinedData)?.date as string,
				),
			)
		}
	}, [isSingleImport, createSetValue, selectedRowIds, combinedData])

	function handleXLSXFileUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target
		const file = input.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = async (e) => {
				const data = e.target?.result
				if (typeof data === 'string' || data instanceof ArrayBuffer) {
					const workbook = XLSX.read(data, { type: 'array' })
					const sheetName = workbook.SheetNames[0]
					const sheet = workbook.Sheets[sheetName]
					const json = XLSX.utils.sheet_to_json(sheet, {
						defval: null,
						raw: true,
					})
					try {
						const response = await conciliationsService.verifyXlxl(
							json as ITransactionParams[],
						)
						setExcelData(response)
					} catch (error) {
						console.error('Error verifying Excel data:', error)
					} finally {
						input.value = ''
					}
				}
			}
			reader.readAsArrayBuffer(file)
		}
	}

	function mapOFXToTransactionParams(ofxData: any): IOFXTransactionParams[] {
		return ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
			(transaction: any) => ({
				date: transaction.DTPOSTED || '',
				amount: Number.parseFloat(transaction.TRNAMT) || 0,
				description: transaction.NAME || transaction.MEMO || '',
				account: null,
				transferAccount: null,
				card: null,
				category: null,
				subcategory: null,
				contact: null,
				center: null,
				project: null,
				method: transaction.TRNTYPE || null,
				documentNumber: transaction.CHECKNUM || null,
				notes: transaction.MEMO || null,
				competenceDate: null,
				tags: null,
			}),
		)
	}

	async function handleOFXFileUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target
		const file = input.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = async (e) => {
				const data = e.target?.result
				if (typeof data === 'string') {
					try {
						const parsedData = ofx.parse(data)
						const transactions = mapOFXToTransactionParams(parsedData)
						const response = await conciliationsService.verifyOfx(transactions)
						setExcelData(response)
					} catch (error) {
						console.error('Error verifying OFX data:', error)
					} finally {
						input.value = ''
					}
				}
			}
			reader.readAsText(file)
		}
	}

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
		value: tag.name,
	}))

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		transferAccount: false,
		subcategory: false,
		card: false,
		documentNumber: false,
	})
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 8,
	})
	const [globalFilter, setGlobalFilter] = useState<string>('')

	const table = useReactTable({
		data: combinedData,
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const selectedIds = table
			.getSelectedRowModel()
			.rows.map((row) => row.original.id)
		setSelectedRowIds(selectedIds)
	}, [table.getSelectedRowModel().rows])

	const handleSubmit = createHandleSubmit(async (formData: CreateFormData) => {
		const combinedData = [
			...(excelData.newTransactions ?? []),
			...(excelData.conflictingTransactions ?? []),
		]

		try {
			if (selectedRowIds.length === 1) {
				const id = selectedRowIds[0]
				const item = combinedData.find((i) => i.id === id)
				if (item) {
					const updatedItem = { ...item, ...formData }
					await conciliationsService.addOne(updatedItem)
				}
			} else if (selectedRowIds.length > 1) {
				const updatedItems = selectedRowIds
					.map((id) => {
						const item = combinedData.find((i) => i.id === id)
						if (item) {
							return {
								...item,
								...formData,
								date: item.date,
								amount: item.amount,
								description: item.description,
							}
						}

						return null
					})
					.filter((item) => item !== null) as IVerifiedTransaction[]
				await conciliationsService.addMany(updatedItems)
			}
		} catch (error) {
			toast.error(parseError(error as AppError))
			console.error('Error submitting data:', error)
		}
	})

	const { isSidebarSmall } = useSidebar()

	const containerClassName = useMemo(
		() =>
			cn(
				'overflow-x-hidden flex items-start',
				isSidebarSmall
					? combinedData.length > 0
						? 'lg:max-w-[calc(100vw-662px)]'
						: 'lg:max-w-[calc(100vw-148px)]'
					: combinedData.length > 0
						? 'lg:max-w-[calc(100vw-806px)]'
						: 'lg:max-w-[calc(100vw-294px)]',
			),
		[isSidebarSmall, combinedData.length],
	)

	return (
		<Fragment>
			<Helmet title="Conciliações" />

			<div className="flex items-start justify-between">
				<div>
					<PageTitle
						title="Conciliações"
						description="Resolva as conciliações de suas transações que estão pendentes de resolução."
					/>
				</div>
				<Caption />
			</div>

			<div className="flex items-center justify-between gap-4">
				<div className={containerClassName}>
					<div className="w-full">
						<div className="flex items-center py-4 justify-end">
							<RdxInput
								placeholder="Buscar lançamentos..."
								value={globalFilter}
								onChange={(event) => setGlobalFilter(event.target.value)}
								className="max-w-sm mr-4 min-w-20 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/50 shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-0 focus-visible:border-primary cursor-text"
							/>
							<div className="w-full flex justify-end">
								<div className="flex items-end justify-between h-fit">
									<input
										type="file"
										accept=".ofx"
										onChange={handleOFXFileUpload}
										style={{ display: 'none' }}
										id="file-upload-ofx"
									/>
									<Button
										type="button"
										onClick={() =>
											document.getElementById('file-upload-ofx')?.click()
										}
										variant="outline"
										className="mr-4 focus-visible:border-primary focus-visible:ring-0"
									>
										Importar OFX
									</Button>

									<input
										type="file"
										accept=".xls,.xlsx"
										onChange={handleXLSXFileUpload}
										style={{ display: 'none' }}
										id="file-upload-xlsx"
									/>
									<Button
										type="button"
										onClick={() =>
											document.getElementById('file-upload-xlsx')?.click()
										}
										variant="outline"
										className="mr-4 focus-visible:border-primary focus-visible:ring-0"
									>
										Planilha Excel
									</Button>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												className="ml-auto focus-visible:border-primary focus-visible:ring-0"
											>
												Escolher colunas{' '}
												<ChevronDown className="ml-2 h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											{table
												.getAllColumns()
												.filter((column) => column.getCanHide())
												.map((column) => (
													<DropdownMenuCheckboxItem
														key={column.id}
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
												className={
													excelData.conflictingTransactions.some(
														(tr) => tr.id === row.original.id,
													)
														? 'bg-red-200 hover:bg-red-200/90'
														: ''
												}
												data-state={row.getIsSelected() && 'selected'}
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
				{combinedData.length > 0 && (
					<form
						onSubmit={handleSubmit}
						className="border border-zinc-300 flex flex-col w-full rounded-md h-auto max-h-[calc(100vh-400px)] px-3 pt-1 pb-3 space-y-1.5"
					>
						<h1 className="text-xl font-medium text-dark-blue">
							Dados do lançamento
						</h1>
						{isSingleImport && (
							<>
								<div className="flex gap-x-4">
									<Select
										label="Tipo:"
										name="type"
										control={createControl}
										data={[
											{ field: 'Receita', value: 'Receita' },
											// { field: 'Transferência', value: 'Transferência' },
											{ field: 'Despesa', value: 'Despesa' },
										]}
									/>
									<InputCurrency
										label="Valor:"
										placeholder="Digite o valor"
										control={createControl}
										error={createErrors?.amount?.message}
										{...createRegister('amount')}
									/>
								</div>

								<div className="flex gap-x-4">
									<Input
										label="Descrição:"
										placeholder="Digite a descrição"
										error={createErrors?.description?.message}
										{...createRegister('description')}
									/>
									<div className="w-[30%]">
										<InputMask
											mask="99/99/9999"
											label="Data:"
											placeholder="Digite a data"
											error={createErrors?.date?.message}
											{...createRegister('date')}
										/>
									</div>
								</div>
							</>
						)}

						<div className="flex gap-x-4">
							<Select
								label="Conta:"
								name="account"
								control={createControl}
								data={transformedAccounts}
							/>
							<Select
								label="Categoria:"
								name="category"
								control={createControl}
								data={transformedCategories}
							/>
						</div>
						<div className="flex gap-x-4">
							<Select
								label="Centro de custo:"
								name="center"
								control={createControl}
								data={transformedCenters}
							/>
							<Select
								label="Forma de pagamento:"
								name="method"
								control={createControl}
								data={transformedMethod}
							/>
						</div>
						<div className="flex gap-x-4">
							<Input
								label="Observações:"
								optional
								className="w-full max-w-lg"
								placeholder="Digite as observações"
								error={createErrors?.notes?.message}
								{...createRegister('notes')}
							/>
						</div>
						<div className="flex gap-x-4">
							<Select
								label="Tags:"
								name="tags"
								control={createControl}
								data={transformedTags}
							/>
						</div>
						<Button type="submit" className="w-full">
							Salvar
						</Button>
					</form>
				)}
			</div>
		</Fragment>
	)
}
