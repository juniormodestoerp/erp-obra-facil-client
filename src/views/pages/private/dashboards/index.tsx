import { DayTransactionsAmountCard } from '@views/pages/private/dashboards/components/day-transactions-amount-card'
import { MonthReconciledAmountCard } from '@views/pages/private/dashboards/components/month-reconciled-amount-card'
import { MonthRevenueCard } from '@views/pages/private/dashboards/components/month-revenue-card'
import { MonthTransactionsAmountCard } from '@views/pages/private/dashboards/components/month-transactions-amount-card'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { BanksChart } from './components/banks-chart'
import { RevenueChart } from './components/revenue-chart'

import { useGlobalShortcut } from '@app/utils/global-shortcut'
import { useTransaction } from '@app/hooks/use-transaction'
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'

export function Dashboards() {
	const { openTransaction, isTransactionOpen, closeTransaction } =
		useTransaction()

	useGlobalShortcut('Ctrl+a', openTransaction)

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
			<Dialog
				open={isTransactionOpen}
				onOpenChange={(open) => {
					open ? openTransaction() : closeTransaction()
				}}
			>
				<DialogOverlay />
				<DialogTrigger asChild>
					<button type="button" className="hidden" />
				</DialogTrigger>
				<NewFundRealeaseContent />
			</Dialog>
		</Fragment>
	)
}
