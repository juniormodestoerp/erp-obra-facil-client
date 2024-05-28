import { AtSymbolIcon, IdentificationIcon } from '@heroicons/react/24/outline'

import { cn } from '@app/utils/cn'

import type { TabProps } from '@views/pages/authentication/forgot-password/use-forgot-password-controller'

interface Props {
	currentTab: string
	setCurrentTab: (value: TabProps) => void
}

export function Tabs({ currentTab, setCurrentTab }: Props) {
	return (
		<div className="mx-auto w-fit px-3">
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Selecione uma aba
				</label>
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-zinc-100 focus:border-green-100 focus:ring-green-100"
					defaultValue={currentTab}
				>
					<option>E-mail</option>
					<option>CPF</option>
				</select>
			</div>

			<div className="hidden sm:block">
				<div className="border-b border-zinc-300">
					<nav
						className="-mb-px flex cursor-pointer space-x-8"
						aria-label="Tabs"
					>
						<button
							type="button"
							className={cn(
								currentTab === 'email'
									? 'border-green-400 text-green-500'
									: 'border-transparent text-zinc-100 hover:border-zinc-200 hover:text-zinc-50',
								'group inline-flex items-center border-b-2 px-1 py-4 pl-3 text-sm font-medium',
							)}
							onClick={() => setCurrentTab('email')}
							aria-current={currentTab === 'email' ? 'page' : undefined}
						>
							<AtSymbolIcon
								className={cn(
									currentTab === 'email'
										? 'text-green-400'
										: 'text-zinc-100 group-hover:text-zinc-100',
									'-ml-0.5 mr-2 h-5 w-5',
								)}
								aria-hidden="true"
							/>
							<span>E-mail</span>
						</button>

						<button
							type="button"
							className={cn(
								currentTab === 'document'
									? 'border-green-400 text-green-500'
									: 'border-transparent text-zinc-100 hover:border-zinc-200 hover:text-zinc-50',
								'group inline-flex items-center border-b-2 px-1 pl-3 pr-4 text-sm font-medium',
							)}
							onClick={() => setCurrentTab('document')}
							aria-current={currentTab === 'document' ? 'page' : undefined}
						>
							<IdentificationIcon
								className={cn(
									currentTab === 'document'
										? 'text-green-400'
										: 'text-zinc-100 group-hover:text-zinc-50',
									'-ml-0.5 mr-2 h-5 w-5',
								)}
								aria-hidden="true"
							/>
							<span>CPF</span>
						</button>
					</nav>
				</div>
			</div>
		</div>
	)
}
