import { Bars3Icon } from '@heroicons/react/24/outline'
import { Tooltip } from '@views/components/tooltip'

import logo from '@/assets/logos/logo.png'

interface Props {
	open: boolean
	handleClose: () => void
}

export function MobileHeader({ open, handleClose }: Props) {
	return (
		<div className="flex h-auto shrink-0 items-center">
			<Tooltip text={open ? 'Abrir sidebar' : 'Fechar sidebar'}>
				<button
					type="button"
					onClick={handleClose}
					className="flex h-16 items-center justify-between"
				>
					<img className="h-14 w-auto" src={logo} alt="Logo obra fácil" />

					<h1 className="mr-2 mt-1 text-2xl font-semibold tracking-tight text-white">
						Obra Fácil
					</h1>

					<Bars3Icon className="h-8 w-8 pt-1 text-white" aria-hidden="true" />
				</button>
			</Tooltip>
		</div>
	)
}
