import { conciliationsService } from '@app/services/conciliations'
import type {
	ITransactionParams,
	IVerifiedTransaction,
} from '@app/services/conciliations/verify-xlsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as XLSX from 'xlsx'
import { z } from 'zod'

interface IVerifiedExcelData {
	newTransactions: IVerifiedTransaction[]
	conflictingTransactions: IVerifiedTransaction[]
}

const schema = z.object({})

type FormData = z.infer<typeof schema>

export function useConciliationsController() {
	const {
		register,
		control,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		mode: 'onSubmit',
		resolver: zodResolver(schema),
	})

	const [jsonData, setJsonData] = useState<IVerifiedExcelData>(
		{} as IVerifiedExcelData,
	)

	function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
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

	return {
		excelData: jsonData,
		register,
		control,
		errors,
		handleFileUpload,
		hookFormHandleSubmit,
		jsonData,
	}
}
