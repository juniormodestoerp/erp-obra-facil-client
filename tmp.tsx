// import { Fragment, useRef, useState } from 'react'
// import { Helmet } from 'react-helmet-async'
// import { ZodError, z } from 'zod'

// import { conciliationsService } from '@app/services/conciliations'
// import {
// 	type AppError,
// 	httpClient,
// 	parseError,
// } from '@app/services/http-client'
// // import { newTransactiosMock } from '../../../../../data'
// import { cn } from '@app/utils'
// import { mapBankName } from '@app/utils/bank-map'
// import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { PageTitle } from '@views/components/page-title'
// import { Button } from '@views/components/ui/button'
// import {
// 	Card,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from '@views/components/ui/card'
// import { toast } from 'sonner'

// import { useTransaction } from '@app/hooks/use-transaction'
// import { useGlobalShortcut } from '@app/utils/global-shortcut'
// import {
// 	Dialog,
// 	DialogOverlay,
// 	DialogTrigger,
// } from '@views/components/ui/dialog'
// import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'

// interface ITransaction {
// 	id: string
// 	userId: string
// 	fitId: string
// 	trnType?: string
// 	accountType: string
// 	name: string
// 	description: string
// 	categoryId: string
// 	categoryName: string
// 	establishmentName: string
// 	bankName: string
// 	transactionDate: string
// 	previousBalance: number
// 	totalAmount: number
// 	currentBalance: number
// 	paymentMethod: string
// 	competencyDate: string | null
// 	costAndProfitCenters: any | null
// 	tags: any | null
// 	documentNumber: string
// 	associatedContracts: any | null
// 	associatedProjects: any | null
// 	additionalComments: any | null
// 	status: string
// 	createdAt: string
// }

// const fileSchema = z.object({
// 	type: z.string().regex(/\.ofx$/, {
// 		message: 'Invalid file type. Only .ofx files are allowed.',
// 	}),
// })

// export function Conciliations() {
// 	const { openTransaction, isTransactionOpen, closeTransaction } =
// 		useTransaction()

// 	useGlobalShortcut('Ctrl+a', openTransaction)

// 	const [newTransactions, setNewTransactions] = useState<ITransaction[]>(
// 		mapToNewStructureArray([]), // newTransactiosMock
// 	)
// 	const [conflictingTransactions, setConflictingTransactions] = useState<
// 		ITransaction[]
// 	>([])
// 	const [file, setFile] = useState<File | null>(null)
// 	const [error, setError] = useState<string | null>(null)
// 	const fileInputRef = useRef<HTMLInputElement>(null)
// 	const [fileType, setFileType] = useState<'.ofx' | '.xls, .xlsx' | null>(null)

// 	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const selectedFile = event.target.files ? event.target.files[0] : null
// 		if (selectedFile) {
// 			try {
// 				fileSchema.parse({ type: selectedFile.name })
// 				setFile(selectedFile)
// 				setError(null)
// 			} catch (e) {
// 				if (e instanceof ZodError) {
// 					setError(e.errors[0].message)
// 				}
// 				setFile(null)
// 			}
// 		}
// 	}

// 	const handleButtonClick = (type: '.ofx' | '.xls, .xlsx') => {
// 		if (fileInputRef.current) {
// 			setFileType(type)
// 			fileInputRef.current.click()
// 		}
// 	}

// 	const handleSubmit = async (event: React.FormEvent) => {
// 		event.preventDefault()

// 		if (!file || !fileType) return

// 		const formData = new FormData()
// 		formData.append('file', file)
// 		formData.append('fileType', fileType) // Adiciona o tipo de arquivo
// 		setFile(null)

// 		try {
// 			const response = await httpClient.post('/conciliations', formData, {
// 				headers: { 'Content-Type': 'multipart/form-data' },
// 			})
// 			setNewTransactions(mapToNewStructureArray(response.data.newTransactions))
// 			setConflictingTransactions(
// 				mapToNewStructureArray(response.data.conflictingTransactions),
// 			)
// 			toast.success('Arquivo enviado com sucesso!')
// 		} catch (error) {
// 			console.error('Error uploading file:', error)
// 			toast.error(parseError(error as AppError))
// 		}
// 	}

