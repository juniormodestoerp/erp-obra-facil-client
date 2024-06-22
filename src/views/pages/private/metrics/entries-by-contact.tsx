import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import type { IEntriesByContact } from '@app/services/metrics/entries-by-contact'
import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'
import { cn } from '@app/utils/cn'

import { Button } from '@views/components/ui/button'

export function EntriesByContact() {
	const { data } = useQuery({
		queryKey: ['entriesByContact'],
		queryFn: async () => await metricsService.entriesByContact(),
	})

	if (!data) {
		return (
			<Fragment>
				<Helmet title="Lançamentos por contato" />
				<div className="p-8">
					<h1 className="text-3xl font-bold mb-6 text-darker-blue">
						Lançamentos por contato
					</h1>
					<p className="text-center text-gray-500">Carregando...</p>
				</div>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<Helmet title="Lançamentos por contato" />
			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Lançamentos por contato
				</h1>
				{data?.transactions?.length === 0 ? (
					<p className="text-center text-gray-500">
						Nenhum resultado encontrado.
					</p>
				) : (
					Object.entries(
						data.transactions.reduce(
							(acc, transaction) => {
								const contact = transaction.contact || 'Contato não informado'
								if (!acc[contact]) {
									acc[contact] = []
								}
								acc[contact].push(transaction)
								return acc
							},
							{} as Record<string, IEntriesByContact[]>,
						),
					).map(([contact, transactions]) => (
						<div
							key={contact}
							className="bg-white shadow border border-dark-blue rounded-lg p-6 mb-6"
						>
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								{contact}
							</h2>
							<ul className="space-y-6">
								{transactions.map((transaction, idx) => (
									<li key={transaction.id} className="relative flex">
										<div
											className={`absolute left-0 top-0 flex w-6 justify-center ${idx === transactions.length - 1 ? 'h-6' : '-bottom-6'}`}
										>
											<div className="w-px bg-gray-200" />
										</div>
										<>
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
											</p>
											<time
												dateTime={transaction.transactionDate}
												className="flex-none py-0.5 text-xs leading-5 text-gray-500"
											>
												{Format.parseIso(transaction.transactionDate)}
											</time>
										</>
									</li>
								))}
							</ul>
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
