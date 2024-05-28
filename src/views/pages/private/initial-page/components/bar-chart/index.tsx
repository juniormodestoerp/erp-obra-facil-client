import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'
import { ChartTooltip } from './components/chart-tootip'

export function RevenueChart() {
	const data = [
		{
			name: 'Jan',
			primary: 40,
			secondary: 24,
			date: new Date(),
		},
		{
			name: 'Fev',
			primary: 30,
			secondary: 13,
			date: new Date(),
		},
		{
			name: 'Mar',
			primary: 20,
			secondary: 98,
			date: new Date(),
		},
		{
			name: 'Abril',
			primary: 27,
			secondary: 39,
			date: new Date(),
		},
		{
			name: 'Mai',
			primary: 18,
			secondary: 48,
			date: new Date(),
		},
		{
			name: 'Jun',
			primary: 23,
			secondary: 38,
			date: new Date(),
		},
		{
			name: 'Jul',
			primary: 34,
			secondary: 43,
			date: new Date(),
		},
		{
			name: 'Ago',
			primary: 84,
			secondary: 36,
			date: new Date(),
		},
		{
			name: 'Set',
			primary: 46,
			secondary: 72,
			date: new Date(),
		},
		{
			name: 'Out',
			primary: 94,
			secondary: 22,
			date: new Date(),
		},
		{
			name: 'Nov',
			primary: 57,
			secondary: 19,
			date: new Date(),
		},
		{
			name: 'Dez',
			primary: 28,
			secondary: 69,
			date: new Date(),
		},
	]

	return (
		<Card className="col-span-8 h-fit">
			<CardHeader className="pb-2 text-center">
				<CardTitle className="mx-auto">Relação das obras anuais</CardTitle>
			</CardHeader>

			<CardContent className="p-4 pl-1">
				<div className="h-full w-full">
					<ResponsiveContainer width="100%" height={350}>
						<BarChart
							data={data}
							margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						>
							<Tooltip
								cursor={{ fill: '#f4f4f5', z: -1 }}
								content={<ChartTooltip payload={data} />}
							/>
							<CartesianGrid
								vertical={false}
								strokeDasharray="2 2"
								className="stroke-muted-foreground/40"
							/>
							<XAxis dataKey="name" stroke="#888" />
							<YAxis
								stroke="#888"
								type="number"
								axisLine={false}
								tickLine={false}
								domain={[0, 'dataMax']}
								ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
								tickMargin={5}
							/>
							<Bar dataKey="secondary" fill={colors.purple[500]} barSize={5} />
							<Bar dataKey="primary" fill={colors.red[500]} barSize={5} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
