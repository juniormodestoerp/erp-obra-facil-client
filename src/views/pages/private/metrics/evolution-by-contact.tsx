import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function EvolutionByContact() {
	const { data } = useQuery({
		queryKey: ['evolutionByContact'],
		queryFn: async () => await metricsService.evolutionByContact(),
	})

	return (
		<Fragment>
			<Helmet title="Evolução por contato" />

			<div className="">
				<h1>Evolução por contato</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.contactId} -
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
