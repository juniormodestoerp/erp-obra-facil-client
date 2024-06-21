import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'

export function TotalsByContact() {
	const { data } = useQuery({
		queryKey: ['totalsByContact'],
		queryFn: async () => await metricsService.totalsByContact(),
	})

	return (
		<Fragment>
			<Helmet title="Totais por contato" />
			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Totais por contato
				</h1>
				<div className="space-y-6">
					{data?.transactions?.length === 0 && (
						<p className="text-center text-gray-500">
							Nenhum resultado encontrado.
						</p>
					)}
					{data?.transactions?.map(
						(transaction) =>
							transaction.contact !== null && (
								<div
									key={transaction.id}
									className="bg-white shadow border border-dark-blue rounded-lg p-6"
								>
									<h2 className="text-xl font-semibold text-gray-800">
										{transaction.contact}
									</h2>
									<div className="mt-4">
										<span className="text-gray-800 font-medium">
											Total de
											<span className="text-cyan-500 font-semibold mx-1">
												{Format.currency(transaction.totalAmount)}
											</span>
											gastos com o contato
											<span className="text-cyan-500 font-semibold mx-1">
												{transaction.contact}
											</span>
											até o momento.
										</span>
									</div>
								</div>
							),
					)}
				</div>
			</div>
		</Fragment>
	)
}
