import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function TotalsByProject() {
	const { data } = useQuery({
		queryKey: ['totalsByProject'],
		queryFn: async () => await metricsService.totalsByProject(),
	})

	return (
		<Fragment>
			<Helmet title="Totais por projeto" />

			<div className="">
				<h1>Totais por projeto</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.projectId} -{' '}
							{Format.currency(transaction.totalAmount)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
