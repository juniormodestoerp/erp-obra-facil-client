import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@views/components/ui/dialog'

// import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'

interface Props {
	transactionId: string
	transactionName: string
	isDeleteModalOpen: boolean
	setIsDeleteModalOpen: (value: boolean) => void
}

export function RemoveTransactionDialog({
	// transactionId,
	transactionName,
	isDeleteModalOpen,
	setIsDeleteModalOpen,
}: Props) {
	// const { handleRemoveTransaction } = useTransactionsController()

	function handleClose() {
		setIsDeleteModalOpen(false)
	}

	return (
		<Dialog open={isDeleteModalOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]" title='Remover o lançamento'>
				<DialogHeader>
					<DialogTitle>Remover o lançamento {transactionName}</DialogTitle>
					<DialogDescription>
						Tem certeza de que deseja remover este lançamento? Essa ação não
						poderá ser desfeita.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-4">
					<Button
						type="submit"
						variant="destructive"
						onClick={() => {
							// handleRemoveTransaction(transactionId)
							handleClose()
						}}
					>
						Remover lançamento
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
