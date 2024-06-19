import type { ReactNode } from 'react'

import { cn } from '@app/utils/cn'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'

interface Props {
	title: string
	color: string
	children: ReactNode
	value?: number
}

export function HomeCard({ title, color, children, value }: Props) {
	function findPercentage(previousValue: number, currentValue: number) {
		return ((currentValue / previousValue) * 100).toFixed(0)
	}

	return (
		<Card className={cn('w-full text-xs', color && color)}>
			<CardHeader className="mb-0 pb-2">
				<CardTitle className="mx-auto text-sm text-zinc-800">{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-[13px] pb-0">
				{children}
				<div className="flex items-start justify-between flex-col">
					<p className="flex gap-1.5 text-zinc-700">
						<span className="mt-[5px] h-1.5 w-2 rounded-full bg-green-500" />
						{value && findPercentage(250, value)}% a menos em relação ao mês anterior.
					</p>
					{/* <p className="flex gap-1.5 text-zinc-700 mt-2">
						<span className="mt-[3px] h-2.5 w-2.5 rounded-full bg-dark-blue" />
						15% a mais em relação ao mês atual.
					</p> */}
				</div>
			</CardContent>
		</Card>
	)
}
