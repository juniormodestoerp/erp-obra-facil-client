import {
	ComputerDesktopIcon,
	MoonIcon,
	SunIcon,
} from '@heroicons/react/24/outline'

import { useTheme } from '@app/hooks/use-theme'

import { Button } from '@views/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'

export function ThemeToggle() {
	const { setTheme } = useTheme()

	return (
		<div className="ml-auto flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="z-50">
						<SunIcon
							className="mt-0.5 h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							strokeWidth={1.5}
						/>
						<MoonIcon
							className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							strokeWidth={1.5}
						/>
						<span className="sr-only">Mudar de tema</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="mt-[10px] p-1">
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => setTheme('light')}>
							<SunIcon className="mr-1.5 h-5 w-5" strokeWidth={1.5} />
							Claro
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							<MoonIcon className="ml-0.5 mr-2 h-4 w-4" />
							Escuro
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							<ComputerDesktopIcon className="ml-0.5 mr-2 h-4 w-4" />
							Sistema
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
