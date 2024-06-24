import { Format } from '@app/utils/format'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { RevenueChart } from '@views/pages/private/initial-page/components/bar-chart'
import { BudgetCard } from '@views/pages/private/initial-page/components/budget-card'
import { HomeCard } from '@views/pages/private/initial-page/components/card'

import { useInitialPageController } from '@views/pages/private/initial-page/use-initial-page-controller'

import { useTransaction } from '@app/hooks/use-transaction'
import { useGlobalShortcut } from '@app/utils/global-shortcut'
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'

export function InitialPage() {
	const { isBalanceVisible } = useInitialPageController()

	const { openTransaction, isTransactionOpen, closeTransaction } =
		useTransaction()

	useGlobalShortcut('Ctrl+a', openTransaction)

	return (
		<Fragment>
			<Helmet title="Lançamentos" />

			<div className="grid h-[calc(100vh-172px)] w-full gap-9">
				<div className="flex gap-x-9">
					<HomeCard
						title="Contas a receber"
						value={500}
						color="bg-rose-50/50 border border-rose-500"
					>
						<p className="text-xl text-rose-500 mx-auto">
							{isBalanceVisible ? Format.currency(500) : '***'}
						</p>
					</HomeCard>
					<HomeCard
						title="Contas a pagar"
						color="bg-green-50/50 border border-green-500"
					>
						<p className="text-xl text-green-500 mx-auto">
							{isBalanceVisible ? Format.currency(500) : '***'}
						</p>
					</HomeCard>
					<HomeCard
						title="Saldo"
						color="bg-blue-50/50 border border-darker-blue"
					>
						<p className="text-xl text-darker-blue mx-auto">
							{isBalanceVisible ? Format.currency(500) : '***'}
						</p>
					</HomeCard>
					<HomeCard
						title="Saldo final"
						color="bg-yellow-50/50 border border-yellow-500"
					>
						<p className="text-xl text-yellow-500 mx-auto">
							{isBalanceVisible ? Format.currency(500) : '***'}
						</p>
					</HomeCard>
				</div>
				<div className="grid h-full grid-cols-12 gap-6">
					<BudgetCard />
					<RevenueChart />
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
