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
import { cn } from '@app/utils/cn'
import { FormProvider } from 'react-hook-form'
import { columns } from './components/columns'
import { TransactionsTableFilters } from './components/transactions-table-filters'
import { useTransactionsController } from './use-transactions-controller'

export function Transactions() {
  const {
    table,
    result,
    isError,
    isPending,
    methods,
    fetchData,
    handlePaginate,
    globalFilter,
    setGlobalFilter,
    // isDeleteModalOpen,
    // setIsDeleteModalOpen,
    // selectedTransaction,
    // setSelectedTransaction,
  } = useTransactionsController()

  if (isPending) return <div>Carregando...</div>
  if (isError) return <div>Error ao carregar os lançamentos.</div>
  if (!result) return <div>Nenhuma lançamento foi encontrado.</div>

  return (
    <Fragment>
      <Helmet title="Lançamentos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>

        <FormProvider {...methods}>
          <div className="relative w-full space-y-2.5 !overflow-x-auto">
            <TransactionsTableFilters
              table={table}
              onFetchData={fetchData}
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
                            header.column.id === 'actions' ? 'w-12' : '',
                            header.column.id === 'establishmentName'
                              ? 'w-36'
                              : '',
                            header.column.id === 'transactionDate'
                              ? 'w-[85px]'
                              : '',
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
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={
                          row.getIsSelected() ? 'selected' : undefined
                        }
                      >
                        {row.getVisibleCells().map((cell, idx) => (
                          <TableCell
                            key={cell.id}
                            className={cn('py-3', idx === 0 ? 'pl-4 pr-4' : '')}
                          >
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
                        className="h-24 text-center"
                      >
                        Nenhum resultado encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* END OF TABLE */}
            <Pagination
              pageIndex={result.meta.pageIndex}
              pageSize={result.meta.perPage}
              totalCount={result.meta.totalCount}
              onPageChange={handlePaginate}
            />
          </div>
        </FormProvider>
      </div>
    </Fragment>
  )
}
