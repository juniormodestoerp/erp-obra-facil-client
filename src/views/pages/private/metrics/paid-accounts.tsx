import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function PaidAccounts() {
	const { data } = useQuery({
		queryKey: ['paidAccounts'],
		queryFn: async () => await metricsService.paidAccounts(),
	})

	return (
		<Fragment>
			<Helmet title="Contas pagas" />

			<div className="">
				<h1>Contas pagas</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.name} - {transaction.description} -{' '}
							{Format.currency(transaction.totalAmount)} -{' '}
							{Format.parseIso(transaction.transactionDate)} -{' '}
							{transaction.status}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
