import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
	pageIndex: number
	pageSize: number
	totalCount: number
	onPageChange: (newPageIndex: number) => void
}

export function Pagination({
	pageIndex,
	pageSize,
	totalCount,
	onPageChange,
}: Props) {
	const [goToPage, setGoToPage] = useState<string>((pageIndex + 1).toString())
	const totalPages = Math.ceil(totalCount / pageSize)

	const handleGoToPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPage = event.target.value
		if (
			newPage === '' ||
			(Number.parseInt(newPage, 10) >= 1 &&
				Number.parseInt(newPage, 10) <= totalPages)
		) {
			setGoToPage(newPage)
		}
	}

	const handleBlur = () => {
		const pageAsNumber = Number.parseInt(goToPage, 10)
		if (goToPage === '' || pageAsNumber < 1 || pageAsNumber > totalPages) {
			setGoToPage((pageIndex + 1).toString())
		}
	}

	const goToPageDirectly = () => {
		const pageAsNumber = Number.parseInt(goToPage, 10)
		if (pageAsNumber >= 1 && pageAsNumber <= totalPages) {
			onPageChange(pageAsNumber - 1)
		}
	}

	useEffect(() => {
		setGoToPage((pageIndex + 1).toString())
	}, [pageIndex])

	return (
		<div className="mt-8 flex items-center justify-between">
			<span className="text-sm text-zinc-800">
				Total de {totalCount} item(s)
			</span>
			<div className="flex items-center gap-6 lg:gap-8">
				<div className="flex items-center text-sm font-medium">
					Página
					<Input
						type="text"
						value={goToPage}
						onChange={handleGoToPageChange}
						onBlur={handleBlur}
						onKeyPress={(event) => event.key === 'Enter' && goToPageDirectly()}
						className="mx-1.5 h-8 w-8 border border-input bg-background p-0 text-center !text-sm !font-medium shadow-sm ring-0 hover:bg-accent hover:text-accent-foreground focus:border-zinc-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
					/>
					de <span className="ml-1.5">{totalPages}</span>
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => onPageChange(0)}
						disabled={pageIndex === 0}
						variant="outline"
						className="h-8 w-8 p-0"
					>
						<ChevronsLeft className="h-4 w-4" />
						<span className="sr-only">Primeira página</span>
					</Button>
					<Button
						onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
						disabled={pageIndex === 0}
						variant="outline"
						className="h-8 w-8 p-0"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Página anterior</span>
					</Button>
					<Button
						onClick={() =>
							onPageChange(Math.min(totalPages - 1, pageIndex + 1))
						}
						disabled={pageIndex >= totalPages - 1}
						variant="outline"
						className="h-8 w-8 p-0"
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Próxima página</span>
					</Button>
					<Button
						onClick={() => onPageChange(totalPages - 1)}
						disabled={pageIndex >= totalPages - 1}
						variant="outline"
						className="h-8 w-8 p-0"
					>
						<ChevronsRight className="h-4 w-4" />
						<span className="sr-only">Última página</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
