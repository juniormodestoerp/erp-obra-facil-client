export const mapBankName = (bankDetails: string): string => {
	const bankMap: { [key: string]: string } = {
		'ITAÚ UNIBANCO S.A.': 'Banco Itaú',
		'BCO DO BRASIL S.A.': 'Banco do Brasil',
		'NEON PAGAMENTOS S.A.': 'Banco Neon',
		'MERCADO PAGO IP LTDA.': 'Mercado Pago',
		'BCO SANTANDER': 'Banco Santander',
		'BMP SCMEPP LTDA': 'Banco BMG',
		'PAGSEGURO INTERNET IP S.A.': 'PagSeguro',
	}

	const bankName = Object.keys(bankMap).find((bank) =>
		bankDetails?.includes(bank),
	)

	return bankName ? bankMap[bankName] : 'Não informado'
}
