import { IncomeIcon } from '@/assets/icons/income'
import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PageTitle } from '@views/components/page-title'
import { Tooltip } from '@views/components/tooltip'
import { useCostAndProfitCentersController } from '@views/pages/private/cost-and-profit-centers/use-cost-and-profit-centers-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { CreateCostAndProfitCentersDialog } from './components/create-cost-and-profit-center-dialog'
import { EditCostAndProfitCentersDialog } from './components/edit-cost-and-profit-center-dialog'
import { RemoveCostAndProfitCentersDialog } from './components/remove-cost-and-profit-center-dialog'

export function CostAndProfitCenters() {
	const {
		costAndProfitCenters,
		selectedCostAndProfitCenter,
		isUpdateModalOpen,
		handleOpenUpdateModal,
		handleCloseUpdateModal,
		isDeleteModalOpen,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
	} = useCostAndProfitCentersController()

	return (
		<Fragment>
			<Helmet title="Centros de custo" />

			<PageTitle
				title="Centros de custo"
				description="Crie e gerencie seus centros de custo."
			/>

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
				{costAndProfitCenters.length > 0 ? (
					costAndProfitCenters.map(
						(costAndProfitCenter: ICostAndProfitCenter) => (
							<div
								key={costAndProfitCenter.id}
								className="flex items-center justify-start px-3 border-collapse border-t border-gy-200 dark:border-slate-400"
							>
								<IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
								<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
									<p className="font-medium tracking-tight">
										<span className="mr-2">&bull;</span>
										<span className="w-full">{costAndProfitCenter.name}</span>
									</p>
									<div className="flex gap-2">
										<Tooltip text="Editar categoria">
											<button
												type="button"
												onClick={() =>
													handleOpenUpdateModal(costAndProfitCenter)
												}
											>
												<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
											</button>
										</Tooltip>
										<Tooltip text="Remover categoria">
											<button
												type="button"
												onClick={() =>
													handleOpenDeleteModal(costAndProfitCenter)
												}
											>
												<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
											</button>
										</Tooltip>
									</div>
								</div>
							</div>
						),
					)
				) : (
					<div className="h-24 text-center flex items-center justify-center">
						<p>Nenhum resultado encontrado</p>
					</div>
				)}
			</div>

			<CreateCostAndProfitCentersDialog />

			{isUpdateModalOpen && (
				<EditCostAndProfitCentersDialog
					selectedCostAndProfitCenter={selectedCostAndProfitCenter}
					isUpdateModalOpen={isUpdateModalOpen}
					handleCloseUpdateModal={handleCloseUpdateModal}
				/>
			)}
			{isDeleteModalOpen && (
				<RemoveCostAndProfitCentersDialog
					selectedCostAndProfitCenter={selectedCostAndProfitCenter}
					isDeleteModalOpen={isDeleteModalOpen}
					handleCloseDeleteModal={handleCloseDeleteModal}
				/>
			)}
		</Fragment>
	)
}
