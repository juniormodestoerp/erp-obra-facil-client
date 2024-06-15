import { type ComponentProps, forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { XCircleIcon } from '@heroicons/react/24/outline'

import { cn } from '@app/utils/cn'

interface Props extends ComponentProps<'input'> {
	id?: string
	control?: any
	placeholder?: string
	name: string
	label: string
	error?: string
	labelClassName?: string
	optional?: boolean
}

export const InputDocument = forwardRef<HTMLInputElement, Props>(
	(
		{
			id,
			control,
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
						labelClassName,
					)}
				>
					{label} {!optional && <span className="text-red-600">*</span>}
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
