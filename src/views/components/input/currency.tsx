import { XCircleIcon } from '@heroicons/react/24/outline'
import { type ComponentProps, type ReactNode, forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import IntlCurrencyInput from 'react-intl-currency-input'

import { cn } from '@app/utils/cn'

interface Props extends ComponentProps<'input'> {
	name: string
	label: string
	placeholder?: string
	error?: string
	control?: any
	id?: string
	Icon?: ReactNode
	optional?: boolean
}

export const InputCurrency = forwardRef<HTMLInputElement, Props>(
	(
		{
			placeholder,
			label,
			control,
			name,
			id,
			error,
			className,
			Icon,
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
						'block text-sm font-medium leading-6 tracking-tight text-zinc-900',
						props.disabled && 'cursor-not-allowed select-none',
					)}
				>
					{label}{' '}
					{optional ? (
						<span className="text-xs tracking-tighter text-zinc-500">
							( opcional )
						</span>
					) : (
						<span className="text-red-600">*</span>
					)}
				</label>

				<div className="relative">
					<Controller
						control={control}
						name={name}
						render={({ field: { onChange, onBlur, value } }) => (
							<IntlCurrencyInput
								{...props}
								currency="BRL"
								config={{
									locale: 'pt-BR',
									formats: {
										number: {
											BRL: {
												style: 'decimal',
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											},
										},
									},
								}}
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								id={inputId}
								ref={ref}
								placeholder={placeholder}
								className={cn(
									'block w-full rounded-md border border-zinc-400 px-3 py-1.5 text-xs text-zinc-900 shadow outline-none placeholder:text-zinc-400 hover:border-primary focus:border-primary  focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
									props.disabled &&
										'pointer-events-none cursor-not-allowed select-none',
									error && '!border-red-600',
									className,
								)}
							/>
						)}
					/>
					<span className="absolute right-3 top-[9px]">{Icon}</span>
				</div>

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

InputCurrency.displayName = 'InputCurrency'
