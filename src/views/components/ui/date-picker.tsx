import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cn } from '@app/utils/cn'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
import { Calendar } from '@views/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@views/components/ui/popover'

interface Props {
	inputId: string
	optional?: boolean
	label: string
	selected: Date | null
	onChange: (date: Date | undefined) => void
	error?: string
}

export const DatePicker = forwardRef<HTMLDivElement, Props>(
	({ label, selected, inputId, optional, onChange, error }, ref) => {
		const [triggerWidth, setTriggerWidth] = useState<number | undefined>(
			undefined,
		)
		const triggerRef = useRef<HTMLDivElement>(null)

		useEffect(() => {
			if (triggerRef.current) {
				setTriggerWidth(triggerRef.current.offsetWidth)
			}
		}, [])

		return (
			<Popover>
				<PopoverTrigger asChild>
					<div ref={triggerRef}>
						<label
							htmlFor={inputId}
							className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100"
						>
							{label} {!optional && <span className="text-red-600">*</span>}
						</label>
						<Button
							id={inputId}
							type="button"
							variant={'outline'}
							className={cn(
								'h-[38px] w-full justify-start rounded border border-zinc-400 px-3 text-left font-normal',
								!selected && 'text-muted-foreground',
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{selected ? (
								format(selected, 'PPP', { locale: ptBR })
							) : (
								<span>Escolha uma data...</span>
							)}
						</Button>
					</div>
				</PopoverTrigger>
				<PopoverContent
					className="z-[99999] bg-white p-0"
					align="start"
					style={{ width: triggerWidth }}
				>
					<Calendar
						mode="single"
						selected={selected ?? new Date()}
						onSelect={onChange}
						initialFocus
					/>
				</PopoverContent>
				{error && (
					<div className="mt-2 flex items-center gap-1.5 text-red-600">
						<div>
							<XCircleIcon className="h-5" />
						</div>
						<span className="text-xs">{error}</span>
					</div>
				)}
			</Popover>
		)
	},
)

DatePicker.displayName = 'DatePicker'
