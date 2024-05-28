import { cn } from '@app/utils/cn'
import { XCircleIcon } from '@heroicons/react/24/outline'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { type ComponentProps, forwardRef } from 'react'
import { Controller } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
	name: string
	label: string
	placeholder?: string
	error?: string
	control?: any
	id?: string
	labelClassName?: string
}

export const InputDocument = forwardRef<HTMLInputElement, Props>(
	(
		{
			placeholder,
			label,
			control,
			name,
			id,
			error,
			className,
			labelClassName,
			...props
		},
		ref,
	) => {
		const inputId = id ?? name

		return (
			<div
				className={cn(
					'flex w-full flex-col',
					props.disabled && 'cursor-not-allowed select-none',
				)}
			>
				<label
					htmlFor={inputId}
					className={cn(
						'block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100',
						props.disabled && 'cursor-not-allowed select-none',
						labelClassName,
					)}
				>
					{label}
				</label>

				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, onBlur, value } }) => (
						<CpfCnpj
							{...props}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							id={inputId}
							ref={ref}
							placeholder={placeholder}
							className={cn(
								'block w-full max-w-sm rounded border border-zinc-400 px-3 py-1.5 text-xs text-zinc-900 shadow outline-none placeholder:text-zinc-400 hover:border-primary focus:border-primary  focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
								props.disabled &&
									'pointer-events-none cursor-not-allowed select-none',
								error && '!border-red-600',
								className,
							)}
						/>
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

InputDocument.displayName = 'InputDocument'
