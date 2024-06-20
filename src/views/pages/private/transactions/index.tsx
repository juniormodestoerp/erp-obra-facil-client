import { cn } from '@app/utils/cn'
import { flexRender } from '@tanstack/react-table'
import { Pagination } from '@views/components/pagination'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@views/components/ui/table'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider } from 'react-hook-form'
import { columns } from './components/columns'
import { TransactionsTableFilters } from './components/transactions-table-filters'
import { useTransactionsController } from './use-transactions-controller'
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { NewFundRealeaseContent } from './components/new-transaction-content'
import { mapBankName } from '@app/utils/bank-map'
import { useTransaction } from '@app/hooks/use-transaction'

export function Transactions() {
	const {
		table,
		result,
		methods,
		globalFilter,
		handleRowDoubleClick,
		selectedTransaction,
		isLoading,
		setGlobalFilter,
		handlePaginate,
		filteredCategories,
	} = useTransactionsController()

	const { isTransactionOpen, openTransaction, closeTransaction } =
		useTransaction()

	if (isLoading) return <div>Carregando...</div>

	return (
		<Fragment>
			<Helmet title="Lançamentos" />

			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>

				<FormProvider {...methods}>
					<div className="relative w-full space-y-2.5 !overflow-x-auto">
						<TransactionsTableFilters
							table={table}
							globalFilter={globalFilter}
							setGlobalFilter={setGlobalFilter}
						/>

						{/* START OF TABLE */}
						<div className="w-full !overflow-x-auto rounded-md border">
							<Table className="w-full min-w-full table-fixed !overflow-x-auto bg-white">
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow key={headerGroup.id}>
											{headerGroup.headers.map((header, idx) => (
												<TableHead
													key={header.id}
													className={cn(
														'py-3',
														idx === 0 ? 'pl-4 pr-4' : '',
														header.column.id === 'actions' && 'w-16',
													)}
												>
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
									{table.getRowModel().rows.length > 0 ? (
										table.getRowModel().rows.map((row) => (
											<TableRow
												key={row.id}
												data-state={
													row.getIsSelected() ? 'selected' : undefined
												}
												onDoubleClick={() => handleRowDoubleClick(row.original)}
											>
												{row.getVisibleCells().map((cell, idx) => (
													<TableCell
														key={cell.id}
														className={cn('py-3', idx === 0 ? 'pl-8 pr-4' : '')}
													>
														{cell.column.id === 'bankName' ? (
															<span>
																{mapBankName(
																	cell.getContext().getValue() as string,
																)}
															</span>
														) : (
															flexRender(
																cell.column.columnDef.cell,
																cell.getContext(),
															)
														)}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={columns.length}
												className="h-24 text-center"
											>
												Nenhum resultado encontrado.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
						{!isLoading && result && (
							<Pagination
								pageIndex={result.meta.pageIndex}
								pageSize={result.meta.perPage}
								totalCount={result.meta.totalCount}
								onPageChange={handlePaginate}
							/>
						)}
					</div>
				</FormProvider>
			</div>
			{/* 
			<Dialog
				open={openCreateDialog}
				onOpenChange={(open) => {
					setOpenCreateDialog(open)
				}}
			>
				<DialogOverlay />
				<DialogTrigger asChild>
					<button type="button" className="hidden" />
				</DialogTrigger>
				<NewFundRealeaseContent
					transaction={selectedTransaction}
					filteredCategories={filteredCategories}
				/>
			</Dialog> */}

			<Dialog
				open={isTransactionOpen}
				onOpenChange={(open) => {
					open ? openTransaction() : closeTransaction()
				}}
			>
				<DialogOverlay />
				<DialogTrigger asChild>
					<button type="button" className="hidden" />
				</DialogTrigger>
				<NewFundRealeaseContent
					transaction={selectedTransaction}
					filteredCategories={filteredCategories}
				/>
			</Dialog>
		</Fragment>
	)
}
