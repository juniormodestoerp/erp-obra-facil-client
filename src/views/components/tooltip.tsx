import {
	Tooltip as SdcnTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@views/components/ui/tooltip'
import type { ReactNode } from 'react'

interface Props {
	text: string
	children: ReactNode
}

export function Tooltip({ text, children }: Props) {
	return (
		<TooltipProvider>
			<SdcnTooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<p className="text-sm font-medium text-white">{text}</p>
				</TooltipContent>
			</SdcnTooltip>
		</TooltipProvider>
	)
}
