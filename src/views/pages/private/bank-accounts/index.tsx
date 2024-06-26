import { currencyData } from '@/assets/data/currency-data'
import type { IBankAccountDTO } from '@app/dtos/bank-account-dto'
import { Format } from '@app/utils/format'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { InputCurrency } from '@views/components/input/currency'
import { InputMask } from '@views/components/input/mask'
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

const categories = [
	{ field: 'Conta corrente', title: 'Contas Correntes' },
	{ field: 'Conta poupança', title: 'Contas Poupanças' },
	{ field: 'Cartão de crédito', title: 'Cartões de Crédito' },
	{ field: 'Cartão de débito', title: 'Cartões de Débito' },
	{ field: 'Dinheiro', title: 'Dinheiro' },
	{ field: 'Outros', title: 'Outros' },
]

const AccountSection = ({
	title,
	accounts,
}: { title: string; accounts: IBankAccountDTO[] }) => {
	const {
		extractPath,
		handleOpenUpdateModal,
		handleOpenDeleteModal,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedBankAccount,
		hookFormErrorsUpdate,
		hookFormControlUpdate,
		isUpdateCreditCard,
		hookFormRegisterUpdate,
		handleCloseUpdateModal,
		handleCloseDeleteModal,
		handleSubmitUpdate,
		handleSubmitRemove,
	} = useBankAccountsController()
	return (
		<div>
			<h2 className="font-medium text-lg mb-2">{title}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{accounts.map((bankAccount) => (
					<div
						key={bankAccount.id}
						className="flex flex-col items-center justify-start px-3 border-collapse border rounded border-zinc-300 w-full min-w-[277px] max-w-[350px] dark:border-slate-400"
					>
						<div className="flex items-center justify-between py-2 text-foreground w-full">
							<p className="font-medium tracking-tight flex items-center gap-1.5 pt-1">
								{bankAccount.logo && (
									<img
										src={extractPath(bankAccount.logo)}
										alt="Logo da conta"
										className="size-5 rounded-full"
									/>
								)}
								<span className="w-full">{bankAccount.name}</span>
							</p>
							<div className="flex gap-2">
								<Tooltip text="Editar conta">
									<button
										type="button"
										onClick={() => handleOpenUpdateModal(bankAccount)}
									>
										<PencilSquareIcon className="mt-0.5 size-5 text-yellow-500" />
									</button>
								</Tooltip>
								<Tooltip text="Remover conta">
									<button
										type="button"
										onClick={() => handleOpenDeleteModal(bankAccount)}
									>
										<TrashIcon className="mt-0.5 size-5 text-red-500" />
									</button>
								</Tooltip>
							</div>
						</div>
						<div className="flex items-center justify-start w-full gap-1.5 ">
							{bankAccount.currency && (
								<img
									src={
										currencyData.find(
											(currency) => currency.value === bankAccount.currency,
										)?.imageUrl
									}
									alt="Logo da moeda"
									className="size-5 rounded-full"
								/>
							)}
							<p className="text-zinc-600">
								{
									currencyData.find(
										(currency) => currency.value === bankAccount.currency,
									)?.field
								}
							</p>
						</div>
						<div className="flex items-center justify-start pb-1 pt-2 w-full gap-1.5 text-zinc-600 text-[15px]">
							<p className="font-medium">Saldo disponível</p>
							<p>{Format.currency(bankAccount.initialBalance)}</p>
						</div>
						{title === 'Cartões de Crédito' && bankAccount.limit && (
							<>
								{bankAccount.dueDateDay && (
									<div className="flex items-center justify-start pb-1 w-full gap-1.5 text-zinc-600 text-[15px]">
										<p className="font-medium">Próximo vencimento</p>
										<p>{bankAccount.dueDateDay.toString()}</p>
									</div>
								)}

								{bankAccount.dueDateFirstInvoice && (
									<div className="flex items-center justify-start pb-1 w-full gap-1.5 text-zinc-600 text-[15px]">
										<p className="font-medium">Próximo fechamento</p>
										<p>{Format.parseIso(bankAccount.dueDateFirstInvoice)}</p>
									</div>
								)}

								<div className="flex items-center justify-start pb-3 w-full gap-1.5 text-zinc-600 text-[15px]">
									<p className="font-medium">Limite</p>
									<p>{Format.currency(bankAccount.limit)}</p>
								</div>
							</>
						)}
					</div>
				))}
			</div>
			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-[425px]" title="Editar conta">
						<DialogHeader>
							<DialogTitle>Editar {selectedBankAccount?.name}</DialogTitle>
							<DialogDescription>
								Atualize uma conta no sistema.
							</DialogDescription>
						</DialogHeader>

						<form
							id="edit-bank-account-form"
							onSubmit={handleSubmitUpdate}
							className="grid gap-4 py-2 pb-4"
						>
							<Select
								label="Tipo da conta:"
								name="accountType"
								control={hookFormControlUpdate}
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
								name="currency"
								control={hookFormControlUpdate}
							/>
							<div className="flex items-center gap-2">
								<Input
									label="Nome da conta:"
									placeholder="Digite o nome da conta"
									error={hookFormErrorsUpdate?.name?.message}
									{...hookFormRegisterUpdate('name')}
								/>
								<div className="w-1/3">
									<InputCurrency
										label="Saldo inicial:"
										control={hookFormControlUpdate}
										error={hookFormErrorsUpdate?.initialBalance?.message}
										{...hookFormRegisterUpdate('initialBalance')}
									/>
								</div>
							</div>
							<SelectLogo
								label="Logo:"
								name="logo"
								control={hookFormControlUpdate}
							/>
							{isUpdateCreditCard && (
								<>
									<div className="flex items-center gap-2">
										<Select
											label="Tipo do limite:"
											name="limitType"
											control={hookFormControlUpdate}
											data={[
												{ field: 'Total', value: 'Total' },
												{ field: 'Mensal', value: 'Mensal' },
											]}
										/>
										<div className="w-1/3">
											<InputCurrency
												label="Limite:"
												control={hookFormControlUpdate}
												error={hookFormErrorsUpdate?.limit?.message}
												{...hookFormRegisterUpdate('limit')}
											/>
										</div>
									</div>

									<div className="flex items-center gap-2">
										<Input
											label="Dia de vencimento:"
											placeholder="DD"
											error={hookFormErrorsUpdate?.dueDateDay?.message}
											{...hookFormRegisterUpdate('dueDateDay')}
										/>

										<InputMask
											mask="99/99/9999"
											label="Primeira fatura:"
											placeholder="DD/MM/AAAA"
											error={hookFormErrorsUpdate?.dueDateFirstInvoice?.message}
											{...hookFormRegisterUpdate('dueDateFirstInvoice')}
										/>
									</div>

									<div className="flex items-center gap-2">
										<Input
											label="Dias antes do vencimento:"
											placeholder="Qtde. de dias antes do vencto."
											error={hookFormErrorsUpdate?.closingDateInvoice?.message}
											{...hookFormRegisterUpdate('closingDateInvoice')}
										/>
										<div className="w-1/3">
											<InputCurrency
												label="Valor da fatura:"
												control={hookFormControlUpdate}
												error={
													hookFormErrorsUpdate?.balanceFirstInvoice?.message
												}
												{...hookFormRegisterUpdate('balanceFirstInvoice')}
											/>
										</div>
									</div>
								</>
							)}
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
					<DialogContent className="sm:max-w-[425px]" title="Remover conta">
						<DialogHeader>
							<DialogTitle>Remover {selectedBankAccount.name}</DialogTitle>
							<DialogDescription>
								Tem certeza de que deseja remover esta conta? Essa ação não
								poderá ser desfeita.
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
		</div>
	)
}

