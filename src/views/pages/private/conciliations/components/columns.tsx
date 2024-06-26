import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@views/components/ui/button'
import { getColumnName } from '@views/pages/private/conciliations/components/get-column-name'
import type { IVerifiedTransaction } from '@app/services/conciliations/verify-xlsx'
import { Format } from '@app/utils/format'
import { Checkbox } from '@views/components/ui/checkbox'

export const columns: ColumnDef<IVerifiedTransaction>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="border border-foreground text-zinc-900 data-[state=checked]:bg-foreground data-[state=checked]:text-zinc-100 data-[state=checked]:border-zinc-100"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="border border-foreground text-zinc-900 data-[state=checked]:bg-foreground data-[state=checked]:text-zinc-100 data-[state=checked]:border-zinc-100"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('date')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{Format.parseIso(row.getValue('date'))}</div>,
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('amount')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">
					{Format.currency(row.getValue('amount'))}
				</div>
			)
		},
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('description')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('description')}</div>,
	},
	{
		accessorKey: 'account',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('account')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('account')}</div>,
	},
	{
		accessorKey: 'transferAccount',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('transferAccount')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('transferAccount')}</div>,
	},
	{
		accessorKey: 'card',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('card')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('card')}</div>,
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('category')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('category')}</div>,
	},
	{
		accessorKey: 'subcategory',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('subcategory')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('subcategory')}</div>,
	},
	{
		accessorKey: 'contact',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('contact')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('contact')}</div>,
	},
	{
		accessorKey: 'center',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('center')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('center')}</div>,
	},
	{
		accessorKey: 'project',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('project')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('project')}</div>,
	},
	{
		accessorKey: 'method',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('method')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('method')}</div>,
	},
	{
		accessorKey: 'documentNumber',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('documentNumber')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('documentNumber')}</div>,
	},
	{
		accessorKey: 'notes',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('notes')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('notes')}</div>,
	},
	{
		accessorKey: 'competenceDate',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('competenceDate')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('competenceDate')}</div>,
	},
	{
		accessorKey: 'tags',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='text-zinc-900 w-fit max-w-52'
			>
				{getColumnName('tags')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className='min-h-10 flex items-center whitespace-nowrap w-fit max-w-52'>{row.getValue('tags')}</div>,
	},
]
