import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function AccountsPayable() {
	const { data } = useQuery({
		queryKey: ['accountsPayable'],
		queryFn: async () => await metricsService.accountsPayable(),
	})

	return (
		<Fragment>
			<Helmet title="Contas a pagar" />

			<div className="">
				<h1>Contas a pagar</h1>

				<ul>
					{data?.transactions?.length === 0 && (
						<li>Nenhum resultado encontrado.</li>
					)}
					{data?.transactions?.map((transaction) => (
						<li key={transaction.id}>
							{transaction.categoryId} -{' '}
							{Format.currency(transaction.totalAmount)} -{' '}
							{Format.parseIso(transaction.transactionDate)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	)
}
