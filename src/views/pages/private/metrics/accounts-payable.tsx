import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { metricsService } from '@app/services/metrics'
import type { IAccountsPayable } from '@app/services/metrics/accounts-payable'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'

// import { Badge } from '@views/components/ui/badge'
import { Button } from '@views/components/ui/button'

export function AccountsPayable() {
	const { data } = useQuery({
		queryKey: ['accountsPayable'],
		queryFn: async () => await metricsService.accountsPayable(),
	})

	const groupByMonth = (transactions: IAccountsPayable[]) => {
		return transactions.reduce(
			(
				acc: Record<string, IAccountsPayable[]>,
				transaction: IAccountsPayable,
			) => {
				const month = new Date(transaction.date).toLocaleString(
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

	const groupedTransactions = groupByMonth(data?.transactions ?? [])

	return (
		<Fragment>
			<Helmet title="Contas a pagar" />
			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Contas a pagar
				</h1>
				{Object.keys(groupedTransactions).length === 0 ? (
					<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
						<div className="h-24 text-center flex items-center justify-center">
							<p>Nenhum resultado encontrado</p>
						</div>
					</div>
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
													{transaction.description}
												</span>
												no valor de{' '}
												<span
													className={cn(
														transaction.amount > 0
															? 'text-green-600'
															: 'text-red-600',
													)}
												>
													{Format.currency(transaction.amount)}
												</span>
												{/* <span className="mx-1">
													{transaction?.tags?.map((tag) => (
														<Badge key={tag} className="bg-dark-blue">
															{tag}
														</Badge>
													))}
												</span> */}
												<span className='ml-1'>
													Método de Pagamento:{' '}
													{transaction.method === 'credit'
														? 'cartão de crédito'
														: transaction.method === 'debit'
															? 'cartão de débito'
															: transaction.method}
												</span>
											</p>
											<time
												dateTime={transaction.date}
												className="flex-none py-0.5 text-xs leading-5 font-medium text-red-600"
											>
												{Format.parseIso(transaction.date)}
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
