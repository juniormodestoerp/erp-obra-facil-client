export type ICategoryType = 'Total' | 'Mensal'

export interface ICategoryDTO {
	id: string
	type: 'EXPENSE' | 'INCOME'
	name: string
	subcategoryOf: string | null
	createdAt: string
}
