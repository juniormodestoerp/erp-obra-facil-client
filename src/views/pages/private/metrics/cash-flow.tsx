import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function CashFlow() {
	const { data } = useQuery({
		queryKey: ['cashFlow'],
		queryFn: async () => await metricsService.cashFlow(),
	})

	return (
		<Fragment>
			<Helmet title="Fluxo de caixa" />

			<div className="">
				<h1>Fluxo de caixa</h1>

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