// 	return (
// 		<Fragment>
// 			<Helmet title="Conciliações" />

// 			<PageTitle
// 				title="Conciliações"
// 				description="Resolva as conciliações de suas transações que estão pendentes de resolução."
// 			/>

// 			<div className="flex items-end gap-4">
// 				<form onSubmit={handleSubmit} encType="multipart/form-data">
// 					<input
// 						type="file"
// 						accept=".ofx,.xlsx,.xls"
// 						onChange={handleFileChange}
// 						ref={fileInputRef}
// 						style={{ display: 'none' }}
// 					/>

// 					{error && <p style={{ color: 'red' }}>{error}</p>}
// 					<Button
// 						type="button"
// 						onClick={() => handleButtonClick('.ofx')}
// 						variant="outline"
// 						className="mr-4"
// 					>
// 						Arquivo OFX
// 					</Button>

// 					<Button
// 						type="button"
// 						onClick={() => handleButtonClick('.xls, .xlsx')}
// 						variant="outline"
// 						className="mr-4"
// 					>
// 						Planilha Excel
// 					</Button>
// 					<Button type="submit" disabled={!file} variant="outline">
// 						Enviar arquivo
// 					</Button>
// 				</form>
// 				{file && (
// 					<div className="flex gap-4 items-end">
// 						<p className="font-medium">
// 							Arquivo escolhido:{' '}
// 							<span className="text-green-600">{file?.name}</span>
// 						</p>
// 						<Button
// 							type="button"
// 							onClick={() => setFile(null)}
// 							variant="outline"
// 							className="border-rose-500 size-9"
// 						>
// 							<div className="">
// 								<TrashIcon className="size-4 text-rose-500" />
// 							</div>
// 						</Button>
// 					</div>
// 				)}
// 			</div>

// 			<div className="flex flex-col mt-6">
// 				<p className="font-medium text-darker-blue">Legenda:</p>

// 				<div className="flex items-center justify-between flex-wrap space-y-3">
// 					<div className="flex items-center gap-2 mt-3">
// 						<span className="bg-red-500 size-3 rounded-full" />
// 						<span>Lançamento de débito ( saldo negativo )</span>
// 					</div>

// 					<div className="flex items-center gap-2 mt-3">
// 						<span className="bg-yellow-500 size-3 rounded-full" />
// 						<span>Lançamento discrepante ( conflito )</span>
// 					</div>

// 					<div className="flex items-center gap-2 mt-3">
// 						<span className="bg-green-500 size-3 rounded-full" />
// 						<span>Lançamento de crédito ( saldo positivo )</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="flex flex-wrap w-full justify-center 2xl:justify-between gap-4 mt-10">
// 				{newTransactions?.map((transaction) => {
// 					const formattedDate = new Date(
// 						transaction.transactionDate,
// 					)?.toLocaleDateString()
// 					const formattedAmount = transaction.totalAmount?.toLocaleString(
// 						'pt-BR',
// 						{
// 							style: 'currency',
// 							currency: 'BRL',
// 						},
// 					)

// 					async function handleTransactionClick() {
// 						try {
// 							await conciliationsService.create(transaction)
// 							toast.success('Lancaçamento conciliado com sucesso!')
// 							setNewTransactions((prevTransactions) =>
// 								prevTransactions.filter((t) => t.id !== transaction.id),
// 							)
// 						} catch (error) {
// 							toast.error(parseError(error as AppError))
// 						}
// 					}

// 					async function handleRemoveTransaction() {
// 						try {
// 							setNewTransactions((prevTransactions) =>
// 								prevTransactions.filter((t) => t.id !== transaction.id),
// 							)
// 							toast.success('Lancaçamento removido com sucesso!')
// 						} catch (error) {
// 							toast.error('Erro ao remover lancaçamento.')
// 						}
// 					}

