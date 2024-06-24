import { IncomeIcon } from '@/assets/icons/income'
import type { IPaymentMethod } from '@app/services/payment-methods/fetch'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PageTitle } from '@views/components/page-title'
import { Tooltip } from '@views/components/tooltip'
import { usePaymentMethodsController } from '@views/pages/private/payment-methods/use-payment-methods-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { CreatePaymentMethodsDialog } from './components/create-payment-method-dialog'
import { EditPaymentMethodsDialog } from './components/edit-payment-method-dialog'
import { RemovePaymentMethodsDialog } from './components/remove-payment-method-dialog'

export function PaymentMethods() {
	const {
		paymentMethods,
		selectedPaymentMethod,
		isUpdateModalOpen,
		handleOpenUpdateModal,
		handleCloseUpdateModal,
		isDeleteModalOpen,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
	} = usePaymentMethodsController()

	return (
		<Fragment>
			<Helmet title="Métodos de pagamento" />

			<PageTitle
				title="Métodos de pagamento"
				description="Crie e gerencie seus métodos de pagamento."
			/>

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
				{paymentMethods.length > 0 ? (
					paymentMethods.map((paymentMethod: IPaymentMethod) => (
						<div
							key={paymentMethod.id}
							className="flex items-center justify-start px-3 border-collapse border-t border-gy-200 dark:border-slate-400"
						>
							<IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
							<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
								<p className="font-medium tracking-tight">
									<span className="mr-2">&bull;</span>
									<span className="w-full">{paymentMethod.name}</span>
								</p>
								<div className="flex gap-2">
									<Tooltip text="Editar categoria">
										<button
											type="button"
											onClick={() => handleOpenUpdateModal(paymentMethod)}
										>
											<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
										</button>
									</Tooltip>
									<Tooltip text="Remover categoria">
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

			<CreatePaymentMethodsDialog />

			{isUpdateModalOpen && (
				<EditPaymentMethodsDialog
					selectedPaymentMethod={selectedPaymentMethod}
					isUpdateModalOpen={isUpdateModalOpen}
					handleCloseUpdateModal={handleCloseUpdateModal}
				/>
			)}
			{isDeleteModalOpen && (
				<RemovePaymentMethodsDialog
					selectedPaymentMethod={selectedPaymentMethod}
					isDeleteModalOpen={isDeleteModalOpen}
					handleCloseDeleteModal={handleCloseDeleteModal}
				/>
			)}
		</Fragment>
	)
}
