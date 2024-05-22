export function getColumnName(name: string): string {
  switch (name) {
    case 'name':
      return 'Nome'
    case 'description':
      return 'Descrição'
    case 'categoryName':
      return 'Categoria'
    case 'establishmentName':
      return 'Estabelecimento'
    case 'bankName':
      return 'Banco'
    case 'transactionDate':
      return 'Data'
    case 'previousBalance':
      return 'Saldo anterior'
    case 'totalAmount':
      return 'Valor total'
    case 'currentBalance':
      return 'Saldo atual'
    case 'paymentMethod':
      return 'Método de pagamento'
    case 'actions':
      return 'Ações'
    default:
      break
  }

  return name
}
