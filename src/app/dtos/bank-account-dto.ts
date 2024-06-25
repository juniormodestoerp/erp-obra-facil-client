export type ILimitType = 'FIXED' | 'FLEXIBLE'

export interface IBankAccountDTO {
	id: string
	accountType: string
	name: string
	currency: string
	logo: string | null
	limit: number | null
	limitType: ILimitType | null
	dueDateDay: number | null
	dueDateFirstInvoice: string | null
	closingDateInvoice: number | null
	balanceFirstInvoice: number | null
	isFirstInvoice: boolean | null
	isCreditCard: boolean | null
	initialBalance: number
	createdAt: string
}
