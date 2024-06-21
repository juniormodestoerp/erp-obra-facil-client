import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function EntriesByProject() {
	const { data } = useQuery({
		queryKey: ['entriesByProject'],
		queryFn: async () => await metricsService.entriesByProject(),
	})

	return (
		<Fragment>
			<Helmet title="Lançamentos por projeto" />

			<div className="">
				<h1>Lançamentos por projeto</h1>

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
