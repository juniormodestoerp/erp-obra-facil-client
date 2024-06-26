import { cn } from '@app/utils/cn'
import { Tooltip } from '@views/components/tooltip'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
	title: string
	Icon: ReactNode
	linkTo: string
	selected?: boolean
	open?: boolean
	small?: boolean
}

export function SubOption({
	Icon,
	linkTo,
	title,
	selected,
	small,
	open = true,
}: Props) {
	const { pathname } = useLocation()

	return (
		<li>
			{small ? (
				<Tooltip text={title}>
					<Link
						to={linkTo}
						data-current={pathname === linkTo}
						className={cn(
							selected
								? 'bg-transparent font-bold text-yellow-400 drop-shadow-2xl'
								: 'text-white hover:bg-darker-blue',
							'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
						)}
					>
						<span className={cn('hidden sm:block', open && 'block')}>
							{Icon}
						</span>
						<span className={cn('hidden', open && 'block')}>{title}</span>
					</Link>
				</Tooltip>
			) : (
				<Link
					to={linkTo}
					data-current={pathname === linkTo}
					className={cn(
						selected
							? 'bg-transparent font-bold text-yellow-400 drop-shadow-2xl'
							: 'text-white hover:bg-darker-blue',
						'group flex gap-x-1.5 rounded-md p-2 pl-[35px] text-sm font-semibold leading-6 items-center',
					)}
				>
					<span
						className={cn(
							'hidden sm:block bg-zinc-300 rounded-full size-1 ',
							open && 'block',
							pathname === linkTo && 'bg-yellow-400 drop-shadow-2xl',
						)}
					/>

					<span
						className={cn(
							'hidden text-sm font-medium tracking-tight text-zinc-200',
							open && 'block',
							pathname === linkTo &&
								'bg-transparent font-bold text-yellow-400 drop-shadow-2xl',
						)}
					>
						{title}
					</span>
				</Link>
			)}
		</li>
	)
}
