import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'
import { cn } from '@app/utils/cn'

export function EvolutionByCenter() {
	const { data } = useQuery({
		queryKey: ['evolutionByCenter'],
		queryFn: async () => await metricsService.evolutionByCenter(),
	})

	return (
		<Fragment>
			<Helmet title="Evolução por centro" />

			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Evolução por centro
				</h1>

				<div className="space-y-6">
					{data?.transactions?.length === 0 && (
						<p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
					)}
					{data?.transactions?.map((transaction) => (
						<div key={transaction.id} className="bg-white shadow border border-dark-blue rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-800">
								{transaction.centerName ?? 'Centro não informado'}
							</h2>
							<ul className="mt-4 space-y-2">
								{transaction.evolution.map((evolution) => (
									<li
										key={evolution.date}
										className="flex justify-between items-center"
									>
										<div className="text-gray-600">
											{Format.parseIso(evolution.date)}
										</div>
										<div className="text-gray-800 font-medium text-center">
											{Format.currency(evolution.totalAmount)}
										</div>
										<div
											className={cn(
												'text-sm text-center',
												evolution.percentageChange >= 0
													? 'text-green-500'
													: 'text-red-500',
											)}
										>
											{evolution.percentageChange.toFixed(2)}%
										</div>
										<div className="text-gray-800 font-semibold text-right">
											Acumulado: {Format.currency(evolution.accumulatedTotal)}
										</div>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</Fragment>
	)
}
