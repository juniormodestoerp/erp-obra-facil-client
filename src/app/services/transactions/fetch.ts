import { httpClient } from '@app/services/http-client'

export interface ITransactionSearchOptions {
  pageIndex: number
  searchTerm?: string
}

export interface ITransaction {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  establishmentName: string
  bankName: string
  transactionDate: Date
  previousBalance: number
  totalAmount: number
  currentBalance: number
  paymentMethod: string
  competencyDate: Date | null
  costAndProfitCenters: string | null
  tags: string | null
  documentNumber: string | null
  associatedContracts: string | null
  associatedProjects: string | null
  additionalComments: string | null
  createdAt: Date
}

export interface ITransactionSearchResponse {
  transactions: ITransaction[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function fetch({
  pageIndex,
  searchTerm,
}: ITransactionSearchOptions): Promise<ITransactionSearchResponse> {
  const params = new URLSearchParams()

  params.append('pageIndex', pageIndex.toString())

  if (searchTerm) {
    params.append('searchTerm', searchTerm)
  }

  const queryString = params.toString()

  const { data } = await httpClient.get<ITransactionSearchResponse>(
    `/transactions?${queryString}`,
  )

  return {
    transactions: data.transactions.map((transaction) => ({
      id: transaction.id,
      name: transaction.name,
      description: transaction.description,
      categoryId: transaction.categoryId,
      categoryName: transaction.categoryName,
      establishmentName: transaction.establishmentName,
      bankName: transaction.bankName,
      transactionDate: new Date(transaction.transactionDate),
      previousBalance: transaction.previousBalance,
      totalAmount: transaction.totalAmount,
      currentBalance: transaction.currentBalance,
      paymentMethod: transaction.paymentMethod,
      competencyDate: transaction.competencyDate
        ? new Date(transaction.competencyDate)
        : null,
      costAndProfitCenters: transaction.costAndProfitCenters,
      tags: transaction.tags,
      documentNumber: transaction.documentNumber,
      associatedContracts: transaction.associatedContracts,
      associatedProjects: transaction.associatedProjects,
      additionalComments: transaction.additionalComments,
      createdAt: new Date(transaction.createdAt),
    })),
    meta: {
      pageIndex: data.meta.pageIndex,
      perPage: data.meta.perPage,
      totalCount: data.meta.totalCount,
    },
  }
}
