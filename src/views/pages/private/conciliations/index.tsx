import { Fragment, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ZodError, z } from 'zod'

import { httpClient } from '@app/services/http-client'
import { PageTitle } from '@views/components/page-title'
import { Button } from '@views/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'
import { newTransactiosMock } from '../../../../../data'
import { cn } from '@app/utils'
import { TrashIcon } from '@heroicons/react/24/outline'

interface ITransaction {
	id: string
	userId: string
	fitId: string
	trnType: string
	accountType: string
	name: string
	description: string
	categoryId: string
	categoryName: string
	establishmentName: string
	bankName: string
	transactionDate: string
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	competencyDate: string | null
	costAndProfitCenters: any | null
	tags: any | null
	documentNumber: string
	associatedContracts: any | null
	associatedProjects: any | null
	additionalComments: any | null
	status: string
	createdAt: string
}

const fileSchema = z.object({
	type: z.string().regex(/\.ofx$/, {
		message: 'Invalid file type. Only .ofx files are allowed.',
	}),
})

export function Conciliations() {
	const [newTransactions, setNewTransactions] = useState<ITransaction[]>(
		mapToNewStructureArray(newTransactiosMock),
	)
	const [conflictingTransactions, setConflictingTransactions] = useState<
		ITransaction[]
	>([])
	const [file, setFile] = useState<File | null>(null)
	const [error, setError] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [fileType, setFileType] = useState<'.ofx' | '.xls, .xlsx' | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null
		if (selectedFile) {
			try {
				fileSchema.parse({ type: selectedFile.name })
				setFile(selectedFile)
				setError(null)
			} catch (e) {
				if (e instanceof ZodError) {
					setError(e.errors[0].message)
				}
				setFile(null)
			}
		}
	}

	const handleButtonClick = (type: '.ofx' | '.xls, .xlsx') => {
		if (fileInputRef.current) {
			setFileType(type)
			fileInputRef.current.click()
		}
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		console.log(file)

		try {
			const response = await httpClient.post('/conciliations', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			console.log('File uploaded successfully:', response.data)
			setNewTransactions(mapToNewStructureArray(response.data.newTransactions))
			setConflictingTransactions(
				mapToNewStructureArray(response.data.conflictingTransactions),
			)
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	const mapBankName = (bankDetails: string): string => {
		const bankMap: { [key: string]: string } = {
			'ITAÚ UNIBANCO S.A.': 'Banco Itaú',
			'BCO DO BRASIL S.A.': 'Banco do Brasil',
			'NEON PAGAMENTOS S.A.': 'Banco Neon',
			'MERCADO PAGO IP LTDA.': 'Mercado Pago',
			'BCO SANTANDER': 'Banco Santander',
			'BMP SCMEPP LTDA': 'Banco BMG',
			// Adicione mais bancos conforme necessário
		}

		const bankName = Object.keys(bankMap).find((bank) =>
			bankDetails?.includes(bank),
		)
		return bankName ? bankMap[bankName] : bankDetails
	}

	return (
		<Fragment>
			<Helmet title="Conciliações" />

			<PageTitle
				title="Conciliações"
				description="Resolva as conciliações de suas transações que estão pendentes de resolução."
			/>

			<div className="flex items-end gap-4">
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<input
						type="file"
						accept=".ofx,.xlsx,.xls"
						onChange={handleFileChange}
						ref={fileInputRef}
						style={{ display: 'none' }}
					/>

					{error && <p style={{ color: 'red' }}>{error}</p>}
					<Button
						type="button"
						onClick={() => handleButtonClick('.ofx')}
						variant="outline"
						className="mr-4"
					>
						Arquivo OFX
					</Button>

					<Button
						type="button"
						onClick={() => handleButtonClick('.xls, .xlsx')}
						variant="outline"
						className="mr-4"
					>
						Planilha Excel
					</Button>
					<Button type="submit" disabled={!file} variant="outline">
						Enviar arquivo
					</Button>
				</form>
				{file && (
					<div className="flex gap-4 items-end">
						<p className="font-medium">
							Arquivo escolhido:{' '}
							<span className="text-green-600">{file?.name}</span>
						</p>
						<Button
							type="button"
							onClick={() => setFile(null)}
							variant="outline"
							className="border-rose-500 size-9"
						>
							<div className="">
								<TrashIcon className="size-4 text-rose-500" />
							</div>
						</Button>
					</div>
				)}
			</div>

			<div className="grid grid-cols-3 gap-4">
				{newTransactions?.map((transaction) => {
					const formattedDate = new Date(
						transaction.transactionDate,
					)?.toLocaleDateString()
					const formattedAmount = transaction.totalAmount?.toLocaleString(
						'pt-BR',
						{
							style: 'currency',
							currency: 'BRL',
						},
					)

					function handleTransactionClick() {
						console.log('Transaction clicked:', transaction.id)
					}

					return (
						<Card
							key={transaction.id}
							className={cn(
								'w-[350px] mt-10 bg-green-50/25 !border-green-500 cursor-pointer',
								transaction.paymentMethod === 'credit'
									? 'bg-green-50/25 !border-green-500'
									: 'bg-red-50/25 !border-red-500',
							)}
							onClick={handleTransactionClick}
						>
							<CardHeader>
								<p className="font-bold text-base">
									{mapBankName(transaction?.bankName)}
								</p>
								<CardTitle>
									{transaction.name}{' '}
									{transaction.paymentMethod === 'credit'
										? `de ${transaction.establishmentName}`
										: `para ${transaction.establishmentName}`}{' '}
									em {formattedDate}.
								</CardTitle>
								<CardDescription>
									{transaction.trnType === 'DEBIT' ? 'Débito' : 'Crédito'} no
									valor de {formattedAmount}{' '}
									{transaction?.accountType?.toLowerCase() === 'conta corrente'
										? 'na conta corrente'
										: transaction?.accountType?.toLowerCase() ===
												'conta poupança'
											? 'na conta poupança'
											: 'no cartão de crédito'}
									.
									<span className="ml-1 text-red-600">
										{transaction.totalAmount > 1000 && 'valor elevado.'}
									</span>
									{/* <CardContent>
								<div>Descrição: {transaction.description}</div>
								<div>Estabelecimento: {transaction.establishmentName}</div>
								<div>account type: {transaction.accountType}</div>
								<div>Categoria: {transaction.categoryName}</div>
								<div>Data da Transação: {formattedDate}</div>
								<div>Método de Pagamento: {transaction.paymentMethod}</div>
								<div>Status: {transaction.status}</div>
								<div>
									Criado em:{' '}
									{new Date(transaction.createdAt).toLocaleDateString()}
								</div>
							</CardContent> */}
								</CardDescription>
							</CardHeader>
						</Card>
					)
				})}
			</div>
		</Fragment>
	)
}

function mapToNewStructureArray(originalDataArray: any[]): ITransaction[] {
	return originalDataArray.map((originalData) => ({
		id: originalData._id._value,
		userId: originalData.props.userId,
		fitId: originalData.props.fitId,
		accountType: originalData.props.accountType,
		trnType: originalData.props.trnType,
		name: originalData.props.name,
		description: originalData.props.description,
		categoryId: originalData.props.categoryId,
		categoryName: originalData.props.categoryName,
		establishmentName: originalData.props.establishmentName,
		bankName: originalData.props.bankName,
		transactionDate: originalData.props.transactionDate,
		previousBalance: originalData.props.previousBalance,
		totalAmount: originalData.props.totalAmount,
		currentBalance: originalData.props.currentBalance,
		paymentMethod: originalData.props.paymentMethod,
		competencyDate: originalData.props.competencyDate,
		costAndProfitCenters: originalData.props.costAndProfitCenters,
		tags: originalData.props.tags,
		documentNumber: originalData.props.documentNumber,
		associatedContracts: originalData.props.associatedContracts,
		associatedProjects: originalData.props.associatedProjects,
		additionalComments: originalData.props.additionalComments,
		status: originalData.props.status,
		createdAt: originalData.props.createdAt,
		updatedAt: originalData.props.updatedAt,
		deletedAt: originalData.props.deletedAt,
	}))
}
