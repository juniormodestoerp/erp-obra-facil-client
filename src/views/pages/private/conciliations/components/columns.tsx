import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import type { IVerifiedTransaction } from '@app/services/conciliations/verify-xlsx'
import { Format } from '@app/utils/format'
import { Button } from '@views/components/ui/button'
import { Checkbox } from '@views/components/ui/checkbox'
import { getColumnName } from '@views/pages/private/conciliations/components/get-column-name'

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
				className="text-zinc-900 w-fit "
			>
				{getColumnName('date')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{Format.parseIso(row.getValue('date'))}
			</div>
		),
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('amount')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="text-right font-medium">
				{Format.currency(row.getValue('amount'))}
			</div>
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit min-w-64"
			>
				{getColumnName('description')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('description')}
			</div>
		),
	},
	{
		accessorKey: 'account',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('account')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('account')}
			</div>
		),
	},
	{
		accessorKey: 'transferAccount',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('transferAccount')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('transferAccount')}
			</div>
		),
	},
	{
		accessorKey: 'card',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('card')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('card')}
			</div>
		),
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('category')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('category')}
			</div>
		),
	},
	{
		accessorKey: 'subcategory',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('subcategory')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('subcategory')}
			</div>
		),
	},
	{
		accessorKey: 'contact',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('contact')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('contact')}
			</div>
		),
	},
	{
		accessorKey: 'center',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('center')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('center')}
			</div>
		),
	},
	{
		accessorKey: 'project',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('project')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('project')}
			</div>
		),
	},
	{
		accessorKey: 'method',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('method')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('method')}
			</div>
		),
	},
	{
		accessorKey: 'documentNumber',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('documentNumber')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('documentNumber')}
			</div>
		),
	},
	{
		accessorKey: 'notes',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('notes')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('notes')}
			</div>
		),
	},
	{
		accessorKey: 'competenceDate',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('competenceDate')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('competenceDate')}
			</div>
		),
	},
	{
		accessorKey: 'tags',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="text-zinc-900 w-fit "
			>
				{getColumnName('tags')}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="min-h-10 flex items-center  w-fit ">
				{row.getValue('tags')}
			</div>
		),
	},
]