export function BankAccounts() {
	const {
		bankAccounts,
		isCreateModalOpen,
		hookFormErrorsCreate,
		hookFormControlCreate,
		isCreateCreditCard,
		hookFormRegisterCreate,
		handleOpenCreateModal,
		handleCloseCreateModal,
		handleSubmit,
	} = useBankAccountsController()

	return (
		<Fragment>
			<Helmet title="Contas" />
			<PageTitle title="Contas" description="Crie e gerencie suas contas." />

			{bankAccounts.length > 0 ? (
				<div className="space-y-6">
					{categories.map(({ field, title }) => {
						const filteredAccounts = bankAccounts.filter(
							(acc) => acc.accountType === field,
						)
						return filteredAccounts.length > 0 ? (
							<AccountSection
								key={field}
								title={title}
								accounts={filteredAccounts}
							/>
						) : null
					})}
				</div>
			) : (
				<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
					<div className="h-24 text-center flex items-center justify-center">
						<p>Nenhum resultado encontrado</p>
					</div>
				</div>
			)}

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
						<DialogTitle>Cadastrar conta</DialogTitle>
						<DialogDescription>
							Defina uma nova conta no sistema.
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
							name="currency"
							control={hookFormControlCreate}
						/>
						<div className="flex items-center gap-2">
							<Input
								label="Nome da conta:"
								placeholder="Digite o nome da conta"
								error={hookFormErrorsCreate?.name?.message}
								{...hookFormRegisterCreate('name')}
							/>
							<div className="w-1/3">
								<InputCurrency
									label="Saldo inicial:"
									control={hookFormControlCreate}
									error={hookFormErrorsCreate?.initialBalance?.message}
									{...hookFormRegisterCreate('initialBalance')}
								/>
							</div>
						</div>
						<SelectLogo
							label="Logo:"
							name="logo"
							control={hookFormControlCreate}
						/>
						{isCreateCreditCard && (
							<>
								<div className="flex items-center gap-2">
									<Select
										label="Tipo do limite:"
										name="limitType"
										control={hookFormControlCreate}
										data={[
											{ field: 'Total', value: 'Total' },
											{ field: 'Mensal', value: 'Mensal' },
										]}
									/>
									<div className="w-1/3">
										<InputCurrency
											label="Limite:"
											control={hookFormControlCreate}
											error={hookFormErrorsCreate?.limit?.message}
											{...hookFormRegisterCreate('limit')}
										/>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<Input
										label="Dia de vencimento:"
										placeholder="DD"
										error={hookFormErrorsCreate?.dueDateDay?.message}
										{...hookFormRegisterCreate('dueDateDay')}
									/>

									<InputMask
										mask="99/99/9999"
										label="Primeira fatura:"
										placeholder="DD/MM/AAAA"
										error={hookFormErrorsCreate?.dueDateFirstInvoice?.message}
										{...hookFormRegisterCreate('dueDateFirstInvoice')}
									/>
								</div>

								<div className="flex items-center gap-2">
									<Input
										label="Dias antes do vencimento:"
										placeholder="Qtde. de dias antes do vencto."
										error={hookFormErrorsCreate?.closingDateInvoice?.message}
										{...hookFormRegisterCreate('closingDateInvoice')}
									/>
									<div className="w-1/3">
										<InputCurrency
											label="Valor da fatura:"
											control={hookFormControlCreate}
											error={hookFormErrorsCreate?.balanceFirstInvoice?.message}
											{...hookFormRegisterCreate('balanceFirstInvoice')}
										/>
									</div>
								</div>
							</>
						)}
					</form>

					<DialogFooter>
						<Button form="create-bank-account-form" type="submit">
							Cadastrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}
