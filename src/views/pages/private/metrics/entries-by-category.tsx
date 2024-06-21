import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function EntriesByCategory() {
	const { data } = useQuery({
		queryKey: ['entriesByCategory'],
		queryFn: async () => await metricsService.entriesByCategory(),
	})

	return (
		<Fragment>
			<Helmet title="Lançamentos por categoria" />

			<div className="">
				<h1>Lançamentos por categoria</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.categoryId} -{' '}
							{Format.currency(transaction.totalAmount)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
