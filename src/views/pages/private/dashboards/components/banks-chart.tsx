// import {
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	CardTitle,
// } from '@views/components/ui/card'
// import { BarChart } from 'lucide-react'
// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
// import colors from 'tailwindcss/colors'

// export function BanksChart() {
// 	const data = [
// 		{ bankName: 'Inter', value: 800 },
// 		{ bankName: 'Nu Bank', value: 64 },
// 		{ bankName: 'BB', value: 1200 },
// 		{ bankName: 'Santander', value: 760 },
// 		{ bankName: 'Itaú', value: 265 },
// 	]

// 	const COLORS = [
// 		colors.emerald[500],
// 		colors.sky[500],
// 		colors.violet[500],
// 		colors.amber[500],
// 		colors.blue[500],
// 	]

// 	return (
// 		<Card className="col-span-3">
// 			<CardHeader className="pb-8">
// 				<div className="flex items-center justify-between">
// 					<CardTitle className="text-base font-medium">
// 						Receita por bancos
// 					</CardTitle>
// 					<BarChart className="h-5 w-5 text-muted-foreground" />
// 				</div>
// 			</CardHeader>

// 			<CardContent>
// 				<ResponsiveContainer width="100%" height={240}>
// 					<PieChart style={{ fontSize: 12 }}>
// 						<Pie
// 							data={data}
// 							dataKey="value"
// 							nameKey="bankName"
// 							cx="50%"
// 							cy="50%"
// 							outerRadius={86}
// 							innerRadius={64}
// 							strokeWidth={8}
// 							fill={colors.emerald[500]}
// 							labelLine={false}
// 							label={({
// 								cx,
// 								cy,
// 								midAngle,
// 								innerRadius,
// 								outerRadius,
// 								value,
// 								index,
// 							}) => {
// 								const RADIAN = Math.PI / 180
// 								const radius = 12 + innerRadius + (outerRadius - innerRadius)
// 								const x = cx + radius * Math.cos(-midAngle * RADIAN)
// 								const y = cy + radius * Math.sin(-midAngle * RADIAN)

// 								return (
// 									<text
// 										x={x}
// 										y={y}
// 										className="fill-muted-foreground text-xs"
// 										textAnchor={x > cx ? 'start' : 'end'}
// 										dominantBaseline="central"
// 									>
// 										{data[index].bankName.length > 12
// 											? data[index].bankName.substring(0, 12).concat('...')
// 											: data[index].bankName}{' '}
// 										({value})
// 									</text>
// 								)
// 							}}
// 						>
// 							{data.map((_, i) => {
// 								return (
// 									<Cell
// 										key={`cell-${_.value}`}
// 										fill={COLORS[i]}
// 										className="stroke-background hover:opacity-80"
// 									/>
// 								)
// 							})}
// 						</Pie>
// 						<Tooltip />
// 					</PieChart>
// 				</ResponsiveContainer>
// 			</CardContent>
// 		</Card>
// 	)
// }
