import { Plus } from 'lucide-react'

import { Input } from '@views/components/input'

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

import { usePaymentMethodsController } from '@views/pages/private/payment-methods/use-payment-methods-controller'

export function CreatePaymentMethodsDialog() {
	const {
		methods,
		handleSubmit,
		isCreateModalOpen,
		handleCloseCreateModal,
		handleOpenCreateModal,
	} = usePaymentMethodsController()

	const {
		register,
		formState: { errors },
	} = methods

	return (
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

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Cadastrar centro de custo</DialogTitle>
					<DialogDescription>
						Defina um novo centro de custo no sistema.
					</DialogDescription>
				</DialogHeader>

				<form
					id="create-payment-method-form"
					onSubmit={handleSubmit}
					className="grid gap-4 py-2 pb-4"
				>
					<Input
						label="Método de pagamento:"
						placeholder="Digite o nome do método de pagamento"
						error={errors?.name?.message}
						{...register('name')}
					/>
				</form>

				<DialogFooter>
					<Button form="create-payment-method-form" type="submit">
						Cadastrar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
