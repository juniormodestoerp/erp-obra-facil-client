import type { ICostAndProfitCenter } from '@app/services/cost-and-profit-centers/fetch'
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
	isDeleteModalOpen: boolean
	handleCloseDeleteModal: () => void
}

export function RemoveCostAndProfitCentersDialog({
	selectedCostAndProfitCenter,
	isDeleteModalOpen,
	handleCloseDeleteModal,
}: Props) {
	const { handleSubmitRemove } = useCostAndProfitCentersController()

	return (
		<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Remover a categoria {selectedCostAndProfitCenter.name}
					</DialogTitle>
					<DialogDescription>
						Tem certeza de que deseja remover esta categoria? Essa ação poderá
						ser desfeita.
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
						Remover categoria
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
