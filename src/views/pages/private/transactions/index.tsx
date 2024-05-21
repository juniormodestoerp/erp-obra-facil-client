import { Pagination } from '@views/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@views/components/ui/table'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { FormProvider } from 'react-hook-form'
import { TransactionsTableFilters } from './components/transactions-table-filters'
import { TransactionsTableRow } from './components/transactions-table-row'
import { useTransactionsController } from './use-transactions-controller'

export function Transactions() {
  const { methods } = useTransactionsController()

  return (
    <Fragment>
      <Helmet title="Lançamentos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>

        <FormProvider {...methods}>
          <div className="space-y-2.5">
            <TransactionsTableFilters />
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[56px]"></TableHead>
                    <TableHead className="w-[277px] font-medium tracking-tight text-foreground">
                      ID
                    </TableHead>
                    <TableHead className="w-20 font-medium tracking-tight text-foreground">
                      Data
                    </TableHead>
                    <TableHead className="w-28 font-medium tracking-tight text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="font-medium tracking-tight text-foreground">
                      Estabelecimento
                    </TableHead>
                    <TableHead className="w-28 font-medium tracking-tight text-foreground">
                      Total
                    </TableHead>

                    <TableHead className="w-12"></TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, i) => {
                    return <TransactionsTableRow key={i} />
                  })}
                </TableBody>
              </Table>
            </div>
            <Pagination />
          </div>
        </FormProvider>
      </div>
    </Fragment>
  )
}
