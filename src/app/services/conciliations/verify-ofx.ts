import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'

export interface ITransactionParams {
  date: string
  amount: number
  description: string
  account: string | null
  transferAccount: string | null
  card: string | null
  category: string | null
  subcategory: string | null
  contact: string | null
  center: string | null
  project: string | null
  method: string | null
  documentNumber: string | null
  notes: string | null
  competenceDate: string | null
  tags: string | null
}

export interface IVerifiedTransaction {
  id: string
  date: string
  amount: number
  description: string
  account: string | null
  transferAccount: string | null
  card: string | null
  category: string | null
  subcategory: string | null
  contact: string | null
  center: string | null
  project: string | null
  method: string | null
  documentNumber: string | null
  notes: string | null
  competenceDate: string | null
  tags: string | null
}

export interface IResponse {
  newTransactions: IVerifiedTransaction[]
  conflictingTransactions: IVerifiedTransaction[]
}

export async function verifyOfx(transactions: ITransactionParams[]): Promise<IResponse> {
  const mappedTransactions = transactions.map((transaction) => ({
    date: Format.formatOfxDate(transaction.date),
    amount: transaction.amount,
    description: Format.formatDescription(transaction.description),
    account: transaction.account,
    transferAccount: transaction.transferAccount,
    card: transaction.card,
    category: transaction.category,
    subcategory: transaction.subcategory,
    contact: transaction.contact,
    center: transaction.center,
    project: transaction.project,
    method: transaction.method ? Format.translateAndCapitalize(transaction.method) : null,
    documentNumber: transaction.documentNumber,
    notes: transaction.notes ? Format.formatDescription(transaction.notes) : null,
    competenceDate: transaction.competenceDate,
    tags: transaction.tags,
  }))

  const { data } = await httpClient.post('/conciliations/import-ofx', mappedTransactions)

  return {
    newTransactions: data.newTransactions,
    conflictingTransactions: data.conflictingTransactions,
  }
}