// 					return (
// 						<Card
// 							key={transaction.id}
// 							className={cn(
// 								'relative lg:max-w-[350px] max-w-[420px] w-full bg-green-50/25 !border-green-500 cursor-pointer',
// 								transaction.paymentMethod === 'credit'
// 									? 'bg-green-50/25 !border-green-500'
// 									: 'bg-red-50/25 !border-red-500',
// 							)}
// 							onClick={handleTransactionClick}
// 						>
// 							<Button
// 								type="button"
// 								variant="outline"
// 								onClick={(event) => {
// 									event.stopPropagation()
// 									handleRemoveTransaction()
// 								}}
// 								className="rounded-full shadow p-0 h-7 w-7 absolute -top-2 -right-2"
// 							>
// 								<XMarkIcon className="text-zinc-600 h-4 ml-[1px] dark:text-zinc-100" />
// 							</Button>
// 							<CardHeader>
// 								<p className="font-bold text-base">
// 									{mapBankName(transaction?.bankName)}
// 								</p>
// 								<CardTitle>
// 									{transaction.name}{' '}
// 									{transaction.paymentMethod === 'credit'
// 										? `de ${transaction.establishmentName}`
// 										: `para ${transaction.establishmentName}`}{' '}
// 									em {formattedDate}.
// 								</CardTitle>
// 								<CardDescription>
// 									{transaction.trnType === 'DEBIT' ? 'Débito' : 'Crédito'} no
// 									valor de {formattedAmount}{' '}
// 									{transaction?.accountType?.toLowerCase() === 'conta corrente'
// 										? 'na conta corrente'
// 										: transaction?.accountType?.toLowerCase() ===
// 												'conta poupança'
// 											? 'na conta poupança'
// 											: 'no cartão de crédito'}
// 									.
// 									<span className="ml-1 text-red-600">
// 										{transaction.totalAmount > 1000 && 'valor elevado.'}
// 									</span>
// 								</CardDescription>
// 							</CardHeader>
// 						</Card>
// 					)
// 				})}
// 			</div>

// 			<div className="flex flex-wrap w-full justify-center 2xl:justify-between gap-4 mt-10">
// 				{conflictingTransactions?.map((transaction) => {
// 					const formattedDate = new Date(
// 						transaction.transactionDate,
// 					)?.toLocaleDateString()
// 					const formattedAmount = transaction.totalAmount?.toLocaleString(
// 						'pt-BR',
// 						{
// 							style: 'currency',
// 							currency: 'BRL',
// 						},
// 					)

// 					async function handleTransactionClick() {
// 						try {
// 							await conciliationsService.create(transaction)
// 							toast.success('Lançaçamento conciliado com sucesso!')
// 							setConflictingTransactions((prevTransactions) =>
// 								prevTransactions.filter((t) => t.id !== transaction.id),
// 							)
// 						} catch (error) {
// 							toast.error(parseError(error as AppError))
// 						}
// 					}

// 					async function handleRemoveTransaction() {
// 						try {
// 							setConflictingTransactions((prevTransactions) =>
// 								prevTransactions.filter((t) => t.id !== transaction.id),
// 							)
// 							toast.success('Lançaçamento removido com sucesso!')
// 						} catch (error) {
// 							toast.error('Erro ao remover lançaçamento.')
// 						}
// 					}

