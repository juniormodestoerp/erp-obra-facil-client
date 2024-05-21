import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@views/components/ui/card'

export function DayTransactionsAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Laçamentos (dia)
        </CardTitle>
        <CurrencyDollarIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">8</span>

        <p className="text-xs text-muted-foreground">
          <span className="dark: mr-1 text-rose-500 dark:text-rose-400">
            -2%
          </span>
          em relação ao dia anterior
        </p>
      </CardContent>
    </Card>
  )
}
