import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { MobileOption } from '@views/components/sidebar/mobile-option'

export function MobileSidebar() {
	return (
		<div className="absolute left-0 h-full w-full bg-white lg:hidden">
			<Disclosure
				as="nav"
				className="z-50 w-full border-b border-zinc-300 bg-white"
			>
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 lg:px-6">
							<div className="flex h-16 items-center justify-between">
								<div className="-mr-2 flex items-center lg:hidden">
									<DisclosureButton className="inline-flex h-[34px] w-12 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</DisclosureButton>
								</div>
							</div>
						</div>

						{/* DROPDOWN */}
						<DisclosurePanel className="w-full border-t border-zinc-300 lg:hidden">
							<div className="space-y-1 pb-2 pt-2">
								<MobileOption linkTo="/" title="Página inicial" />
								<MobileOption linkTo="/transactions" title="Lançamentos" />
								<MobileOption linkTo="/conciliations" title="Conciliações" />
								<MobileOption linkTo="/dashboards" title="Dashboards" />
								<MobileOption linkTo="/reports" title="Relatórios" />
								<MobileOption linkTo="/categories" title="Categorias" />
								<MobileOption linkTo="/settings" title="Configurações" />
								<MobileOption linkTo="/profile" title="Perfil" />
								<MobileOption linkTo="/logout" title="Sair" />
							</div>
						</DisclosurePanel>
					</>
				)}
			</Disclosure>
		</div>
	)
}
