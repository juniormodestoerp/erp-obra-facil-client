import { Fragment } from 'react'

interface Props {
	title: string
	description: string
}

export function PageTitle({ title, description }: Props) {
	return (
		<Fragment>
			<h1 className="mb-1 text-2xl font-bold tracking-tight text-black dark:text-white">
				{title}
			</h1>
			<h2 className="text-clack mb-8 text-zinc-800 dark:text-zinc-200">
				{description}
			</h2>
		</Fragment>
	)
}
