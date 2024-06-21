import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function EvolutionByCategory() {
	const { data } = useQuery({
		queryKey: ['evolutionByCategory'],
		queryFn: async () => await metricsService.evolutionByCategory(),
	})

	return (
		<Fragment>
			<Helmet title="Evolução por categoria" />

			<div className="">
				<h1>Evolução por categoria</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.categoryId} -
							{transaction.evolution.map((evolution) => (
								<span key={evolution.date}>
									{Format.parseIso(evolution.date)}:{' '}
									{Format.currency(evolution.totalAmount)}
								</span>
							))}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
