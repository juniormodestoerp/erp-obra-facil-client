import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function TotalsByCategory() {
	const { data } = useQuery({
		queryKey: ['totalsByCategory'],
		queryFn: async () => await metricsService.totalsByCategory(),
	})

	return (
		<Fragment>
			<Helmet title="Totais por categoria" />

			<div className="">
				<h1>Totais por categoria</h1>

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
