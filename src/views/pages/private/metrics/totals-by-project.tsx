import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'
import { Button } from '@views/components/ui/button'

export function TotalsByProject() {
	const { data } = useQuery({
		queryKey: ['totalsByProject'],
		queryFn: async () => await metricsService.totalsByProject(),
	})

	return (
		<Fragment>
			<Helmet title="Totais por projeto" />

			<div className="p-8">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Totais por projeto
				</h1>

				<div className="space-y-6">
					{data?.transactions?.length === 0 && (
						<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
							<div className="h-24 text-center flex items-center justify-center">
								<p>Nenhum resultado encontrado</p>
							</div>
						</div>
					)}
					{data?.transactions?.map(
						(transaction) => (
								<div
									key={transaction.id}
									className="bg-white shadow border border-dark-blue rounded-lg p-6"
								>
									<h2 className="text-xl font-semibold text-gray-800">
										{transaction.project ?? 'Não informado'}
									</h2>
									<div className="mt-4">
										<span className="text-gray-800 font-medium">
											Total de
											<span className="text-cyan-500 font-semibold mx-1">
												{Format.currency(transaction.amount)}
											</span>
											gastos no projeto
											<span className="text-cyan-500 font-semibold mx-1">
												{transaction.project ?? 'não informado'}
											</span>
											até o momento.
										</span>
									</div>
								</div>
							),
					)}
				</div>
				<div className="w-full flex justify-end mt-8">
					<Button
						type="button"
						onClick={() => window.print()}
						className="bg-dark-blue hover:bg-dark-blue/90 text-white font-bold py-2 px-4 rounded print:hidden"
					>
						Imprimir relatório
					</Button>
				</div>
			</div>
		</Fragment>
	)
}
