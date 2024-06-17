import { cn } from '@app/utils/cn'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { type ComponentProps, forwardRef } from 'react'

interface Props extends ComponentProps<'input'> {
	name: string
	label: string
	error?: string
	labelClassName?: string
	optional?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
	(
		{
			id,
			placeholder,
			label,
			name,
			error,
			className,
			labelClassName,
			optional,
			...props
		},
		ref,
	) => {
		const inputId = id ?? name

		return (
			<div className="flex flex-1 flex-col">
				<label
					htmlFor={inputId}
					className={cn(
						'block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100',
						labelClassName,
					)}
				>
					{label} {!optional && <span className="text-red-600">*</span>}
				</label>

				<input
					{...props}
					ref={ref}
					name={name}
					id={inputId}
					placeholder={placeholder}
					className={cn(
						'block w-full max-w-sm rounded border border-zinc-400 dark:text-zinc-100 px-3 py-1.5 text-xs text-zinc-900 shadow outline-none placeholder:text-zinc-400 hover:border-primary focus:border-primary focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6 dark:bg-zinc-600',
						props.disabled &&
							'pointer-events-none cursor-not-allowed select-none',
						error && '!border-red-600',
						className,
					)}
				/>

				{error && (
					<div className="mt-2 flex items-center gap-1.5 text-red-600">
						<div>
							<XCircleIcon className="h-5" />
						</div>
						<span className="text-xs">{error}</span>
					</div>
				)}
			</div>
		)
	},
)
Input.displayName = 'Input'
