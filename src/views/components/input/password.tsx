import { cn } from '@app/utils/cn'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { type ComponentProps, forwardRef, useState } from 'react'

import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'

type PwdProps = 'password' | 'text'

interface Props extends ComponentProps<'input'> {
	name: string
	label: string
	placeholder?: string
	error?: string
	labelClassName?: string
	optional?: boolean
}

export const InputPassword = forwardRef<HTMLInputElement, Props>(
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

		const [isPasswordVisible, setIsPasswordVisible] =
			useState<PwdProps>('password')

		return (
			<div className="relative flex flex-1 flex-col">
				<label
					htmlFor={inputId}
					className={cn(
						'block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100',
						labelClassName,
					)}
				>
					{label} {!optional && <span className="text-red-600">*</span>}
				</label>


				<div className="relative">
					<input
						{...props}
						ref={ref}
						type={isPasswordVisible}
						name={name}
						id={inputId}
						placeholder={placeholder}
						className={cn(
							'block w-full max-w-sm rounded border border-zinc-400 px-3 py-1.5 text-xs text-zinc-900 shadow outline-none placeholder:text-zinc-400 hover:border-primary focus:border-primary focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
							props.disabled &&
								'pointer-events-none cursor-not-allowed select-none',
							error && '!border-red-600',
							className,
						)}
					/>
					<span
						className="absolute right-0 top-[-5px] cursor-pointer"
						onClick={() => {
							setIsPasswordVisible((prev) =>
								prev === 'password' ? 'text' : 'password',
							)
						}}
						onKeyUp={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								setIsPasswordVisible((prev) =>
									prev === 'password' ? 'text' : 'password',
								)
							}
						}}
						tabIndex={0}
						role="button"
					>
						{isPasswordVisible === 'password' ? (
							<EyeIcon
								className={cn(
									'mx-3 my-2.5 h-7 w-7 text-dark-blue',
									error && 'text-red-600',
								)}
							/>
						) : (
							<EyeSlashIcon
								className={cn(
									'mx-3 my-2.5 h-7 w-7 text-dark-blue',
									error && 'text-red-600',
								)}
							/>
						)}
					</span>
				</div>

				{error && (
					<div className="mb-2 mt-2 flex items-center gap-1.5 text-red-600">
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
InputPassword.displayName = 'InputPassword'
