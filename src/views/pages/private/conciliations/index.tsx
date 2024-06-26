import { useSidebar } from '@app/hooks/use-sidebar'
import { cn } from '@app/utils/cn'
import { PageTitle } from '@views/components/page-title'
import { Button } from '@views/components/ui/button'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Caption } from '@views/pages/private/conciliations/components/caption'
import { DataTable } from '@views/pages/private/conciliations/components/data-table'
import { useConciliationsController } from '@views/pages/private/conciliations/use-conciliations-controller'

export function Conciliations() {
	const { handleFileUpload, excelData } = useConciliationsController()
	const { isSidebarSmall } = useSidebar()

	console.log('newTransactions', excelData.newTransactions)
	console.log('newTransactions', excelData.conflictingTransactions)

	return (
		<Fragment>
			<Helmet title="Conciliações" />

			<div className="flex items-start justify-between">
				<div>
					<PageTitle
						title="Conciliações"
						description="Resolva as conciliações de suas transações que estão pendentes de resolução."
					/>
				</div>

				<Caption />
			</div>

			<div
				className={cn(
					'overflow-x-hidden',
					isSidebarSmall
						? 'lg:max-w-[calc(100vw-144px)]'
						: 'lg:max-w-[calc(100vw-324px)]',
				)}
			>
				<DataTable
					data={[
						...(excelData.newTransactions ?? []),
						...(excelData.conflictingTransactions ?? []),
					]}
					conflictingTransactions={excelData.conflictingTransactions}
					handleFileUpload={handleFileUpload}
				/>
			</div>
		</Fragment>
	)
}
