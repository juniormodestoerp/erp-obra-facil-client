import {
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	type VisibilityState,
	getFilteredRowModel,
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Button } from '@views/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'
import { Input } from '@views/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@views/components/ui/table'
import { columns } from '@views/pages/private/conciliations/components/columns'
import { PaginationControls } from '@views/pages/private/conciliations/components/pagination-controls'
import { type ChangeEvent, useState } from 'react'
import type { IVerifiedTransaction } from '@app/services/conciliations/verify-xlsx'
import { getColumnName } from '@views/pages/private/conciliations/components/get-column-name'

interface Props {
	data: IVerifiedTransaction[]
	conflictingTransactions: IVerifiedTransaction[]
	handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
}

export function DataTable({
	data,
	conflictingTransactions,
	handleFileUpload,
}: Props) {
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
		data,
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
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	return (
		<div className="w-full">
			<div className="flex items-center py-4 justify-end">
				<Input
					placeholder="Buscar lançamentos..."
					value={globalFilter}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className="max-w-sm inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				/>
				<div className="w-full flex justify-end">
					<div className="flex items-end justify-between h-fit">
						<input
							type="file"
							accept=".xls,.xlsx"
							onChange={handleFileUpload}
							style={{ display: 'none' }}
							id="file-upload"
						/>
						<Button
							type="button"
							onClick={() => document.getElementById('file-upload')?.click()}
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
									Escolher colunas <ChevronDown className="ml-2 h-4 w-4" />
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
			<div className="rounded-md border">
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
									key={row.id}
									className={
										conflictingTransactions.some(
											(tr) => tr.id === row.original.id,
										)
											? 'bg-red-200'
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
	)
}
