import { PlusIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, SearchCheck, X } from 'lucide-react'
import { Column } from '@tanstack/react-table'

import { Button } from '@views/components/ui/button'
import { Dialog, DialogTrigger } from '@views/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'

import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'
import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'
import { ITransaction } from '@app/services/transactions/fetch'
import { useEffect, useRef, useState } from 'react'
import { getColumnName } from '@app/utils/switchs/transactions'

import { Input } from '@views/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@views/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { numbMessage, strMessage } from '@app/utils/custom-zod-error'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const searchParamsSchema = z.object({
  pageIndex: z.number(numbMessage('número da página')),
  searchTerm: z.string(strMessage('termo de busca')).optional(),
})

export type SearchParams = z.infer<typeof searchParamsSchema>

interface Props {
  table: any
  globalFilter: string
  setGlobalFilter: (value: string) => void
  onFetchData: (params: SearchParams) => void
}

export function TransactionsTableFilters({
  table,
  globalFilter,
  setGlobalFilter,
  onFetchData,
}: Props) {
  const { openCreateDialog, setOpenCreateDialog } = useTransactionsController()
  const [searchParams, setSearchParams] = useSearchParams()

  const { reset, watch } = useForm<SearchParams>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {
      pageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
      searchTerm: searchParams.get('searchTerm') ?? '',
    },
  })

  const pageIndex = watch('pageIndex')

  function handleResetFilter() {
    reset({
      pageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
      searchTerm: searchParams.get('searchTerm') ?? '',
    })
    setGlobalFilter('')
    setSearchParams({ pageIndex: '1' }, { replace: true })
  }

  const triggerRef = useRef<HTMLButtonElement>(null)
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
    undefined,
  )

  useEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(triggerRef.current.getBoundingClientRect().width)
    }
  }, [])

  return (
    <form className="flex items-center gap-2 p-px">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Informações do lançamento..."
        className="h-8 w-full"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/* <Select defaultValue="all">
        <div className="">
          <SelectTrigger className="h-8 w-44">
            <SelectValue />
          </SelectTrigger>
        </div>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="scheduled">Agendados</SelectItem>
          <SelectItem value="approved">Aprovados</SelectItem>
          <SelectItem value="reconciled">Conciliados</SelectItem>
        </SelectContent>
      </Select> */}

      <Button
        type="submit"
        variant="outline"
        size="xs"
        className="ml-aut !py-0 text-[13px] font-medium"
        onClick={() =>
          onFetchData({
            pageIndex,
            searchTerm: globalFilter,
          })
        }
      >
        <SearchCheck className="mr-1.5 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        className="ml-aut !py-0 text-[13px] font-medium"
        onClick={handleResetFilter}
      >
        <X className="mr-1.5 h-4 w-4" />
        Remover filtros
      </Button>

      <Dialog
        open={openCreateDialog}
        onOpenChange={() => setOpenCreateDialog(!openCreateDialog)}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="ml-aut !py-0 text-[13px] font-medium"
            onClick={() => setOpenCreateDialog(true)}
          >
            <PlusIcon className="mr-1.5 h-4 w-4" strokeWidth={2.2} />
            Cadastrar
          </Button>
        </DialogTrigger>
        <NewFundRealeaseContent />
      </Dialog>

      <div className="space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="!py-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-aut !py-0 text-[13px] font-medium"
              ref={triggerRef}
            >
              Selecionar colunas <ChevronDownIcon className="ml-1.5 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
          >
            {table
              .getAllColumns()
              .filter((column: Column<ITransaction>) => column.getCanHide())
              .map((column: Column<ITransaction>) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="w-full text-[13px]"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {getColumnName(column.id)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  )
}
