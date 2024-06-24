import { zodResolver } from '@hookform/resolvers/zod'
import type { Column, Table } from '@tanstack/react-table'
import { ChevronDownIcon, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

import type { ITransaction } from '@app/services/transactions/fetch'
import { numbMessage, strMessage } from '@app/utils/custom-zod-error'
import { getColumnName } from '@app/utils/switchs/transactions'

import { Button } from '@views/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'

import { DebouncedInput } from '@views/components/input/debounce'
import { Dialog, DialogTrigger } from '@views/components/ui/dialog'
import { ArrowUpOnSquareIcon, PlusIcon } from '@heroicons/react/24/outline'

import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'
import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'

const searchParamsSchema = z.object({
	pageIndex: z.number(numbMessage('número da página')),
	searchTerm: z.string(strMessage('termo de busca')).optional(),
})

export type SearchParams = z.infer<typeof searchParamsSchema>

interface Props {
	table: Table<ITransaction>
	globalFilter: string
	setGlobalFilter: (filter: string) => void
}

export function TransactionsTableFilters({
	table,
	globalFilter,
	setGlobalFilter,
}: Props) {
	const { openCreateDialog, setOpenCreateDialog } = useTransactionsController()

	const { reset } = useForm<SearchParams>({
		resolver: zodResolver(searchParamsSchema),
		defaultValues: {
			pageIndex: 1,
			searchTerm: '',
		},
	})

	const handleResetFilter = useCallback(() => {
		reset({
			pageIndex: 1,
			searchTerm: '',
		})
		setGlobalFilter('')
	}, [reset, setGlobalFilter])

	const triggerRef = useRef<HTMLButtonElement>(null)
	const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
		undefined,
	)

	useEffect(() => {
		if (triggerRef.current) {
			setDropdownWidth(triggerRef.current.getBoundingClientRect().width)
		}
	}, [])

	async function exportWorksheet() {
		try {
			const response = await axios.get('/conciliations/export-worksheet', {
				responseType: 'blob', // Para receber o arquivo binário
			})

			// Criar um link para download
			const url = window.URL.createObjectURL(
				new Blob([response.data], { type: 'application/vnd.ms-excel' }),
			)
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', 'lancamentos-obra-facil.xls') // Nome do arquivo a ser baixado
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		} catch (error) {
			console.error('Erro ao exportar a planilha:', error)
		}
	}

	return (
		<form className="flex items-center gap-2 p-px">
			<span className="text-sm font-semibold">Filtros:</span>

			<DebouncedInput
				tabIndex={0}
				name="searchTerm"
				autoComplete="off"
				placeholder="Busque por informações da clínica..."
				className="mr-2 h-8 w-[320px] !rounded-md border-zinc-300 shadow-sm placeholder:text-[13px]"
				value={globalFilter ?? ''}
				onChange={(value) => setGlobalFilter(String(value))}
				debounce={500}
			/>

			<Button
				type="button"
				variant="outline"
				size="xs"
				className="!py-0 text-[13px] font-medium"
				onClick={handleResetFilter}
			>
				<X className="mr-1.5 size-4" />
				Remover filtros
			</Button>

			<div className="flex space-x-4 ml-auto !items-center">
				<Dialog
					open={openCreateDialog}
					onOpenChange={() => setOpenCreateDialog(!openCreateDialog)}
				>
					<DialogTrigger asChild>
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="!py-0 text-[13px] font-medium"
							onClick={() => setOpenCreateDialog(true)}
						>
							<PlusIcon className="mr-1.5 size-4" strokeWidth={2.2} />
							Cadastrar
						</Button>
					</DialogTrigger>
					<NewFundRealeaseContent />
				</Dialog>

				<Button
					type="button"
					variant="outline"
					size="xs"
					className="!py-0 text-[13px] font-medium"
					onClick={exportWorksheet}
				>
					<ArrowUpOnSquareIcon className="mr-1.5 size-4" strokeWidth={2} />
					Exportar
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild className="!py-0">
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="ml-auto !py-0 text-[13px] font-medium"
							ref={triggerRef}
						>
							Selecionar colunas <ChevronDownIcon className="ml-1.5 size-4" />
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
