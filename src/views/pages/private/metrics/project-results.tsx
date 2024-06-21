import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function ProjectResults() {
	const { data } = useQuery({
		queryKey: ['projectResults'],
		queryFn: async () => await metricsService.projectResults(),
	})

	return (
		<Fragment>
			<Helmet title="Resultados do projeto" />

			<div className="">
				<h1>Resultados do projeto</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.project} - {Format.currency(transaction.totalAmount)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
