import { httpClient } from '@app/services/http-client'

export interface Params {
	name: string
	description: string
	categoryId: string
	accountType: string
	establishmentName: string
	bankName: string
	transactionDate: Date
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	status: string
	accountToTransfer: string | null
	contact: string | null
	card: string | null
	competencyDate: Date | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
}

export interface Response {
	id: string
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
	status: string
	accountToTransfer: string | null
	contact: string | null
	card: string | null
	competencyDate: string | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	createdAt: string
}

export async function create({
	name,
	description,
	categoryId,
	accountType,
	establishmentName,
	bankName,
	transactionDate,
	previousBalance,
	totalAmount,
	currentBalance,
	paymentMethod,
	status,
	accountToTransfer,
	contact,
	card,
	competencyDate,
	costAndProfitCenters,
	tags,
	documentNumber,
	associatedContracts,
	associatedProjects,
	additionalComments,
}: Params): Promise<Response> {
	const { data } = await httpClient.post<Response>('/conciliations/add', {
		name,
		description,
		categoryId,
		accountType,
		establishmentName,
		bankName,
		transactionDate: transactionDate.toISOString(),
		previousBalance,
		totalAmount,
		currentBalance,
		paymentMethod,
		status: status || 'Pendente',
		accountToTransfer,
		contact,
		card,
		competencyDate: competencyDate?.toISOString() || null,
		costAndProfitCenters,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
	})

	return {
		id: data.id,
		name: data.name,
		description: data.description,
		categoryId: data.categoryId,
		categoryName: data.categoryName,
		establishmentName: data.establishmentName,
		bankName: data.bankName,
		transactionDate: data.transactionDate,
		previousBalance: data.previousBalance,
		totalAmount: data.totalAmount,
		currentBalance: data.currentBalance,
		paymentMethod: data.paymentMethod,
		status: data.status,
		accountToTransfer: data.accountToTransfer,
		contact: data.contact,
		card: data.card,
		competencyDate: data.competencyDate,
		costAndProfitCenters: data.costAndProfitCenters,
		tags: data.tags,
		documentNumber: data.documentNumber,
		associatedContracts: data.associatedContracts,
		associatedProjects: data.associatedProjects,
		additionalComments: data.additionalComments,
		createdAt: data.createdAt,
	}
}
