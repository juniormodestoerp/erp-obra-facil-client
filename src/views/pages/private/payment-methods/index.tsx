import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import {
	BanknotesIcon,
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
import { usePaymentMethodsController } from '@views/pages/private/payment-methods/use-payment-methods-controller'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function PaymentMethods() {
	const {
		paymentMethods,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedPaymentMethod,
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
	} = usePaymentMethodsController()

	return (
		<Fragment>
			<Helmet title="Métodos de pagamento" />

			<PageTitle
				title="Métodos de pagamento"
				description="Crie e gerencie seus métodos de pagamento."
			/>

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border border-zinc-300 divide-y divide-zinc-300 dark:border-slate-400 dark:bg-slate-800">
				{paymentMethods.length > 0 ? (
					paymentMethods.map((paymentMethod: IPaymentMethodDTO) => (
						<div
							key={paymentMethod.id}
							className="flex items-center justify-start px-3 border-collapse dark:border-slate-400"
						>
							<BanknotesIcon className="h-5 w-5 text-dark-blue" />
							<div className="flex w-full items-center justify-between px-1.5 py-2 text-foreground">
								<p className="font-medium tracking-tight">
									<span className="w-full">{paymentMethod.name}</span>
								</p>
								<div className="flex gap-2">
									<Tooltip text="Editar método de pagamento">
										<button
											type="button"
											onClick={() => handleOpenUpdateModal(paymentMethod)}
										>
											<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
										</button>
									</Tooltip>
									<Tooltip text="Remover método de pagamento">
										<button
											type="button"
											onClick={() => handleOpenDeleteModal(paymentMethod)}
										>
											<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
										</button>
									</Tooltip>
								</div>
							</div>
						</div>
					))
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

				<DialogContent className="sm:max-w-[425px]" title='Cadastrar método de pagamento'>
					<DialogHeader>
						<DialogTitle>Cadastrar método de pagamento</DialogTitle>
						<DialogDescription>
							Defina um novo método de pagamento no sistema.
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
							error={hookFormErrorsCreate?.name?.message}
							{...hookFormRegisterCreate('name')}
						/>
					</form>

					<DialogFooter>
						<Button form="create-payment-method-form" type="submit">
							Cadastrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-[425px]" title='Editar método de pagamento'>
						<DialogHeader>
							<DialogTitle>Editar {selectedPaymentMethod?.name}</DialogTitle>
							<DialogDescription>
								Atualize um método de pagamento no sistema.
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
								{...hookFormRegisterUpdate('id')}
							/>

							<Input
								label="Método de pagamento:"
								placeholder="Digite o método de pagamento"
								error={hookFormErrorsUpdate?.name?.message}
								{...hookFormRegisterUpdate('name')}
							/>
						</form>
						<DialogFooter>
							<Button form="edit-payment-method-form" type="submit">
								Atualizar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{isDeleteModalOpen && (
				<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
					<DialogContent className="sm:max-w-[425px]" title='Remover método de pagamento'>
						<DialogHeader>
							<DialogTitle>Remover {selectedPaymentMethod.name}</DialogTitle>
							<DialogDescription>
								Tem certeza de que deseja remover este método de pagamento? Essa
								ação poderá ser desfeita.
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
								Remover
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	)
}
