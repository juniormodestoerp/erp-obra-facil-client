import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function EntriesByCenter() {
	const { data } = useQuery({
		queryKey: ['entriesByCenter'],
		queryFn: async () => await metricsService.entriesByCenter(),
	})

	return (
		<Fragment>
			<Helmet title="Lançamentos por centro" />

			<div className="">
				<h1>Lançamentos por centro</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.costAndProfitCenters} -{' '}
							{Format.currency(transaction.totalAmount)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
