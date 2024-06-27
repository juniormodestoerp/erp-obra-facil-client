import type { ICostAndProfitCentersDTO } from '@app/dtos/cost-and-profit-center-dto'
import {
	CurrencyDollarIcon,
	PencilSquareIcon,
	TrashIcon,
} from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { PageTitle } from '@views/components/page-title'
import { Tooltip } from '@views/components/tooltip'
import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { useCostAndProfitCentersController } from '@views/pages/private/cost-and-profit-centers/use-cost-and-profit-centers-controller'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function CostAndProfitCenters() {
	const {
		costAndProfitCenters,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedCostAndProfitCenter,
		hookFormErrorsCreate,
		hookFormErrorsUpdate,
		hookFormRegisterCreate,
		hookFormRegisterUpdate,
		handleOpenCreateModal,
		handleCloseCreateModal,
		handleOpenUpdateModal,
		handleCloseUpdateModal,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleSubmit,
		handleSubmitUpdate,
		handleSubmitRemove,
	} = useCostAndProfitCentersController()

	return (
		<Fragment>
			<Helmet title="Centros de custo" />

			<PageTitle
				title="Centros de custo"
				description="Crie e gerencie seus centros de custo."
			/>

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border border-zinc-300 divide-y divide-zinc-300 dark:border-slate-400 dark:bg-slate-800">
				{costAndProfitCenters.length > 0 ? (
					costAndProfitCenters.map(
						(costAndProfitCenter: ICostAndProfitCentersDTO) => (
							<div
								key={costAndProfitCenter.id}
								className="flex items-center justify-start px-3 border-collapse dark:border-slate-400"
							>
								<CurrencyDollarIcon className="h-5 w-5 text-dark-blue" />
								<div className="flex w-full items-center justify-between px-1.5 py-2 text-foreground">
									<p className="font-medium tracking-tight">
										<span className="w-full">{costAndProfitCenter.name}</span>
									</p>
									<div className="flex gap-2">
										<Tooltip text="Editar centro de custo">
											<button
												type="button"
												onClick={() =>
													handleOpenUpdateModal(costAndProfitCenter)
												}
											>
												<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
											</button>
										</Tooltip>
										<Tooltip text="Remover centro de custo">
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

			<Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
				<DialogTrigger asChild>
					<button
						type="button"
						onClick={handleOpenCreateModal}
						className="absolute bottom-8 right-12 flex justify-center hover:bg-primary/90 size-10 items-center gap-1 border-2 bg-primary rounded-full border-primary pr-1 text-sm font-medium text-primary"
					>
						<Plus className="size-5 text-white ml-1" strokeWidth={2.5} />
					</button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]" title="Cadastrar centro de custo">
					<DialogHeader>
						<DialogTitle>Cadastrar centro de custo</DialogTitle>
						<DialogDescription>
							Defina um novo centro de custo no sistema.
						</DialogDescription>
					</DialogHeader>

					<form
						id="create-cost-and-profit-center-form"
						onSubmit={handleSubmit}
						className="grid gap-4 py-2 pb-4"
					>
						<Input
							label="Centro de custo:"
							placeholder="Digite o nome do centro de custo"
							error={hookFormErrorsCreate?.name?.message}
							{...hookFormRegisterCreate('name')}
						/>
					</form>

					<DialogFooter>
						<Button form="create-cost-and-profit-center-form" type="submit">
							Cadastrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-[425px]" title='Editar centro de custo'>
						<DialogHeader>
							<DialogTitle>
								Editar {selectedCostAndProfitCenter?.name}
							</DialogTitle>
							<DialogDescription>
								Atualize um centro de custo no sistema.
							</DialogDescription>
						</DialogHeader>

						<form
							id="edit-cost-and-profit-center-form"
							onSubmit={handleSubmitUpdate}
							className="grid gap-4 py-2 pb-4"
						>
							<input
								type="text"
								className="hidden"
								value={selectedCostAndProfitCenter.id}
								{...hookFormRegisterUpdate('id')}
							/>

							<Input
								label="Centro de custo:"
								placeholder="Digite o centro de custo"
								error={hookFormErrorsUpdate?.name?.message}
								{...hookFormRegisterUpdate('name')}
							/>
						</form>
						<DialogFooter>
							<Button form="edit-cost-and-profit-center-form" type="submit">
								Atualizar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{isDeleteModalOpen && (
				<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
					<DialogContent className="sm:max-w-[425px]" title="Remover centro de custo">
						<DialogHeader>
							<DialogTitle>
								Remover {selectedCostAndProfitCenter.name}
							</DialogTitle>
							<DialogDescription>
								Tem certeza de que deseja remover este centro de custo? Essa
								ação poderá ser desfeita.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="mt-4">
							<Button
								type="submit"
								variant="destructive"
								onClick={() => {
									handleSubmitRemove(selectedCostAndProfitCenter)
									handleCloseDeleteModal()
								}}
							>
								Remover
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	)
}
