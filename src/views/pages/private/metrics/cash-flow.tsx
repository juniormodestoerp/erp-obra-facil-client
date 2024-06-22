import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { metricsService } from '@app/services/metrics'
import { Format } from '@app/utils/format'
import { Button } from '@views/components/ui/button'

export function CashFlow() {
	const { data } = useQuery({
		queryKey: ['cashFlow'],
		queryFn: async () => await metricsService.cashFlow(),
	})

	if (!data) {
		return (
			<Fragment>
				<Helmet title="Fluxo de caixa" />
				<div className="p-8">
					<h1 className="text-3xl font-bold mb-6 text-darker-blue">
						Fluxo de caixa
					</h1>
					<p className="text-center text-gray-500">Carregando...</p>
				</div>
			</Fragment>
		)
	}

	const groupedByMonth = data.dailyBalances.reduce(
		(acc, balance) => {
			const month = balance.date.slice(0, 7) // Extracts "YYYY-MM"
			if (!acc[month]) {
				acc[month] = []
			}
			acc[month].push(balance)
			return acc
		},
		{} as Record<string, typeof data.dailyBalances>,
	)

	const chartData = data.dailyBalances.map((balance) => ({
		date: new Date(balance.date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
		}),
		revenue: balance.totalEntries,
	}))

	return (
		<Fragment>
			<Helmet title="Fluxo de caixa" />

			<div className="p-8 bg-white">
				<h1 className="text-3xl font-bold mb-6 text-darker-blue">
					Fluxo de caixa
				</h1>
				<Card className="col-span-6 mb-8">
					<CardHeader className="flex-row items-center justify-between pb-8">
						<div className="space-y-1">
							<CardTitle>Receita no período</CardTitle>
							<CardDescription>Receita diária no período</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={240}>
							<LineChart data={chartData} style={{ fontSize: 12 }}>
								<CartesianGrid vertical={false} className="stroke-muted" />
								<Line
									type="linear"
									strokeWidth={2}
									dataKey="revenue"
									stroke={colors.blue[700]}
								/>
								<XAxis
									dataKey="date"
									tickLine={false}
									axisLine={false}
									dy={16}
								/>
								<YAxis
									stroke="#888"
									axisLine={false}
									tickLine={false}
									width={80}
									tickFormatter={(value: number) =>
										value.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})
									}
								/>
								<Tooltip contentStyle={{ borderRadius: '8px' }} />
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				{Object.keys(groupedByMonth).length === 0 ? (
					<p className="text-center text-gray-500">
						Nenhum resultado encontrado.
					</p>
				) : (
					Object.keys(groupedByMonth).map((month) => (
						<div key={month} className="mb-8">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								{Format.capitalizeFirstLetter(new Date(`${month}-01`).toLocaleString('default', {
									month: 'long',
									year: 'numeric',
								}))}
							</h2>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Data
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Saldo anterior
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Entradas (R$)
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Saídas (R$)
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Resultado (R$)
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Saldo (R$)
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{groupedByMonth[month].map((balance, index) => (
											<tr key={balance.date}>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{new Date(balance.date).toLocaleDateString('pt-BR', {
														day: '2-digit',
														month: '2-digit',
													})}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{index === 0 &&
													Object.keys(groupedByMonth).indexOf(month) === 0
														? '0,00'
														: Format.currency(
																index === 0
																	? groupedByMonth[
																			Object.keys(groupedByMonth)[
																				Object.keys(groupedByMonth).indexOf(
																					month,
																				) - 1
																			]
																		].slice(-1)[0].endOfDayBalance
																	: groupedByMonth[month][index - 1]
																			.endOfDayBalance,
															)}
												</td>

												<td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
													{Format.currency(balance.totalEntries)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
													{Format.currency(balance.totalExits)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{Format.currency(balance.total)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{Format.currency(balance.endOfDayBalance)}
												</td>
											</tr>
										))}
										<tr className="font-semibold">
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												Total
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
												{Format.currency(
													groupedByMonth[month].reduce(
														(acc, balance) => acc + balance.totalEntries,
														0,
													),
												)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
												{Format.currency(
													groupedByMonth[month].reduce(
														(acc, balance) => acc + balance.totalExits,
														0,
													),
												)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{Format.currency(
													groupedByMonth[month].reduce(
														(acc, balance) => acc + balance.total,
														0,
													),
												)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{Format.currency(
													groupedByMonth[month].slice(-1)[0].endOfDayBalance,
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
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
