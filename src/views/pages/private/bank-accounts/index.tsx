import { IncomeIcon } from '@/assets/icons/income'
import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { PageTitle } from '@views/components/page-title'
import { Select } from '@views/components/select'
import { SelectCurrency } from '@views/components/select-currency'
import { SelectLogo } from '@views/components/select-logo'
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
import { useBankAccountsController } from '@views/pages/private/bank-accounts/use-bank-accounts-controller'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function BankAccounts() {
	const {
		bankAccounts,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedBankAccount,
		hookFormErrorsCreate,
		hookFormErrorsUpdate,
		hookFormControlCreate,
		hookFormControlUpdate,
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
	} = useBankAccountsController()

	return (
		<Fragment>
			<Helmet title="Métodos de pagamento" />

			<PageTitle
				title="Métodos de pagamento"
				description="Crie e gerencie seus métodos de pagamento."
			/>

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
				{bankAccounts.length > 0 ? (
					bankAccounts.map((bankAccount: IBankAccountDTO) => (
						<div
							key={bankAccount.id}
							className="flex items-center justify-start px-3 border-collapse border-t border-gy-200 dark:border-slate-400"
						>
							<IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
							<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
								<p className="font-medium tracking-tight">
									<span className="mr-2">&bull;</span>
									<span className="w-full">{bankAccount.name}</span>
								</p>
								<div className="flex gap-2">
									<Tooltip text="Editar método de pagamento">
										<button
											type="button"
											onClick={() => handleOpenUpdateModal(bankAccount)}
										>
											<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
										</button>
									</Tooltip>
									<Tooltip text="Remover método de pagamento">
										<button
											type="button"
											onClick={() => handleOpenDeleteModal(bankAccount)}
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
						className="absolute bottom-8 right-8 flex size-14 justify-center hover:bg-primary/90 items-center gap-1 border-2 bg-primary rounded-full border-primary pr-1 text-sm font-medium text-primary"
					>
						<Plus className="size-6 text-white ml-1" strokeWidth={2.5} />
					</button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]" title="Criar conta">
					<DialogHeader>
						<DialogTitle>Cadastrar método de pagamento</DialogTitle>
						<DialogDescription>
							Defina um novo método de pagamento no sistema.
						</DialogDescription>
					</DialogHeader>

					<form
						id="create-bank-account-form"
						onSubmit={handleSubmit}
						className="grid gap-y-1 py-2 pb-4"
					>
						<Select
							label="Tipo da conta:"
							name="accountType"
							control={hookFormControlCreate}
							data={[
								{ field: 'Conta corrente', value: 'Conta corrente' },
								{ field: 'Conta poupança', value: 'Conta poupança' },
								{ field: 'Cartão de crédito', value: 'Cartão de crédito' },
								{ field: 'Cartão de débito', value: 'Cartão de débito' },
								{ field: 'Dinheiro', value: 'Dinheiro' },
								{ field: 'Outros', value: 'Outros' },
							]}
						/>
						<SelectCurrency
							label="Moeda:"
							name="accountType"
							control={hookFormControlCreate}
						/>
							<Input
								label="Nome da conta:"
								placeholder="Digite o nome nome da conta"
								error={hookFormErrorsCreate?.name?.message}
								{...hookFormRegisterCreate('name')}
							/>
							<SelectLogo
								label="Logo:"
								name="accountType"
								control={hookFormControlCreate}
							/>
					</form>

					<DialogFooter>
						<Button form="create-bank-account-form" type="submit">
							Cadastrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-[425px]" title='Editar conta'>
						<DialogHeader>
							<DialogTitle>Editar {selectedBankAccount?.name}</DialogTitle>
							<DialogDescription>
								Atualize um método de pagamento no sistema.
							</DialogDescription>
						</DialogHeader>

						<form
							id="edit-bank-account-form"
							onSubmit={handleSubmitUpdate}
							className="grid gap-4 py-2 pb-4"
						>
							<input
								type="text"
								className="hidden"
								value={selectedBankAccount.id}
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
							<Button form="edit-bank-account-form" type="submit">
								Atualizar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{isDeleteModalOpen && (
				<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Remover {selectedBankAccount.name}</DialogTitle>
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
									handleSubmitRemove(selectedBankAccount)
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
