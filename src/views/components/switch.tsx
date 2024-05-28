import { Root, Thumb } from '@radix-ui/react-switch'
import {
	type ComponentPropsWithoutRef,
	type Dispatch,
	type ElementRef,
	type SetStateAction,
	forwardRef,
	useState,
} from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@app/utils/cn'

import type { FormData } from '@views/pages/private/settings/use-settings-controller'

interface Props {
	name: any
	handleToggle: Dispatch<SetStateAction<FormData>>
}

export const Switch = forwardRef<
	ElementRef<typeof Root>,
	ComponentPropsWithoutRef<typeof Root> & Props
>(({ name, className, handleToggle, ...props }, ref) => {
	const { control, getValues, setValue } = useFormContext<FormData>()

	const [isRequired, setIsRequired] = useState(true)

	const handleClick = async () => {
		setIsRequired(!isRequired)
		handleToggle((prevState) => ({
			...prevState,
			isFieldEnable: !prevState.isFieldEnable,
		}))
	}

	return (
		<div className="flex w-full items-center justify-between">
			<div className="mb-4 mt-5 flex items-center">
				<Controller
					name={name}
					control={control}
					render={({ field: { value } }) => (
						<Root
							id={name}
							className={cn(
								'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-dark-blue data-[state=unchecked]:bg-input',
								className,
							)}
							{...props}
							ref={ref}
							onClick={handleClick}
							checked={value}
						>
							<Thumb
								className={cn(
									'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
								)}
							/>
						</Root>
					)}
				/>
				<p className="text-main-300 ml-3 text-sm font-medium">
					{isRequired ? 'Opcional' : 'Obrigatório *'}
				</p>
			</div>
		</div>
	)
})

Switch.displayName = 'Switch'
