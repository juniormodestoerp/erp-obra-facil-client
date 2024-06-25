export function getIconName(name: string): string {
	switch (name) {
		case 'Clothes':
			return 'Roupas'
		case 'Education':
			return 'Educação'
		case 'Expense':
			return 'Contas'
		case 'Food':
			return 'Comida'
		case 'Fun':
			return 'Diversão'
		case 'Grocery':
			return 'Mercado'
		case 'Home':
			return 'Casa'
		case 'Transport':
			return 'Transporte'
		case 'Travel':
			return 'Viagem'
		default:
			break
	}

	return name
}
