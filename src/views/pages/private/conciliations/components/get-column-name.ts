export function getColumnName(name: string): string {
	switch (name) {
		case 'date':
			return 'Data'
		case 'amount':
			return 'Valor'
		case 'description':
			return 'Descrição'
		case 'account':
			return 'Conta'
		case 'transferAccount':
			return 'Conta de transferência'
		case 'card':
			return 'Cartão'
		case 'category':
			return 'Categoria'
		case 'subcategory':
			return 'Subcategoria'
		case 'contact':
			return 'Contato'
		case 'center':
			return 'Centro de custo'
		case 'project':
			return 'Projeto'
		case 'method':
			return 'Método'
		case 'documentNumber':
			return 'Nº do documento'
		case 'notes':
			return 'Observações'
		case 'competenceDate':
			return 'Data de competência'
		case 'tags':
			return 'Tags'
		case 'actions':
			return 'Ações'
		default:
			break
	}

	return name
}
