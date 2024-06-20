// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from '@views/components/ui/card'
// import {
// 	CartesianGrid,
// 	Line,
// 	LineChart,
// 	ResponsiveContainer,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from 'recharts'
// import colors from 'tailwindcss/colors'

// export function RevenueChart() {
// 	const data = [
// 		{ date: '01/01', revenue: 800 },
// 		{ date: '02/01', revenue: 64 },
// 		{ date: '03/01', revenue: 1200 },
// 		{ date: '04/01', revenue: 760 },
// 		{ date: '05/01', revenue: 265 },
// 		{ date: '06/01', revenue: 148 },
// 		{ date: '07/01', revenue: 3450 },
// 		{ date: '08/01', revenue: 1900 },
// 		{ date: '09/01', revenue: 654 },
// 	]

// 	return (
// 		<Card className="col-span-6">
// 			<CardHeader className="flex-row items-center justify-between pb-8">
// 				<div className="space-y-1">
// 					<CardTitle>Receita no período</CardTitle>
// 					<CardDescription>Receita diária no período</CardDescription>
// 				</div>
// 			</CardHeader>

// 			<CardContent>
// 				<ResponsiveContainer width="100%" height={240}>
// 					<LineChart data={data} style={{ fontSize: 12 }}>
// 						<CartesianGrid vertical={false} className="stroke-muted" />
// 						<Line
// 							type="linear"
// 							strokeWidth={2}
// 							dataKey="revenue"
// 							stroke={colors.blue[700]}
// 						/>
// 						<XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
// 						<YAxis
// 							stroke="#888"
// 							axisLine={false}
// 							tickLine={false}
// 							width={80}
// 							tickFormatter={(value: number) =>
// 								value.toLocaleString('pt-BR', {
// 									style: 'currency',
// 									currency: 'BRL',
// 								})
// 							}
// 						/>
// 						<Tooltip contentStyle={{ borderRadius: '8px' }} />
// 					</LineChart>
// 				</ResponsiveContainer>
// 			</CardContent>
// 		</Card>
// 	)
// }
