import { cn } from '@app/utils/cn'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Tooltip } from '@views/components/tooltip'

import logo from '@/assets/logos/logo.png'

interface Props {
	small: boolean
	handleSize: () => void
}

export function DesktopHeader({ small, handleSize }: Props) {
	return (
		<Tooltip text={small ? 'Abrir sidebar' : 'Fechar sidebar'}>
			<button
				type="button"
				onClick={handleSize}
				className={cn(
					'flex h-16 items-center justify-start gap-2',
					small && 'gap-0',
				)}
			>
				<img
					className={cn('h-14 w-auto', small && 'hidden')}
					src={logo}
					alt="logo obra fácil"
				/>

				<h1
					className={cn(
						'mr-2 mt-1 text-2xl font-semibold tracking-tight text-white',
						small && 'hidden',
					)}
				>
					Obra Fácil
				</h1>
				{small && (
					<Bars3Icon
						className={cn('h-8 w-8 pt-1 text-white', small && 'mx-auto')}
						aria-hidden="true"
					/>
				)}
			</button>
		</Tooltip>
	)
}
