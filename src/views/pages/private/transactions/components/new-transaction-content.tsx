import { Controller } from 'react-hook-form'

import { Input } from '@views/components/input'
import { InputCurrency } from '@views/components/input/currency'
import { Select } from '@views/components/select'

import { Button } from '@views/components/ui/button'
import { DatePicker } from '@views/components/ui/date-picker'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@views/components/ui/dialog'

import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'

export function NewFundRealeaseContent() {
	const {
		getFieldInfo,
		methods,
		setOpenCreateDialog,
		handleSubmit,
		filteredCategories,
	} = useTransactionsController()

	const {
		register,
		control,
		formState: { errors },
	} = methods

	return (
		<DialogContent className="sm:max-w-5xl">
			<DialogHeader>
				<DialogTitle>Cadastrar lançamento</DialogTitle>
				<DialogDescription>
					Preencha os campos abaixo para cadastrar um novo lançamento.
				</DialogDescription>
			</DialogHeader>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-wrap space-y-2 rounded-md border border-slate-300 bg-white p-8 pt-6 shadow dark:border-slate-400 dark:bg-slate-800"
			>
				<div className="grid grid-cols-3 gap-4 pb-6">
					<Input
						label="Nome do lançamento"
						placeholder="Digite o nome *"
						error={errors.name?.message}
						{...register('name')}
					/>

					<Input
						id="description"
						label="Descrição"
						placeholder="Digite a descrição *"
						error={errors.description?.message}
						{...register('description')}
					/>

					<Select
						label="Categoria"
						placeholder="Selecione uma categoria *"
						data={filteredCategories ?? []}
						control={control}
						error={errors.categoryId?.message}
						{...register('categoryId')}
					/>

					<Input
						label="Nome do estabelecimento"
						placeholder="Digite o Nome do Estabelecimento"
						error={errors.establishmentName?.message}
						{...register('establishmentName')}
					/>

					<Input
						id="bank-name"
						label="Nome do banco"
						placeholder="Digite o nome do banco *"
						error={errors.bankName?.message}
						{...register('bankName')}
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

					<InputCurrency
						id="previous-balance"
						label="Saldo anterior"
						placeholder="Digite o saldo anterior *"
						name="previousBalance"
						control={control}
						error={errors.previousBalance?.message}
					/>

					<InputCurrency
						id="total-amount"
						label="Valor total"
						placeholder="Digite o valor total *"
						name="totalAmount"
						control={control}
						error={errors.totalAmount?.message}
					/>

					<InputCurrency
						id="current-balance"
						label="Saldo atual"
						placeholder="Digite o saldo atual *"
						name="currentBalance"
						control={control}
						error={errors.currentBalance?.message}
					/>

					{getFieldInfo('paymentMethod')?.isEnabled && (
						<Input
							id="payment-method"
							label="Método de pagamento"
							placeholder="Digite o método de pagamento *"
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
							error={errors.costAndProfitCenters?.message}
							{...register('costAndProfitCenters')}
						/>
					)}

					{getFieldInfo('tags')?.isEnabled && (
						<Input
							id="tags"
							label="Tags"
							placeholder="Exemplo: tag - tag - tag"
							error={errors.tags?.message}
							{...register('tags')}
						/>
					)}

					{getFieldInfo('documentNumber')?.isEnabled && (
						<Input
							id="document-number"
							label="Número do documento"
							placeholder="Digite o número do documento"
							error={errors.documentNumber?.message}
							{...register('documentNumber')}
						/>
					)}

					{getFieldInfo('associatedContracts')?.isEnabled && (
						<Input
							id="associated-contracts"
							label="Contratos Associados"
							placeholder="Digite os contratos associados"
							error={errors.associatedContracts?.message}
							{...register('associatedContracts')}
						/>
					)}

					{getFieldInfo('associatedProjects')?.isEnabled && (
						<Input
							id="associated-projects"
							label="Projetos associados"
							placeholder="Digite os projetos associados"
							error={errors.associatedProjects?.message}
							{...register('associatedProjects')}
						/>
					)}

					{getFieldInfo('additionalComments')?.isEnabled && (
						<Input
							id="additional-comments"
							label="Comentários adicionais"
							placeholder="Digite os comentários adicionais"
							error={errors.additionalComments?.message}
							{...register('additionalComments')}
						/>
					)}
				</div>

				<DialogClose asChild>
					<Button
						type="submit"
						onClick={() => setOpenCreateDialog(false)}
						className="w-full bg-dark-blue px-3 dark:text-slate-100"
					>
						Cadastrar
					</Button>
				</DialogClose>
			</form>
		</DialogContent>
	)
}
