import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function CashEntries() {
	const { data } = useQuery({
		queryKey: ['cashEntries'],
		queryFn: async () => await metricsService.cashEntries(),
	})

	return (
		<Fragment>
			<Helmet title="Lançamentos de caixa" />

			<div className="">
				<h1>Lançamentos de caixa</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{Format.currency(transaction.totalAmount)} -{' '}
							{Format.parseIso(transaction.transactionDate)} -{' '}
							{transaction.description}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
