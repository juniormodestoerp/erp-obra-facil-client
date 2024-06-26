import { useSidebar } from '@app/hooks/use-sidebar'
import { cn } from '@app/utils/cn'
import { Input } from '@views/components/input'
import { InputCurrency } from '@views/components/input/currency'
import { InputMask } from '@views/components/input/mask'
import { PageTitle } from '@views/components/page-title'
import { Select } from '@views/components/select'
import { Caption } from '@views/pages/private/conciliations/components/caption'
import { DataTable } from '@views/pages/private/conciliations/components/data-table'
import { useConciliationsController } from '@views/pages/private/conciliations/use-conciliations-controller'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'

export function Conciliations() {
	const {
		excelData,
		errors,
		createControl,
		createErrors,
		transformedAccounts,
		transformedCategories,
		transformedCenters,
		transformedMethod,
		transformedTags,
		register,
		createRegister,
		createHandleSubmit,
		handleXLSXFileUpload,
		handleOFXFileUpload,
		handleSubmit,
	} = useConciliationsController()

	// const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

	const combinedData = [
		...(excelData.newTransactions ?? []),
		...(excelData.conflictingTransactions ?? []),
	]


	const { isSidebarSmall } = useSidebar()

	return (
		<Fragment>
			<Helmet title="Conciliações" />

			<div className="flex items-start justify-between">
				<div>
					<PageTitle
						title="Conciliações"
						description="Resolva as conciliações de suas transações que estão pendentes de resolução."
					/>
				</div>
				<Caption />
			</div>

			<div className="flex items-center justify-between gap-4">
				<div
					className={cn(
						'overflow-x-hidden flex items-start',
						isSidebarSmall
							? combinedData.length > 0
								? 'lg:max-w-[calc(100vw-662px)]'
								: 'lg:max-w-[calc(100vw-148px)]'
							: combinedData.length > 0
								? 'lg:max-w-[calc(100vw-806px)]'
								: 'lg:max-w-[calc(100vw-294px)]',
					)}
				>
					<DataTable
						// selectedRowIds={selectedRowIds}
						// setSelectedRowIds={setSelectedRowIds}
						data={[
							...(excelData.newTransactions ?? []),
							...(excelData.conflictingTransactions ?? []),
						]}
						conflictingTransactions={excelData.conflictingTransactions}
						handleOFXFileUpload={handleOFXFileUpload}
						handleXLSXFileUpload={handleXLSXFileUpload}
					/>
				</div>
        {combinedData.length > 0 && (
				<form className="border border-zinc-300 flex flex-col w-full rounded-md h-auto max-h-[calc(100vh-400px)] px-3 pt-1 pb-3 space-y-1.5">
					<h1 className="text-xl font-medium text-dark-blue">
						Dados dos lançamentos
					</h1>
					<div className="flex gap-x-4">
						<Select
							label="Tipo:"
							name="type"
							control={createControl}
							data={[
								{ field: 'Receita', value: 'Receita' },
								// { field: 'Transferência', value: 'Transferência' },
								{ field: 'Despesa', value: 'Despesa' },
							]}
						/>
						<InputCurrency
							label="Valor:"
							placeholder="Digite o valor"
							control={createControl}
							error={createErrors?.amount?.message}
							{...createRegister('amount')}
						/>
					</div>

					<div className="flex gap-x-4">
						<Input
							label="Descrição:"
							placeholder="Digite a descrição"
							error={createErrors?.description?.message}
							{...createRegister('description')}
						/>
						<div className="w-[22%]">
							<InputMask
								mask="99/99/9999"
								label="Data:"
								placeholder="Digite a data"
								error={createErrors?.date?.message}
								{...createRegister('date')}
							/>
						</div>
					</div>

					<div className="flex gap-x-4">
						<Select
							label="Conta:"
							name="account"
							control={createControl}
							data={transformedAccounts}
						/>
						<Select
							label="Categoria:"
							name="category"
							control={createControl}
							data={transformedCategories}
						/>
					</div>
					<div className="flex gap-x-4">
						<Select
							label="Centro de custo:"
							name="center"
							control={createControl}
							data={transformedCenters}
						/>
						<Select
							label="Forma de pagamento:"
							name="method"
							control={createControl}
							data={transformedCenters}
						/>
					</div>
					<div className="flex gap-x-4">
						<Input
							label="Observações:"
							className="w-full max-w-lg"
							placeholder="Digite as observações"
							error={createErrors?.notes?.message}
							{...createRegister('notes')}
						/>
					</div>
					<div className="flex gap-x-4">
						<Select
							label="Tags:"
							name="tags"
							control={createControl}
							data={transformedCenters}
						/>
					</div>
				</form>
        )}
			</div>
		</Fragment>
	)
}
