import type { IPaymentMethod } from '@app/services/payment-methods/fetch'
import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@views/components/ui/dialog'

import { usePaymentMethodsController } from '@views/pages/private/payment-methods/use-payment-methods-controller'

interface Props {
	selectedPaymentMethod: IPaymentMethod
	isDeleteModalOpen: boolean
	handleCloseDeleteModal: () => void
}

export function RemovePaymentMethodsDialog({
	selectedPaymentMethod,
	isDeleteModalOpen,
	handleCloseDeleteModal,
}: Props) {
	const { handleSubmitRemove } = usePaymentMethodsController()

	return (
		<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Remover a categoria {selectedPaymentMethod.name}
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
							handleSubmitRemove(selectedPaymentMethod)
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
