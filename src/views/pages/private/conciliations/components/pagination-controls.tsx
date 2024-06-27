import type { IVerifiedTransaction } from '@app/services/conciliations/verify-xlsx'
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/20/solid'
import type { Table } from '@tanstack/react-table'
import { Button } from '@views/components/ui/button'
import { Input } from '@views/components/ui/input'

interface Props {
	table: Table<IVerifiedTransaction>
}

export function PaginationControls({ table }: Props) {
	return (
		<div className="mt-4 flex items-center justify-between">
			<span className="text-sm text-zinc-800">
				Total de {table.getCoreRowModel().rows.length} item(s)
			</span>
			<div className="flex items-center justify-end gap-4">
				<div className="flex items-center gap-6 lg:gap-8">
					<div className="flex items-center text-sm font-medium">
						Página
						<Input
							type="text"
							value={table.getState().pagination.pageIndex + 1}
							onChange={(e) => {
								const pageIndex = e.target.value
									? Number(e.target.value) - 1
									: 0
								table.setPageIndex(pageIndex)
							}}
							className="mx-1.5 h-8 w-8 border border-input bg-background p-0 text-center !text-sm !font-medium shadow-sm ring-0 hover:bg-accent hover:text-accent-foreground focus:border-zinc-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
						/>
						de {table.getPageCount()}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						variant="outline"
						className="h-8 w-8 p-0 !border-zinc-300 !text-zinc-900"
					>
						<ChevronDoubleLeftIcon className="size-5" strokeWidth={3} />
						<span className="sr-only">Primeira página</span>
					</Button>
					<Button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						variant="outline"
						className="h-8 w-8 p-0 !border-zinc-300 !text-zinc-900"
					>
						<ChevronLeftIcon className="size-5" strokeWidth={3} />
						<span className="sr-only">Página anterior</span>
					</Button>
					<Button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						variant="outline"
						className="h-8 w-8 p-0 !border-zinc-300 !text-zinc-900"
					>
						<ChevronRightIcon className="size-5" strokeWidth={3} />
						<span className="sr-only">Próxima página</span>
					</Button>
					<Button
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
						variant="outline"
						className="h-8 w-8 p-0 !border-zinc-300 !text-zinc-900"
					>
						<ChevronDoubleRightIcon className="size-5" strokeWidth={3} />
						<span className="sr-only">Última página</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