// 					return (
// 						<Card
// 							key={transaction.id}
// 							className={cn(
// 								'relative lg:max-w-[350px] max-w-[420px] w-full bg-yellow-50/25 !border-yellow-500 cursor-pointer',
// 								transaction.paymentMethod === 'credit'
// 									? 'bg-yellow-50/25 !border-yellow-500'
// 									: 'bg-yellow-50/25 !border-yellow-500',
// 							)}
// 							onClick={handleTransactionClick}
// 						>
// 							<Button
// 								type="button"
// 								variant="outline"
// 								onClick={(event) => {
// 									event.stopPropagation()
// 									handleRemoveTransaction()
// 								}}
// 								className="rounded-full shadow p-0 h-7 w-7 absolute -top-2 -right-2"
// 							>
// 								<XMarkIcon className="text-zinc-600 h-4 ml-[1px] dark:text-zinc-100" />
// 							</Button>
// 							<CardHeader>
// 								<p className="font-bold text-base">
// 									{mapBankName(transaction?.bankName)}
// 								</p>
// 								<CardTitle>
// 									{transaction.name}{' '}
// 									{transaction.paymentMethod === 'credit'
// 										? `de ${transaction.establishmentName}`
// 										: `para ${transaction.establishmentName}`}{' '}
// 									em {formattedDate}.
// 								</CardTitle>
// 								<CardDescription>
// 									{transaction.trnType === 'DEBIT' ? 'Débito' : 'Crédito'} no
// 									valor de {formattedAmount}{' '}
// 									{transaction?.accountType?.toLowerCase() === 'conta corrente'
// 										? 'na conta corrente'
// 										: transaction?.accountType?.toLowerCase() ===
// 												'conta poupança'
// 											? 'na conta poupança'
// 											: 'no cartão de crédito'}
// 									.
// 									<span className="ml-1 text-red-600">
// 										{transaction.totalAmount > 1000 && 'valor elevado.'}
// 									</span>
// 								</CardDescription>
// 							</CardHeader>
// 						</Card>
// 					)
// 				})}
// 			</div>

// 			<Dialog
// 				open={isTransactionOpen}
// 				onOpenChange={(open) => {
// 					open ? openTransaction() : closeTransaction()
// 				}}
// 			>
// 				<DialogOverlay />
// 				<DialogTrigger asChild>
// 					<button type="button" className="hidden" />
// 				</DialogTrigger>
// 				<NewFundRealeaseContent />
// 			</Dialog>
// 		</Fragment>
// 	)
// }

// function mapToNewStructureArray(originalDataArray: any[]): ITransaction[] {
// 	return originalDataArray.map((originalData) => ({
// 		id: originalData._id._value,
// 		userId: originalData.props.userId,
// 		fitId: originalData.props.fitId,
// 		accountType: originalData.props.accountType,
// 		trnType: originalData.props.trnType,
// 		name: originalData.props.name,
// 		description: originalData.props.description,
// 		categoryId: originalData.props.categoryId,
// 		categoryName: originalData.props.categoryName,
// 		establishmentName: originalData.props.establishmentName,
// 		bankName: originalData.props.bankName,
// 		transactionDate: originalData.props.transactionDate,
// 		previousBalance: originalData.props.previousBalance,
// 		totalAmount: originalData.props.totalAmount,
// 		currentBalance: originalData.props.currentBalance,
// 		paymentMethod: originalData.props.paymentMethod,
// 		competencyDate: originalData.props.competencyDate,
// 		costAndProfitCenters: originalData.props.costAndProfitCenters,
// 		tags: originalData.props.tags,
// 		documentNumber: originalData.props.documentNumber,
// 		associatedContracts: originalData.props.associatedContracts,
// 		associatedProjects: originalData.props.associatedProjects,
// 		additionalComments: originalData.props.additionalComments,
// 		status: originalData.props.status,
// 		createdAt: originalData.props.createdAt,
// 		updatedAt: originalData.props.updatedAt,
// 		deletedAt: originalData.props.deletedAt,
// 	}))
// }

/* <TableBody>
{table.getRowModel().rows?.length ? (
  table.getRowModel().rows.map((row) => (
    <TableRow
      key={row.id}
      // className={
      // 	conflictingTransactions.some(
      // 		(tr) => tr.id === row.original.id,
      // 	)
      // 		? 'bg-red-200'
      // 		: ''
      // }
      data-state={row.getIsSelected() && 'selected'}
    > */