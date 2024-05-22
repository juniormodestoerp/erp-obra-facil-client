import { ITransaction } from '@app/services/transactions/fetch'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef, Row } from '@tanstack/react-table'

import {
  ArrowsUpDownIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@views/components/ui/dialog'
import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Format } from '@app/utils/format'
interface PropsActionMenu {
  row: Row<ITransaction>
}

function ActionMenu({ row }: PropsActionMenu) {
  const navigate = useNavigate()

  const { handleRemoveTransaction } = useTransactionsController()

  const [openDropdown, setOpenDropdown] = useState(false)

  const handleViewClick = () => {
    navigate(`/clinics/${row.original.id}/view`)
  }

  const handleEditClick = () => {
    navigate(`/clinics/${row.original.id}/about`)
  }

  return (
    <div className="relative mr-4 w-fit">
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p>Ações</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="group gap-1.5" onClick={handleViewClick}>
            <EyeIcon className="h-5 w-5 text-zinc-600" />
            <p className="group-hover:text-zinc-600">Visualizar</p>
          </DropdownMenuItem>

          <DropdownMenuItem className="group gap-1.5" onClick={handleEditClick}>
            <PencilSquareIcon className="h-5 w-5 text-green-600" />
            <p className="group-hover:text-green-600">Editar</p>
          </DropdownMenuItem>

          <Dialog>
            <DialogTrigger className="group mx-auto flex w-full gap-1.5 rounded-sm p-2 text-sm hover:bg-zinc-100">
              <TrashIcon className="h-5 w-5 text-rose-600" />
              <span className="group-hover:text-rose-600">Remover</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deseja remover a clinica?</DialogTitle>
                <DialogDescription>
                  Você está prestes a remover um registro. Por favor, confirme
                  sua decisão antes de prosseguir.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-end gap-3">
                <DialogClose>
                  <Button
                    type="button"
                    variant="outline"
                    className="mx-0 rounded-md text-zinc-600"
                  >
                    <span className="pt-px">Cancelar</span>
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => handleRemoveTransaction(row.original.id)}
                  className="mx-0 rounded-md border border-red-600 bg-transparent text-red-600 hover:bg-red-100 hover:text-white"
                >
                  <TrashIcon className="mr-1 h-5 w-5 " />
                  <span className="pt-px">Remover</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px]  tracking-tight">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Descrição
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px]  tracking-tight">
        {row.getValue('description')}
      </div>
    ),
  },
  {
    accessorKey: 'categoryName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categoria
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px] tracking-tight">
        {row.getValue('categoryName')}
      </div>
    ),
  },
  {
    accessorKey: 'establishmentName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estabelecimento
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px]  tracking-tight">
        {row.getValue('establishmentName')}
      </div>
    ),
  },
  {
    accessorKey: 'bankName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Banco
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px]  tracking-tight">
        {row.getValue('bankName')}
      </div>
    ),
  },
  {
    accessorKey: 'transactionDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowsUpDownIcon className="ml-1.5 h-4 w-4 text-green-600" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <p className="w-fit text-[13px] tracking-tight">
        {Format.parseIso(row.getValue('transactionDate'))}
      </p>
    ),
  },
  {
    accessorKey: 'previousBalance',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Saldo anterior
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px]  tracking-tight">
        {Format.currency(Number(row.getValue('previousBalance')) * 10)}
      </div>
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor total
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px] tracking-tight">
        {Format.currency(Number(row.getValue('totalAmount')) * 10)}
      </div>
    ),
  },
  {
    accessorKey: 'currentBalance',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Saldo atual
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px] tracking-tight">
        {Format.currency(Number(row.getValue('currentBalance')) * 10)}
      </div>
    ),
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex flex-col px-0 text-dark-blue hover:text-darker-blue"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className="w-12"> Método de</p>
          <p className="w-12"> pagamento</p>
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-[13px] tracking-tight">
        {row.getValue('paymentMethod')}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionMenu row={row} />,
    size: 50,
    minSize: 50,
  },
]
