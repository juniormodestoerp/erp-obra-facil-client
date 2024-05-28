import { Indicator, Root } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from 'react'

import { cn } from '@/app/utils'

interface Props {
	onCheckedChange: (checked: boolean) => void
}

const Checkbox = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root> & Props
>(({ className, onCheckedChange, ...props }, ref) => (
	<Root
		ref={ref}
		className={cn(
			'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
			className,
		)}
		onCheckedChange={(checked) => onCheckedChange(checked === true)}
		{...props}
	>
		<Indicator className={cn('flex items-center justify-center text-current')}>
			<CheckIcon className="h-4 w-4 pb-0.5" />
		</Indicator>
	</Root>
))
Checkbox.displayName = Root.displayName

export { Checkbox }
