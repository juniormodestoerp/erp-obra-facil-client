import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

import { type Card, cashFlowCards, reportCards } from '@/assets/data'

import { useTransaction } from '@app/hooks/use-transaction'
import { useGlobalShortcut } from '@app/utils/global-shortcut'

import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from '@views/components/ui/dialog'

import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'

export function Reports() {
	const { openTransaction, isTransactionOpen, closeTransaction } =
		useTransaction()

	useGlobalShortcut('Ctrl+a', openTransaction)

	return (
		<Fragment>
			<Helmet title="Relatórios" />

			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>

				<div className="text-primary/90 group inline-flex items-center px-1 pt-4 text-sm font-medium text-center mx-auto">
					<p className="flex items-center justify-center mx-auto mr-5">
						<CurrencyDollarIcon className="text-primary -ml-0.5 mr-1.5 h-5 w-5" />
						<span className="text-center mx-auto text-base">Caixa</span>
					</p>
				</div>

				<div className="mt-4 grid grid-cols-2 gap-4">
					{cashFlowCards.map((card: Card) => (
						<Link
							key={card.id}
							to={card.path}
							className="group col-span-1 flex w-full items-center justify-start rounded border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-primary hover:bg-primary dark:border-slate-400 dark:bg-slate-800"
						>
							<span className="text-base font-medium text-foreground group-hover:text-white">
								{card.label}
							</span>
						</Link>
					))}
				</div>

				<div className="text-primary/90 group inline-flex items-center px-1 pt-4 text-sm font-medium text-center mx-auto">
					<p className="flex items-center justify-center mx-auto mr-5">
						<CurrencyDollarIcon className="text-primary -ml-0.5 mr-1.5 h-5 w-5" />
						<span className="text-center mx-auto text-base">
							Receitas e despesas
						</span>
					</p>
				</div>

				<div className="mt-2 grid grid-cols-2 gap-4">
					{reportCards.map((card: Card) => (
						<Link
							key={card.id}
							to={card.path}
							className="group col-span-1 flex w-full items-center justify-start rounded border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-primary hover:bg-primary dark:border-slate-400 dark:bg-slate-800"
						>
							<span className="text-base font-medium text-foreground group-hover:text-white">
								{card.label}
							</span>
						</Link>
					))}
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
