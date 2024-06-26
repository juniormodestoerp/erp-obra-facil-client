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
import ofx from 'node-ofx-parser';

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

	function handleXLSXFileUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target
		const file = input.files?.[0]
		if (file) {
			const reader = new FileReader()
			console.log('reader', reader)

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
		return ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map((transaction: any) => ({
			date: transaction.DTPOSTED || '', // Data da transação
			amount: Number.parseFloat(transaction.TRNAMT) || 0, // Valor da transação
			description: transaction.NAME || transaction.MEMO || '', // Descrição ou nome da transação
			account: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			transferAccount: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			card: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			category: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			subcategory: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			contact: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			center: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			project: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			method: transaction.TRNTYPE || null, // Tipo da transação
			documentNumber: transaction.CHECKNUM || null, // Número do cheque se disponível
			notes: transaction.MEMO || null, // Notas adicionais da transação
			competenceDate: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
			tags: null, // Campo não diretamente disponível no OFX, precisa de lógica adicional se aplicável
		}));
	}

	async function handleOFXFileUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = e.target?.result;
        if (typeof data === 'string') {
          try {
            const parsedData = ofx.parse(data);
            const transactions = mapOFXToTransactionParams(parsedData);
            const response = await conciliationsService.verifyOfx(transactions);
            setJsonData(response);
          } catch (error) {
            console.error('Error verifying OFX data:', error);
          } finally {
            input.value = '';
          }
        }
      };

      reader.readAsText(file);
    }
	}

	return {
		excelData: jsonData,
		register,
		control,
		errors,
		handleXLSXFileUpload,
		handleOFXFileUpload,
		hookFormHandleSubmit,
		jsonData,
	}
}

