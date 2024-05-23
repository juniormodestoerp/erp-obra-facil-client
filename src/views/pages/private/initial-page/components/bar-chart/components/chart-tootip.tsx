import colors from 'tailwindcss/colors'
interface IPayload {
  name: string
  primary: number
  secondary: number
  date: Date
}

interface ChartData {
  chartType?: string
  color: string
  dataKey: string
  fill: string
  formatter?: (value: any) => string
  hide: boolean
  name: string
  payload: IPayload
  type?: string
  unit?: string
  value: number
}

interface Props {
  payload: any[]
  active?: boolean
}

export function ChartTooltip({ payload, active }: Props) {
  function monthFullName(monthAbbreviation: string): string {
    const months: string[] = [
      'Jan',
      'Fev',
      'Mar',
      'Abril',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ]

    if (!months.includes(monthAbbreviation)) {
      return 'Invalid month'
    }

    const index: number = months.indexOf(monthAbbreviation)

    const fullName: string = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ][index]

    return fullName
  }

  if (active) {
    return (
      <div
        style={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          backgroundColor: '#1FAD77',
          border: 'none',
          textShadow: '10px',
          fontWeight: 500,
          color: colors.white,
          padding: '10px',
        }}
      >
        <label style={{ fontWeight: 600, color: colors.white }}>
          {`${monthFullName(payload[0].payload.name)} - ${new Date(payload[0].payload.date).getFullYear()}`}
        </label>

        <div style={{ height: '8px' }} />

        {payload.map((entry: ChartData) => {
          let color = ''
          let name = ''
          switch (entry.name) {
            case 'primary':
              color = '#E46962'
              name = 'Canceladas'
              break
            case 'secondary':
              color = '#9772D6'
              name = 'Realizadas'
              break
          }

          return (
            <>
              <div key={name}>
                <span
                  style={{
                    height: '12px',
                    width: '12px',
                    backgroundColor: color,
                    display: 'inline-block',
                    marginRight: '5px',
                    borderRadius: '2px',
                  }}
                />
                {name}
              </div>
            </>
          )
        })}
      </div>
    )
  }

  return null
}
