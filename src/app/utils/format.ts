function document(document: string = ''): string {
  if (document.length === 11) {
    const p1 = document.slice(0, 3)
    const p2 = document.slice(3, 6)
    const p3 = document.slice(6, 9)
    const checkDigits = document.slice(9)
    return `${p1}.${p2}.${p3}-${checkDigits}`
  } else if (document.length === 14) {
    const p1 = document.slice(0, 2)
    const p2 = document.slice(2, 5)
    const p3 = document.slice(5, 8)
    const p4 = document.slice(8, 12)
    const checkDigits = document.slice(12)
    return `${p1}.${p2}.${p3}/${p4}-${checkDigits}`
  } else {
    return 'Invalid document'
  }
}

function currency(value: number | undefined) {
  if (!value) return

  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function phone(number: string = ''): string {
  const cleanNumber = number.replace(/[^\d+]/g, '')

  if (cleanNumber.length === 10) {
    return cleanNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (cleanNumber.length === 13) {
    return cleanNumber.replace(
      /(\+\d{2})(\d{2})(\d{4})(\d{4})/,
      '$1 ($2) $3-$4',
    )
  } else {
    return cleanNumber.replace(
      /(\+\d{2})(\d{2})(\d{5})(\d{4})/,
      '$1 ($2) $3-$4',
    )
  }
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

function name(name: string): string {
  const names = name.trim().split(/\s+/)

  if (names.length > 2) {
    const firstName =
      names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase()
    const middleInitial = names[1].charAt(0).toUpperCase() + '.'
    const lastName =
      names[names.length - 1].charAt(0).toUpperCase() +
      names[names.length - 1].slice(1).toLowerCase()
    return `${firstName} ${middleInitial} ${lastName}`
  } else {
    return names
      .map(
        (namePart) =>
          namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase(),
      )
      .join(' ')
  }
}

export const Format = {
  parseIso,
  formatIso,
  document,
  phone,
  name,
  currency,
  parseIsoBack,
}
