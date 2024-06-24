import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { metricsService } from '@app/services/metrics'
import type { IAccountsReceivable } from '@app/services/metrics/accounts-receivable'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'

import { Badge } from '@views/components/ui/badge'
import { Button } from '@views/components/ui/button'

export function AccountsReceivable() {
	const { data } = useQuery({
		queryKey: ['accountsReceivable'],
		queryFn: async () => await metricsService.accountsReceivable(),
	})

	if (!data) {
		return (
			<Fragment>
				<Helmet title="Contas a receber" />
				<div className="p-8">
					<h1 className="text-3xl font-bold mb-6 text-darker-blue">
						Contas a receber
					</h1>
					<p className="text-center text-gray-500">Carregando...</p>
				</div>
			</Fragment>
		)
	}

	const groupByMonth = (transactions: IAccountsReceivable[]) => {
		return transactions.reduce(
			(
				acc: Record<string, IAccountsReceivable[]>,
				transaction: IAccountsReceivable,
			) => {
				const month = new Date(transaction.transactionDate).toLocaleString(
					'default',
					{ month: 'long', year: 'numeric' },
				)
				if (!acc[month]) {
					acc[month] = []
				}
				acc[month].push(transaction)
				return acc
			},
			{},
		)
	}

	const groupedTransactions = groupByMonth(data.transactions)

	return (
		<Fragment>
			<Helmet title="Contas a receber" />
			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Contas a receber
				</h1>
				{Object.keys(groupedTransactions).length === 0 ? (
					<p className="text-center text-gray-500">
						Nenhum resultado encontrado.
					</p>
				) : (
					Object.entries(groupedTransactions).map(([month, transactions]) => (
						<div key={month} className="mb-8">
							<h2 className="text-2xl font-semibold mb-4">
								{Format.capitalizeFirstLetter(month)}
							</h2>
							<div className="bg-white shadow border border-dark-blue rounded-lg p-6 mb-6">
								<ul className="space-y-6">
									{transactions.map((transaction, idx) => (
										<li key={transaction.id} className="relative flex gap-x-4">
											<div
												className={cn(
													idx === transactions.length - 1 ? 'h-6' : '-bottom-6',
													'absolute left-0 top-0 flex w-6 justify-center',
												)}
											>
												<div className="w-px bg-gray-200" />
											</div>

											<div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
												<CheckCircleIcon
													className="h-6 w-6"
													aria-hidden="true"
												/>
											</div>
											<p className="flex-auto py-0.5 text-xs leading-5 text-gray-500 px-4">
												<span className="font-medium text-gray-900 mr-1">
													{transaction.name}
												</span>
												no valor de{' '}
												<span
													className={cn(
														transaction.totalAmount > 0
															? 'text-green-600'
															: 'text-red-600',
													)}
												>
													{Format.currency(transaction.totalAmount)}
												</span>
												<span className="mx-1">
													{transaction?.tags?.split(', ').map((tag) => (
														<Badge key={tag} className="bg-dark-blue">
															{tag}
														</Badge>
													))}
												</span>
												<span>
													Método de Pagamento:{' '}
													{transaction.paymentMethod === 'credit'
														? 'cartão de crédito'
														: transaction.paymentMethod === 'debit'
															? 'cartão de débito'
															: transaction.paymentMethod}
												</span>
											</p>
											<time
												dateTime={transaction.transactionDate}
												className="flex-none py-0.5 text-xs leading-5 text-green-600 font-medium"
											>
												{Format.parseIso(transaction.transactionDate)}
											</time>
										</li>
									))}
								</ul>
							</div>
						</div>
					))
				)}
				<div className="w-full flex justify-end mt-8">
					<Button
						type="button"
						onClick={() => window.print()}
						className="bg-dark-blue hover:bg-dark-blue/90 text-white font-bold py-2 px-4 rounded print:hidden"
					>
						Imprimir relatório
					</Button>
				</div>
			</div>
		</Fragment>
	)
}
