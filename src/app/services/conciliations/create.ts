import { httpClient } from '@app/services/http-client'

export interface Params {
	id: string
	userId: string
	fitId: string
	trnType: string
	name: string
	description: string
	accountType: string
	categoryId: string
	categoryName?: string
	establishmentName: string
	bankName: string
	transactionDate: string
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	competencyDate: string | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	status: string
	createdAt: string
}

export interface Response {
	id: string
	userId: string
	fitId: string
	trnType: string
	name: string
	description: string
	accountType: string
	categoryId: string
	categoryName?: string
	establishmentName: string
	bankName: string
	transactionDate: string
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	competencyDate: string | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	status: string
	createdAt: string
}

export async function create({
	id,
	userId,
	fitId,
	trnType,
	name,
	description,
	accountType,
	categoryId,
	categoryName,
	establishmentName,
	bankName,
	transactionDate,
	previousBalance,
	totalAmount,
	currentBalance,
	paymentMethod,
	competencyDate,
	costAndProfitCenters,
	tags,
	documentNumber,
	associatedContracts,
	associatedProjects,
	additionalComments,
	status,
	createdAt,
}: Params): Promise<Response> {
	const { data } = await httpClient.post<Response>('/conciliations/add', {
		id,
		userId,
		fitId,
		trnType,
		name,
		description,
		accountType,
		categoryId,
		categoryName,
		establishmentName,
		bankName,
		transactionDate,
		previousBalance,
		totalAmount,
		currentBalance,
		paymentMethod,
		competencyDate: competencyDate && null,
		costAndProfitCenters,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
		status,
		createdAt,
	})

	return {
		id: data.id,
		userId: data.userId,
		fitId: data.fitId,
		trnType: data.trnType,
		name: data.name,
		description: data.description,
		accountType: data.accountType,
		categoryId: data.categoryId,
		categoryName: data.categoryName,
		establishmentName: data.establishmentName,
		bankName: data.bankName,
		transactionDate: data.transactionDate,
		previousBalance: data.previousBalance,
		totalAmount: data.totalAmount,
		currentBalance: data.currentBalance,
		paymentMethod: data.paymentMethod,
		competencyDate: data.competencyDate ? data.competencyDate : null,
		costAndProfitCenters: data.costAndProfitCenters,
		tags: data.tags,
		documentNumber: data.documentNumber,
		associatedContracts: data.associatedContracts,
		associatedProjects: data.associatedProjects,
		additionalComments: data.additionalComments,
		status: data.status,
		createdAt: data.createdAt,
	}
}
