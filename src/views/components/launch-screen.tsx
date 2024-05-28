import { Transition } from '@headlessui/react'
import { Spinner } from '@views/components/spinner'

import logoImage from '@/assets/logos/logo.png'

interface Props {
	isLoading: boolean
}

export function LaunchScreen({ isLoading }: Props) {
	return (
		<Transition
			show={isLoading}
			enter="transition-opacity duration-75"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-primary">
				<div className="flex flex-col items-center gap-4">
					<img src={logoImage} alt="Logo" className="h-10 text-white" />
					<Spinner className="fill-white text-primary" />
				</div>
			</div>
		</Transition>
	)
}
