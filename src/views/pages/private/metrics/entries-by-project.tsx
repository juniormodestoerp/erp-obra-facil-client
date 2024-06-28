import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { metricsService } from '@app/services/metrics'
import type { IEntriesByProject } from '@app/services/metrics/entries-by-project'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'
import { Button } from '@views/components/ui/button'

export function EntriesByProject() {
    const { data } = useQuery({
        queryKey: ['entriesByProject'],
        queryFn: async () => await metricsService.entriesByProject(),
    })

    return (
        <Fragment>
            <Helmet title="Lançamentos por projeto" />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-darker-blue">
                    Lançamentos por projeto
                </h1>
                {data?.transactions?.length === 0 ? (
                    <div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
                        <div className="h-24 text-center flex items-center justify-center">
                            <p>Nenhum resultado encontrado</p>
                        </div>
                    </div>
                ) : (
                    data && Object.entries(
                        data.transactions.reduce(
                            (acc, transaction) => {
                                const project = transaction.project || 'Projeto não informado'
                                if (!acc[project]) {
                                    acc[project] = []
                                }
                                acc[project].push(transaction)
                                return acc
                            },
                            {} as Record<string, IEntriesByProject[]>,
                        ),
                    ).map(([project, transactions]) => (
                        <div
                            key={project}
                            className="bg-white shadow border border-dark-blue rounded-lg p-6 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {project}
                            </h2>
                            <ul className="space-y-6">
                                {transactions.map((transaction, idx) => (
                                    <li key={transaction.id} className="relative flex">
                                        <div
                                            className={`absolute left-0 top-0 flex w-6 justify-center ${idx === transactions.length - 1 ? 'h-6' : '-bottom-6'}`}
                                        >
                                            <div className="w-px bg-gray-200" />
                                        </div>
                                        <>
                                            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                                <CheckCircleIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500 px-4">
                                                <span className="font-medium text-gray-900 mr-1">
                                                    {Format.capitalizeFirstLetter(transaction.description)}
                                                </span>
                                                no valor de{' '}
                                                <span
                                                    className={cn(
                                                        transaction.amount > 0
                                                            ? 'text-green-600'
                                                            : 'text-red-600',
													)}
												>
													{Format.currency(transaction.amount)}
												</span>
											</p>
											<time
												dateTime={transaction.date}
												className="flex-none py-0.5 text-xs leading-5 text-gray-500"
											>
												{Format.parseIso(transaction.date)}
											</time>
										</>
									</li>
								))}
							</ul>
						</div>
					))
				)}
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
