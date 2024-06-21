import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function TotalsByCenter() {
	const { data } = useQuery({
		queryKey: ['totalsByCenter'],
		queryFn: async () => await metricsService.totalsByCenter(),
	})

	return (
		<Fragment>
			<Helmet title="Totais por centro" />

			<div className="">
				<h1>Totais por centro</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.centerId} -{' '}
							{Format.currency(transaction.totalAmount)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
