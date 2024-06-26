function document(document = ''): string {
	if (document.length === 11) {
		const p1 = document.slice(0, 3)
		const p2 = document.slice(3, 6)
		const p3 = document.slice(6, 9)
		const checkDigits = document.slice(9)
		return `${p1}.${p2}.${p3}-${checkDigits}`
	}
	if (document.length === 14) {
		const p1 = document.slice(0, 2)
		const p2 = document.slice(2, 5)
		const p3 = document.slice(5, 8)
		const p4 = document.slice(8, 12)
		const checkDigits = document.slice(12)
		return `${p1}.${p2}.${p3}/${p4}-${checkDigits}`
	}
	return 'Invalid document'
}

function currency(value: string | number) {
	if (!value) return 'R$ 0,00'

	return Intl.NumberFormat('pt-br', {
		style: 'currency',
		currency: 'BRL',
	}).format(+value)
}

function phone(number = ''): string {
	const cleanNumber = number.replace(/[^\d+]/g, '')

	if (cleanNumber.length === 10) {
		return cleanNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
	}
	if (cleanNumber.length === 13) {
		return cleanNumber.replace(
			/(\+\d{2})(\d{2})(\d{4})(\d{4})/,
			'$1 ($2) $3-$4',
		)
	}
	return cleanNumber.replace(/(\+\d{2})(\d{2})(\d{5})(\d{4})/, '$1 ($2) $3-$4')
}

function parseIso(isoString: string): string {
	const dateObj = new Date(isoString)
	const day = dateObj.getUTCDate().toString().padStart(2, '0')
	const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
	const year = dateObj.getUTCFullYear().toString()

	return `${day}/${month}/${year}`
}

function parseIsoBack(isoString: string): string {
	const dateObj = new Date(isoString)
	const day = dateObj.getUTCDate().toString().padStart(2, '0')
	const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
	const year = dateObj.getUTCFullYear().toString()

	return `${year}-${day}-${month}`
}

function formatIso(dateString: string): string {
	const [day, month, year] = dateString.split('/')
	const date = new Date(`${year}-${month}-${day}T00:00:00Z`)

	return date.toISOString()
}

function cleanCurrency(value: number | string): number {
	if (typeof value === 'string') {
		return Number(value.replace(',', '')) / 100
	}

	return value
}

function name(name: string): string {
	const names = name.trim().split(/\s+/)

	if (names.length > 2) {
		const firstName =
			names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase()
		const middleInitial = `${names[1].charAt(0).toUpperCase()}.`
		const lastName =
			names[names.length - 1].charAt(0).toUpperCase() +
			names[names.length - 1].slice(1).toLowerCase()
		return `${firstName} ${middleInitial} ${lastName}`
	}
	return names
		.map(
			(namePart) =>
				namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase(),
		)
		.join(' ')
}

function capitalizeFirstLetter(str: string): string {
	if (!str) return str

	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converte um número de série do Excel para uma data legível.
 * @param serialNumber Número de série do Excel.
 * @returns Data no formato 'DD/MM/YYYY'.
 */
function excelSerialToDate(serialNumber: number): string {
	const baseDate = new Date(1900, 0, 1)
	const excelDate = new Date(
		baseDate.getTime() + (serialNumber - 1) * 24 * 60 * 60 * 1000,
	)
	const day = String(excelDate.getDate()).padStart(2, '0')
	const month = String(excelDate.getMonth() + 1).padStart(2, '0')
	const year = excelDate.getFullYear()
	return `${day}/${month}/${year}`
}

function formatOfxDate(ofxDate: string): string {
  if (ofxDate.length !== 8) {
    throw new Error('Invalid date format');
  }

  const year = ofxDate.slice(0, 4);
  const month = ofxDate.slice(4, 6);
  const day = ofxDate.slice(6, 8);

  return `${day}/${month}/${year}`;
}

/**
 * Converte uma data no formato 'DD/MM/YYYY' para um número de série do Excel.
 * @param date Data no formato 'DD/MM/YYYY'.
 * @returns Número de série do Excel.
 */
function dateToExcelSerial(date: string): number {
	const [day, month, year] = date.split('/').map(Number)
	const baseDate = new Date(1900, 0, 1)
	const targetDate = new Date(year, month - 1, day)
	const diffInTime = targetDate.getTime() - baseDate.getTime()
	return Math.floor(diffInTime / (24 * 60 * 60 * 1000)) + 1
}

// function addDaysToDate(dateString: string, days: number): string {
// 	const [day, month, year] = dateString.split('/').map(Number)
// 	const date = new Date(year, month - 1, day)
// 	date.setDate(date.getDate() + days)
// 	const newDay = date.getDate().toString().padStart(2, '0')
// 	const newMonth = (date.getMonth() + 1).toString().padStart(2, '0')
// 	const newYear = date.getFullYear()
// 	return `${newDay}/${newMonth}/${newYear}`
// }

function formatDateString(isoDateString: string): string {
	const date = new Date(isoDateString);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

function capitalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDescription(description: string): string {
  // Regex para capturar descrição com "Cp"
  const regexWithCp = /^PIX (ENVIADO|RECEBIDO) - Cp :(\d+)-(.+)$/;
  const matchWithCp = description.match(regexWithCp);

  if (matchWithCp) {
    const type = matchWithCp[1];
    const beneficiary = capitalizeName(matchWithCp[3]);

    return `PIX ${capitalizeName(type)}\nBeneficiário: ${beneficiary}`;
  }

  // Regex para capturar descrição sem "Cp"
  const regexWithoutCp = /^PIX (ENVIADO|RECEBIDO) - (.+)$/;
  const matchWithoutCp = description.match(regexWithoutCp);

  if (matchWithoutCp) {
    const type = matchWithoutCp[1];
    const beneficiary = capitalizeName(matchWithoutCp[2]);

    return `PIX ${type}\nBeneficiário: ${beneficiary}`;
  }

  return description; // Retorna a descrição original se não corresponder a nenhum formato esperado
}

function translateAndCapitalize(type: string): string {
  switch (type.toUpperCase()) {
    case 'CREDIT':
      return 'Crédito';
    case 'PAYMENT':
      return 'Pagamento';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }
}


export const Format = {
	parseIso,
	formatIso,
	formatDescription,
	document,
	formatDateString,
	translateAndCapitalize,
	phone,
	name,
	formatOfxDate,
	excelSerialToDate,
	dateToExcelSerial,
	cleanCurrency,
	currency,
	parseIsoBack,
	capitalizeFirstLetter,
}
