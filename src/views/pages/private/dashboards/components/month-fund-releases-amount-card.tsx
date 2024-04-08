import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@views/components/ui/card'

export function MonthFundReleasesAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Laçamentos (mês)
        </CardTitle>
        <CurrencyDollarIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">84</span>

        <p className="text-xs text-muted-foreground">
          <span className="dark: mr-1 text-emerald-500 dark:text-emerald-400">
            4%
          </span>
          em relação ao mês anterior
        </p>
      </CardContent>
    </Card>
  )
}
