import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'
import { Input } from '@views/components/input'
import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@views/components/ui/dialog'

import { useCostAndProfitCentersController } from '@views/pages/private/cost-and-profit-centers/use-cost-and-profit-centers-controller'

interface Props {
	selectedCostAndProfitCenter: ICostAndProfitCenter
	isUpdateModalOpen: boolean
	handleCloseUpdateModal: () => void
}

export function EditCostAndProfitCentersDialog({
	selectedCostAndProfitCenter,
	isUpdateModalOpen,
	handleCloseUpdateModal,
}: Props) {
	const { methods, handleSubmitUpdate } = useCostAndProfitCentersController()

	const {
		register,
		formState: { errors },
	} = methods

	return (
		<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar {selectedCostAndProfitCenter?.name}</DialogTitle>
					<DialogDescription>
						Defina uma nova categoria ou subcategoria no sistema.
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
						{...register('id')}
					/>

					<Input
						label="Categoria:"
						placeholder="Digite o nome da categoria"
						defaultValue={selectedCostAndProfitCenter?.name}
						error={errors?.name?.message}
						{...register('name')}
					/>
				</form>

				<DialogFooter>
					<Button form="edit-cost-and-profit-center-form" type="submit">
						Cadastrar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
