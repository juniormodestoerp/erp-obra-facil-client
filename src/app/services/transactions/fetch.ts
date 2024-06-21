import { toast } from 'sonner'
import { httpClient } from '@app/services/http-client'

interface ISorting {
	id: string
	desc: boolean
}

export interface ITransactionSearchOptions {
	pageIndex: number
	searchTerm?: string
	sorting?: ISorting[]
}

export interface ITransaction {
	id: string
	name: string
	description: string
	categoryId: string
	categoryName: string
	establishmentName: string
	bankName: string
	accountType: string
	accountToTransfer: string | null
	card: string | null
	contact: string | null
	transactionDate: string
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	status: string
	competencyDate: string | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	createdAt: string
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
	sorting,
}: ITransactionSearchOptions): Promise<ITransactionSearchResponse> {
	const normalizeSorting = (sorting: ISorting[] | undefined): string => {
		if (!sorting || sorting.length === 0) return ''

		const withoutClinic = sorting[0].id.replace('transactions', '')
		const normalizedSorting =
			withoutClinic.charAt(0).toLowerCase() + withoutClinic.slice(1)

		return normalizedSorting
	}

	const searchTermQuery = searchTerm ? `&searchTerm=${searchTerm}` : ''
	const sortingQuery = sorting
		? `&sortingField=${normalizeSorting(sorting)}&${
				sorting?.[0]?.desc ? 'orderBy=desc' : 'orderBy=asc'
			}`
		: ''

	const response = await httpClient.get<ITransactionSearchResponse>(
		`/transactions?pageIndex=${pageIndex}${searchTermQuery}${sortingQuery}`,
	)

	if (response?.status === 200) {
		toast.success(
			`${
				response?.data?.transactions?.length === 1
					? 'Lançamento carregado'
					: 'Lançamentos carregados'
			} com sucesso!`,
		)
	}

	return {
		transactions: response?.data.transactions.map((transaction) => ({
			id: transaction.id,
			name: transaction.name,
			description: transaction.description,
			categoryId: transaction.categoryId,
			categoryName: transaction.categoryName,
			accountType: transaction.accountType,
			accountToTransfer: transaction.accountToTransfer,
			card: transaction.card,
			establishmentName: transaction.establishmentName,
			contact: transaction.contact,
			bankName: transaction.bankName,
			transactionDate: transaction.transactionDate,
			previousBalance: transaction.previousBalance,
			totalAmount: transaction.totalAmount,
			currentBalance: transaction.currentBalance,
			paymentMethod: transaction.paymentMethod,
			status: transaction.status,
			competencyDate: transaction.competencyDate,
			costAndProfitCenters: transaction.costAndProfitCenters,
			tags: transaction.tags,
			documentNumber: transaction.documentNumber,
			associatedContracts: transaction.associatedContracts,
			associatedProjects: transaction.associatedProjects,
			additionalComments: transaction.additionalComments,
			createdAt: transaction.createdAt,
		})),
		meta: {
			pageIndex: response?.data.meta.pageIndex,
			perPage: response?.data.meta.perPage,
			totalCount: response?.data.meta.totalCount,
		},
	}
}
