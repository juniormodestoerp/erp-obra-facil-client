import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { metricsService } from '@app/services/metrics'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'
import { Button } from '@views/components/ui/button'

export function EvolutionByCategory() {
	const { data } = useQuery({
		queryKey: ['evolutionByCategory'],
		queryFn: async () => await metricsService.evolutionByCategory(),
	})

	return (
		<Fragment>
			<Helmet title="Evolução por categoria" />

			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Evolução por categoria
				</h1>

				<div className="space-y-6">
					{data?.transactions?.length === 0 && (
						<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
							<div className="h-24 text-center flex items-center justify-center">
								<p>Nenhum resultado encontrado</p>
							</div>
						</div>
					)}
					{data?.transactions?.map((transaction) => (
						<div
							key={transaction.id}
							className="bg-white shadow border border-dark-blue rounded-lg p-6"
						>
							<h2 className="text-xl font-semibold text-gray-800">
								{transaction.categoryName === 'padrão'
									? 'Categoria não informada'
									: transaction.categoryName}
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
											{Format.currency(evolution.amount)}
										</div>
										<div
											className={cn(
												'text-sm text-center',
												evolution.percentageChange >= 0
													? 'text-green-500'
													: 'text-red-500',
											)}
										>
											{evolution.percentageChange?.toFixed(2)}%
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
