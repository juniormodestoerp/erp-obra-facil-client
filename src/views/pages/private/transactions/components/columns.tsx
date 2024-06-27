import type { ITransaction } from '@app/services/transactions/fetch'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { ColumnDef, Row } from '@tanstack/react-table'

import {
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

import { Format } from '@app/utils/format'
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
import { getColumnName } from '@app/utils/switchs/transactions'
import { ArrowUpDown } from 'lucide-react'
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
						<PencilSquareIcon className="h-5 w-5 text-dark-blue" />
						<p className="group-hover:text-dark-blue">Editar</p>
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
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Data
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{Format.parseIso(row.getValue('date'))}
			</div>
		),
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Valor
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{Format.currency(row.getValue('amount'))}
			</div>
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Descrição
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{row.getValue('description')}
			</div>
		),
	},
	{
		accessorKey: 'account',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Conta
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{row.getValue('account')}
			</div>
		),
	},
	{
		accessorKey: 'card',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Cartão
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">{row.getValue('card')}</div>
		),
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Categoria
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{row.getValue('category')}
			</div>
		),
	},
	{
		accessorKey: 'contact',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Contato
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{row.getValue('contact')}
			</div>
		),
	},
	{
		accessorKey: 'center',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Centro de custo
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">{row.getValue('center')}</div>
		),
	},
	{
		accessorKey: 'project',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Projeto
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{row.getValue('project')}
			</div>
		),
	},
	{
		accessorKey: 'method',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="w-fit text-dark-blue hover:text-darker-blue"
				>
					Método de pagamento
					<ArrowUpDown className="ml-1 size-4" />
				</Button>
			)
		},

		cell: ({ row }) => (
			<div className="text-[13px] tracking-tight">
				{row.getValue('method')}
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
