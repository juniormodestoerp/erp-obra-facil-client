import type { ChangeEvent, ComponentProps } from 'react'
import { memo, useEffect, useRef, useState } from 'react'

import { cn } from '@app/utils/cn'

type DebouncedInputProps = {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
} & Omit<ComponentProps<'input'>, 'onChange'>

const DebouncedInputComponent = ({
	value: initialValue,
	onChange,
	debounce = 500,
	className,
	...props
}: DebouncedInputProps) => {
	const [value, setValue] = useState<string>(initialValue.toString())
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setValue(initialValue.toString())
	}, [initialValue])

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, onChange, debounce])

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		<input
			{...props}
			ref={inputRef}
			value={value}
			onChange={handleChange}
			className={cn(
				'block w-full rounded-default border border-zinc-400 px-3 py-1.5 text-xs text-zinc-900 shadow outline-none placeholder:text-zinc-400 hover:border-primary focus:border-primary focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
				className,
			)}
		/>
	)
}

export const DebouncedInput = memo(DebouncedInputComponent)
