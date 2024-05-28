import { cn } from '@app/utils/cn'
import { DesktopHeader } from '@views/components/sidebar/components/desktop-sidebar/desktop-header'
import { DesktopOptions } from '@views/components/sidebar/components/desktop-sidebar/desktop-options'

interface Props {
	small: boolean
	path: string
	handleSize: () => void
}

export function DesktopSidebar({ small, path, handleSize }: Props) {
	return (
		<div
			className={cn(
				'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col',
				small ? 'lg:w-20' : 'lg:w-56',
			)}
		>
			{/* Sidebar component */}
			<div className="flex w-full grow flex-col gap-y-5 overflow-y-auto border-r bg-dark-blue px-4 pb-4 dark:border-zinc-600 dark:bg-zinc-900">
				<DesktopHeader small={small} handleSize={handleSize} />
				<DesktopOptions path={path} small={small} />
			</div>
		</div>
	)
}
