import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function EvolutionOfCenterGoals() {
	const { data } = useQuery({
		queryKey: ['evolutionByCenter'],
		queryFn: async () => await metricsService.evolutionByCenter(),
	})

	return (
		<Fragment>
			<Helmet title="Evolução das metas por centro" />

			<div className="">
				<h1>Evolução das Metas por Centro</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.centerId} -
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
