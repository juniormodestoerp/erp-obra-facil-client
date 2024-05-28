import type { ComponentProps, ReactNode } from 'react'

interface Props extends ComponentProps<'button'> {
	text: string
	children?: ReactNode
	disabled?: boolean
	action?: () => void
}

export const Button = ({ text, children, disabled, action }: Props) => {
	return (
		<button
			type="submit"
			className="group flex w-full items-center justify-center rounded bg-primary px-3 py-2 font-medium text-white duration-200 ease-in hover:bg-primary/90 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-600"
			disabled={disabled}
			onClick={action}
		>
			{children}
			<span className="font-medium">{text}</span>
		</button>
	)
}
