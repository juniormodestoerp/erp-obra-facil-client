import type { IPaymentMethod } from '@app/services/payment-methods/fetch'
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

import { usePaymentMethodsController } from '@views/pages/private/payment-methods/use-payment-methods-controller'

interface Props {
	selectedPaymentMethod: IPaymentMethod
	isUpdateModalOpen: boolean
	handleCloseUpdateModal: () => void
}

export function EditPaymentMethodsDialog({
	selectedPaymentMethod,
	isUpdateModalOpen,
	handleCloseUpdateModal,
}: Props) {
	const { methods, handleSubmitUpdate } = usePaymentMethodsController()

	const {
		register,
		formState: { errors },
	} = methods

	return (
		<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar {selectedPaymentMethod?.name}</DialogTitle>
					<DialogDescription>
						Defina uma nova categoria ou subcategoria no sistema.
					</DialogDescription>
				</DialogHeader>

				<form
					id="edit-payment-method-form"
					onSubmit={handleSubmitUpdate}
					className="grid gap-4 py-2 pb-4"
				>
					<input
						type="text"
						className="hidden"
						value={selectedPaymentMethod.id}
						{...register('id')}
					/>

					<Input
						label="Método de pagamento:"
						placeholder="Digite o método de pagamento"
						defaultValue={selectedPaymentMethod?.name}
						error={errors?.name?.message}
						{...register('name')}
					/>
				</form>

				<DialogFooter>
					<Button form="edit-payment-method-form" type="submit">
						Cadastrar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
