import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export function Root({ children }: Props) {
	return (
		<div className="flex items-start gap-6 border-b border-sky-700 bg-secondary px-4 py-4 hover:bg-sky-100 dark:border-muted dark:bg-zinc-800">
			{children}
		</div>
	)
}
