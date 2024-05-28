import { cn } from '@app/utils/cn'
import type { ComponentProps, ElementType } from 'react'

interface Props extends ComponentProps<'button'> {
	icon: ElementType
}

export function Action({ icon: Icon, ...props }: Props) {
	return (
		<button
			{...props}
			className={cn(
				'flex h-6 w-6 items-center justify-center rounded bg-primary hover:bg-primary/90',
				props.className,
			)}
		>
			<Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
		</button>
	)
}
