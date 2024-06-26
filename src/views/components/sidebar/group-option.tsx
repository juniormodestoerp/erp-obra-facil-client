import { useSidebar } from '@app/hooks/use-sidebar'
import { cn } from '@app/utils/cn'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@views/components/tooltip'
import { Button } from '@views/components/ui/button'
import { type ReactNode, useState } from 'react'

interface Props {
	title: string
	Icon: ReactNode
	open: boolean
	small: boolean
	children: ReactNode
}

export function GroupOption({ Icon, title, small, open, children }: Props) {
	const [openGroup, setOpenGroup] = useState(false)
	const { isSidebarSmall, setIsSidebarSmall } = useSidebar()

	return (
		<li className="w-full">
			{small ? (
				<Tooltip text={title}>
					<Button
						type="button"
						onClick={() => {
							setIsSidebarSmall(!isSidebarSmall)
							setOpenGroup(true)
						}}
						className="text-white hover:bg-darker-blue !flex-1 !w-full group ml-0 flex gap-x-3 bg-transparent rounded-md p-2 text-sm font-medium leading-6"
					>
						<span className={cn('hidden sm:block', open && 'block')}>
							{Icon}
						</span>
						<span className={cn('hidden', open && 'block')}>{title}</span>
					</Button>
				</Tooltip>
			) : (
				<Button
					type="button"
					onClick={() => setOpenGroup(!openGroup)}
					className="text-white hover:bg-darker-blue group ml-0 flex gap-x-3 bg-transparent shadow-none w-full justify-between rounded-md p-2 text-sm font-medium leading-6"
				>
					<div className="flex items-center gap-x-3">
						<span className={cn('hidden sm:block', open && 'block')}>
							{Icon}
						</span>
						<span className={cn('hidden', open && 'block')}>{title}</span>
					</div>

					<ChevronDownIcon
						className={cn(
							'size-5 mt-0.5 mr-1',
							openGroup && 'rotate-180 transition-all duration-300 ease-in-out',
						)}
						strokeWidth={2}
					/>
				</Button>
			)}
			{openGroup && !small && children}
		</li>
	)
}
