import { DayTransactionsAmountCard } from '@views/pages/private/dashboards/components/day-transactions-amount-card'
import { MonthReconciledAmountCard } from '@views/pages/private/dashboards/components/month-reconciled-amount-card'
import { MonthRevenueCard } from '@views/pages/private/dashboards/components/month-revenue-card'
import { MonthTransactionsAmountCard } from '@views/pages/private/dashboards/components/month-transactions-amount-card'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { BanksChart } from './components/banks-chart'
import { RevenueChart } from './components/revenue-chart'

export function Dashboards() {
	return (
		<Fragment>
			<Helmet title="Lançamentos" />

			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold tracking-tight">Dashboards</h1>

				<div className="grid grid-cols-4 gap-4">
					<MonthRevenueCard />
					<MonthTransactionsAmountCard />
					<DayTransactionsAmountCard />
					<MonthReconciledAmountCard />
				</div>

				<div className="grid grid-cols-9 gap-4">
					<RevenueChart />
					<BanksChart />
				</div>
			</div>
		</Fragment>
	)
}
