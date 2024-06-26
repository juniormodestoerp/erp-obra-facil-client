import { useBankAccounts } from '@app/hooks/bank-accounts/use-bank-accounts'
import { useCategories } from '@app/hooks/categories/use-categories'
import { useCostAndProfitCenters } from '@app/hooks/cost-and-profit-centers/use-cost-and-profit-centers'
import { usePaymentMethods } from '@app/hooks/payment-methods/use-payment-methods'
import { useTags } from '@app/hooks/tags/use-tags'
import { conciliationsService } from '@app/services/conciliations'
import type {
	ITransactionParams,
	IVerifiedTransaction,
} from '@app/services/conciliations/verify-xlsx'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import ofx from 'node-ofx-parser'
import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as XLSX from 'xlsx'
import { z } from 'zod'

interface IVerifiedExcelData {
	newTransactions: IVerifiedTransaction[]
	conflictingTransactions: IVerifiedTransaction[]
}

const schema = z.array(
	z.object({
		date: z.string(dateMessage('data')),
		amount: z.number(numbMessage('valor')),
		description: z.string(strMessage('descrição')),
		account: z.string(strMessage('conta')).nullable(),
		transferAccount: z.string(strMessage('conta transferência')).nullable(),
		card: z.string(strMessage('cartão')).nullable(),
		category: z.string(strMessage('Categoria')).nullable(),
		subcategory: z.string(strMessage('Subcategoria')).nullable(),
		contact: z.string(strMessage('Contato')).nullable(),
		center: z.string(strMessage('Centro')).nullable(),
		project: z.string(strMessage('Projeto')).nullable(),
		method: z.string(strMessage('Forma')).nullable(),
		documentNumber: z.string(strMessage('N. Documento')).nullable(),
		notes: z.string(strMessage('Observações')).nullable(),
		competenceDate: z.coerce.string(dateMessage('Data Competência')).nullable(),
		tags: z.string(strMessage('Tags')).nullable(),
	}),
)
type FormData = z.infer<typeof schema>

const createSchema = z.object({
	type: z.string(strMessage('tipo')).nullable(),
	date: z.string(dateMessage('data')),
	amount: z.number(numbMessage('valor')),
	description: z.string(strMessage('descrição')),
	account: z.string(strMessage('conta')).nullable(),
	transferAccount: z.string(strMessage('conta transferência')).nullable(),
	card: z.string(strMessage('cartão')).nullable(),
	category: z.string(strMessage('categoria')).nullable(),
	subcategory: z.string(strMessage('subcategoria')).nullable(),
	contact: z.string(strMessage('contato')).nullable(),
	center: z.string(strMessage('centro')).nullable(),
	project: z.string(strMessage('projeto')).nullable(),
	method: z.string(strMessage('forma')).nullable(),
	documentNumber: z.string(strMessage('nº documento')).nullable(),
	notes: z.string(strMessage('observações')).nullable(),
	competenceDate: z.coerce.string(dateMessage('data competência')).nullable(),
	tags: z.string(strMessage('tags')).nullable(),
})
type CreateFormData = z.infer<typeof createSchema>

export function useConciliationsController() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const {
		register: createRegister,
		control: createControl,
		handleSubmit: createHandleSubmit,
		formState: { errors: createErrors },
	} = useForm<CreateFormData>({
		resolver: zodResolver(createSchema),
	})

	const [jsonData, setJsonData] = useState<IVerifiedExcelData>(
		{} as IVerifiedExcelData,
	)

	function handleXLSXFileUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target
		const file = input.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = async (e) => {
				const data = e.target?.result
				if (typeof data === 'string' || data instanceof ArrayBuffer) {
					const workbook = XLSX.read(data, { type: 'array' })
					const sheetName = workbook.SheetNames[0]
					const sheet = workbook.Sheets[sheetName]
					const json = XLSX.utils.sheet_to_json(sheet, {
						defval: null,
						raw: true,
					})
					try {
						const response = await conciliationsService.verifyXlxl(
							json as ITransactionParams[],
						)
						setJsonData(response)
					} catch (error) {
						console.error('Error verifying Excel data:', error)
					} finally {
						input.value = ''
					}
				}
			}
			reader.readAsArrayBuffer(file)
		}
	}

	function mapOFXToTransactionParams(ofxData: any): ITransactionParams[] {
		return ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
			(transaction: any) => ({
				date: transaction.DTPOSTED || '',
				amount: Number.parseFloat(transaction.TRNAMT) || 0,
				description: transaction.NAME || transaction.MEMO || '',
				account: null,
				transferAccount: null,
				card: null,
				category: null,
				subcategory: null,
				contact: null,
				center: null,
				project: null,
				method: transaction.TRNTYPE || null,
				documentNumber: transaction.CHECKNUM || null,
				notes: transaction.MEMO || null,
				competenceDate: null,
				tags: null,
			}),
		)
	}

	async function handleOFXFileUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target
		const file = input.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = async (e) => {
				const data = e.target?.result
				if (typeof data === 'string') {
					try {
						const parsedData = ofx.parse(data)
						const transactions = mapOFXToTransactionParams(parsedData)
						const response = await conciliationsService.verifyOfx(transactions)
						setJsonData(response)
					} catch (error) {
						console.error('Error verifying OFX data:', error)
					} finally {
						input.value = ''
					}
				}
			}
			reader.readAsText(file)
		}
	}

	const { categories } = useCategories()
	const { bankAccounts } = useBankAccounts()
	const { costAndProfitCenters } = useCostAndProfitCenters()
	const { paymentMethods } = usePaymentMethods()
	const { tags } = useTags()

	const transformedAccounts = bankAccounts.map((account) => {
		return {
			field: account.name,
			value: account.name,
		}
	})
	const transformedCategories = categories.map((category) => {
		return {
			field: category.name,
			value: category.name,
		}
	})
	const transformedCenters = costAndProfitCenters.map((center) => {
		return {
			field: center.name,
			value: center.name,
		}
	})
	const transformedMethod = paymentMethods.map((method) => {
		return {
			field: method.name,
			value: method.name,
		}
	})
	const transformedTags = tags.map((tag) => {
		return {
			field: tag.name,
			value: tag.name,
		}
	})

	return {
		excelData: jsonData,
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
	}
}
