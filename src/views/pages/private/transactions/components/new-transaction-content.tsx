import type { ITransaction } from '@app/services/transactions/fetch'
import { cn } from '@app/utils/cn'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Icon, Trigger } from '@radix-ui/react-select'
import { Input } from '@views/components/input'
import { InputCurrency } from '@views/components/input/currency'
import { Select } from '@views/components/select'
import { Button } from '@views/components/ui/button'
import { DatePicker } from '@views/components/ui/date-picker'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@views/components/ui/dialog'
import {
	SelectContent,
	SelectItem,
	Select as SelectRdx,
	SelectValue,
} from '@views/components/ui/select'
import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from 'react'
import { Controller } from 'react-hook-form'

interface Props {
	transaction?: ITransaction
}

export function NewFundRealeaseContent({ transaction }: Props) {
	const { getFieldInfo, methods, handleSubmit, filteredCategories } =
		useTransactionsController()

	const {
		register,
		control,
		formState: { errors },
		setValue,
	} = methods

	const getDefaultValue = (value: any) =>
		value === null || value === '' ? 'Não informado' : value

	const SelectTrigger = forwardRef<
		ElementRef<typeof Trigger>,
		ComponentPropsWithoutRef<typeof Trigger>
	>(({ className, children, ...props }, ref) => (
		<Trigger
			ref={ref}
			className={cn(
				'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
				className,
			)}
			{...props}
		>
			{children}
			<Icon asChild>
				<CaretSortIcon className="size-6 opacity-50 absolute right-2 top-2" />
			</Icon>
		</Trigger>
	))
	SelectTrigger.displayName = Trigger.displayName

	return (
		<DialogContent className="sm:max-w-5xl p-8">
			<DialogHeader>
				<DialogTitle>Cadastrar lançamento</DialogTitle>
				<DialogDescription>
					Preencha os campos abaixo para cadastrar um novo lançamento.
				</DialogDescription>
			</DialogHeader>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-wrap space-y-2 bg-white pt-6 dark:border-slate-400 dark:bg-slate-800"
			>
				<div className="grid grid-cols-3 gap-4 pb-6">
					<Input
						label="Nome do lançamento"
						placeholder="Digite o nome *"
						defaultValue={getDefaultValue(transaction?.name)}
						error={errors.name?.message}
						{...register('name')}
					/>

					<Input
						id="description"
						label="Descrição"
						placeholder="Digite a descrição *"
						defaultValue={getDefaultValue(transaction?.description)}
						error={errors.description?.message}
						{...register('description')}
					/>

					<div>
						<label
							htmlFor="accountType"
							className="block text-sm font-medium leading-6 tracking-tight text-zinc-900 dark:text-zinc-100"
						>
							Tipo de conta <span className="text-red-600">*</span>
						</label>

						<SelectRdx
							onValueChange={(value) => {
								const label =
									value === 'current'
										? 'Conta corrente'
										: value === 'savings'
											? 'Conta poupança'
											: 'Cartão de crédito'
								setValue('accountType', label)
							}}
						>
							<SelectTrigger
								id="accountType"
								className="relative block h-[38px] w-full rounded border border-zinc-400 px-3 py-1.5 text-left text-xs text-zinc-900 shadow outline-none ring-0 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-0 focus:border-zinc-400 disabled:pointer-events-none sm:text-sm sm:leading-6 dark:bg-zinc-600 dark:text-zinc-100"
								{...register('accountType')}
								value={
									transaction?.accountType === 'current'
										? 'Conta corrente'
										: transaction?.accountType === 'savings'
											? 'Conta poupança'
											: transaction?.accountType === 'credit'
												? 'Cartão de crédito'
												: ''
								}
							>
								<SelectValue placeholder="Selecione o tipo de conta" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value="current"
									onClick={() => {
										setValue('accountType', 'Conta corrente')
									}}
								>
									Conta corrente
								</SelectItem>
								<SelectItem
									value="savings"
									onClick={() => setValue('accountType', 'Conta poupança')}
								>
									Conta poupança
								</SelectItem>
								<SelectItem
									value="credit"
									onClick={() => setValue('accountType', 'Cartão de crédito')}
								>
									Cartão de crédito
								</SelectItem>
							</SelectContent>
						</SelectRdx>
					</div>

					<Select
						label="Categoria"
						placeholder="Selecione uma categoria *"
						data={filteredCategories}
						control={control}
						error={errors.categoryId?.message}
						{...register('categoryId')}
					/>

					<Input
						label="Nome do beneficiário"
						placeholder="Digite o nome do beneficiário"
						defaultValue={getDefaultValue(transaction?.establishmentName)}
						error={errors.establishmentName?.message}
						{...register('establishmentName')}
					/>

					<Input
						id="bank-name"
						label="Nome do banco"
						placeholder="Digite o nome do banco *"
						defaultValue={getDefaultValue(transaction?.bankName)}
						error={errors.bankName?.message}
						{...register('bankName')}
					/>

					<InputCurrency
						id="previous-balance"
						label="Saldo anterior"
						placeholder="Digite o saldo anterior *"
						defaultValue={transaction?.previousBalance ?? 0}
						control={control}
						error={errors.previousBalance?.message}
						{...register('previousBalance')}
					/>

					<InputCurrency
						id="total-amount"
						label="Valor total"
						placeholder="Digite o valor total *"
						defaultValue={transaction?.totalAmount ?? 0}
						control={control}
						error={errors.totalAmount?.message}
						{...register('totalAmount')}
					/>

					<InputCurrency
						id="current-balance"
						label="Saldo atual"
						placeholder="Digite o saldo atual *"
						defaultValue={transaction?.currentBalance ?? 0}
						control={control}
						error={errors.currentBalance?.message}
						{...register('currentBalance')}
					/>

					<div>
						<label
							htmlFor="status"
							className="block text-sm font-medium leading-6 tracking-tight text-zinc-900 dark:text-zinc-100"
						>
							Status <span className="text-red-600">*</span>
						</label>

						<SelectRdx>
							<SelectTrigger
								id="status"
								className="relative block h-[38px] w-full rounded border border-zinc-400 px-3 py-1.5 text-left text-xs text-zinc-900 shadow outline-none ring-0 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-0 focus:border-zinc-400 disabled:pointer-events-none sm:text-sm sm:leading-6 dark:bg-zinc-600 dark:text-zinc-100"
								{...register('status')}
								value={
									transaction?.status === 'pending'
										? 'Pendente'
										: transaction?.status === 'approved'
											? 'Aprovado'
											: transaction?.status === 'reconciled'
												? 'Conciliado'
												: transaction?.status === 'completed'
													? 'Concluído'
													: ''
								}
							>
								<SelectValue placeholder="Selecione o status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pending">Pendente</SelectItem>
								<SelectItem value="approved">Aprovado</SelectItem>
								<SelectItem value="reconciled">Conciliado</SelectItem>
								<SelectItem value="completed">Conciliado</SelectItem>
							</SelectContent>
						</SelectRdx>
					</div>

					<Input
						id="contact"
						label="Contato"
						placeholder="Digite o contato *"
						defaultValue={getDefaultValue(transaction?.contact)}
						error={errors.contact?.message}
						{...register('contact')}
					/>

					<Input
						id="account-to-transfer"
						label="Conta transferência"
						placeholder="Digite a conta para transferência *"
						defaultValue={getDefaultValue(transaction?.accountToTransfer)}
						error={errors.accountToTransfer?.message}
						{...register('accountToTransfer')}
					/>

					<Input
						id="card"
						label="Cartão"
						placeholder="Digite o cartão *"
						defaultValue={getDefaultValue(transaction?.card)}
						error={errors.card?.message}
						{...register('card')}
					/>

					<div className="flex w-full">
						<Controller
							control={control}
							name="transactionDate"
							render={({ field }) => (
								<DatePicker
									label="Data da transação"
									selected={field.value}
									onChange={(date) => field.onChange(date)}
									error={errors.transactionDate?.message}
								/>
							)}
						/>
					</div>

					{getFieldInfo('paymentMethod')?.isEnabled && (
						<Input
							id="payment-method"
							label="Método de pagamento"
							placeholder="Digite o método de pagamento *"
							defaultValue={getDefaultValue(transaction?.paymentMethod)}
							error={errors.paymentMethod?.message}
							{...register('paymentMethod')}
						/>
					)}

					{getFieldInfo('competencyDate')?.isEnabled && (
						<Controller
							control={control}
							name="competencyDate"
							render={({ field }) => (
								<DatePicker
									label="Data de competência"
									selected={field.value}
									onChange={(date) => field.onChange(date)}
									error={errors.competencyDate?.message}
								/>
							)}
						/>
					)}

					{getFieldInfo('costAndProfitCenters')?.isEnabled && (
						<Input
							id="cost-center"
							label="Centro de custo"
							placeholder="Digite o centro de custo"
							defaultValue={getDefaultValue(transaction?.costAndProfitCenters)}
							error={errors.costAndProfitCenters?.message}
							{...register('costAndProfitCenters')}
						/>
					)}

					{getFieldInfo('tags')?.isEnabled && (
						<Input
							id="tags"
							label="Tags"
							placeholder="Exemplo: tag - tag - tag"
							defaultValue={getDefaultValue(transaction?.tags)}
							error={errors.tags?.message}
							{...register('tags')}
						/>
					)}

					{getFieldInfo('documentNumber')?.isEnabled && (
						<Input
							id="document-number"
							label="Número do documento"
							placeholder="Digite o número do documento"
							defaultValue={getDefaultValue(transaction?.documentNumber)}
							error={errors.documentNumber?.message}
							{...register('documentNumber')}
						/>
					)}

					{getFieldInfo('associatedContracts')?.isEnabled && (
						<Input
							id="associated-contracts"
							label="Contratos Associados"
							placeholder="Digite os contratos associados"
							defaultValue={getDefaultValue(transaction?.associatedContracts)}
							error={errors.associatedContracts?.message}
							{...register('associatedContracts')}
						/>
					)}

					{getFieldInfo('associatedProjects')?.isEnabled && (
						<Input
							id="associated-projects"
							label="Projetos associados"
							placeholder="Digite os projetos associados"
							defaultValue={getDefaultValue(transaction?.associatedProjects)}
							error={errors.associatedProjects?.message}
							{...register('associatedProjects')}
						/>
					)}

					{getFieldInfo('additionalComments')?.isEnabled && (
						<Input
							id="additional-comments"
							label="Comentários adicionais"
							placeholder="Digite os comentários adicionais"
							defaultValue={getDefaultValue(transaction?.additionalComments)}
							error={errors.additionalComments?.message}
							{...register('additionalComments')}
						/>
					)}
				</div>

				<Button
					type="submit"
					className="w-full bg-dark-blue px-3 dark:text-slate-100"
				>
					Cadastrar
				</Button>
			</form>
		</DialogContent>
	)
}
