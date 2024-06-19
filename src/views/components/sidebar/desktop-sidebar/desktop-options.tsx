import {
	AdjustmentsHorizontalIcon,
	ArrowLeftStartOnRectangleIcon,
	ArrowPathRoundedSquareIcon,
	BanknotesIcon,
	ClipboardDocumentListIcon,
	HomeIcon,
	PresentationChartLineIcon,
	TagIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'

import { useBalance } from '@app/hooks/use-balance'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'

import { Option } from '@views/components/sidebar/option'
import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'

interface Props {
	path: string
	small: boolean
	balance: number
}

export function DesktopOptions({ path, small, balance = 39000 }: Props) {
	const { isBalanceVisible, setIsBalanceVisible } = useBalance()
	return (
		<nav className={cn('ml-2 flex flex-1 flex-col', small && 'mx-auto')}>
			<ul
				role="list"
				className={cn('-mx-2 flex flex-1 flex-col gap-y-7', small && '-mx-0')}
			>
				{!small && (
					<div className="flex flex-col">
						<div className="flex items-center">
							<p className="w-full text-lg font-semibold text-white pl-2">
								Saldo na conta
							</p>

							<button
								type="button"
								onClick={() => setIsBalanceVisible(!isBalanceVisible)}
								className="cursor-pointer border-none bg-none mr-3 mt-0.5"
							>
								{!isBalanceVisible ? (
									<EyeIcon className="size-6 text-white" />
								) : (
									<EyeSlashIcon className="size-6 text-white" />
								)}
							</button>
						</div>

						<div className="flex items-start justify-between">
							<p className="w-full text-2xl font-semibold text-main-white">
								<p className="w-full text-xl font-semibold text-main-white pl-2">
									{isBalanceVisible ? (
										<p className="text-white">{Format.currency(39000)}</p>
									) : (
										<p className="text-white">R$ ***</p>
									)}
								</p>
							</p>
						</div>
					</div>
				)}

				<div role="list" className="space-y-1">
					<Option
						open={!small}
						small={small}
						Icon={<HomeIcon className="h-6 w-6" />}
						linkTo="/"
						title="Página inicial"
						selected={path === '/'}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<BanknotesIcon className="h-6 w-6" />}
						linkTo="/transactions"
						title="Lançamentos"
						selected={path.startsWith('/transactions')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<ArrowPathRoundedSquareIcon className="h-6 w-6" />}
						linkTo="/conciliations"
						title="Conciliações"
						selected={path.startsWith('/conciliations')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<PresentationChartLineIcon className="h-6 w-6" />}
						linkTo="/dashboards"
						title="Dashboards"
						selected={path.startsWith('/dashboards')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
						linkTo="/reports"
						title="Relatórios"
						selected={path.startsWith('/reports')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<TagIcon className="h-6 w-6" />}
						linkTo="/categories"
						title="Categorias"
						selected={path.startsWith('/categories')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}
						linkTo="/settings"
						title="Personalização"
						selected={path.startsWith('/settings')}
					/>

					{/* <Option
            open={!small}
            small={small}
            Icon={<ScaleIcon className="h-6 w-6" />}
            linkTo="/contracts"
            title="Contratos"
            selected={path.startsWith('/contracts')}
          /> */}

					{/* <Option
            open={!small}
            small={small}
            Icon={<LinkIcon className="h-6 w-6" />}
            linkTo="/public-link"
            title="Link público"
            selected={path.startsWith('/public-link')}
          /> */}
				</div>

				<div className="mb-5 mt-auto flex flex-col">
					{/* <Option
            open={!small}
            small={small}
            Icon={<ChatBubbleBottomCenterTextIcon className="h-6 w-6" />}
            linkTo="/support"
            title="Suporte"
            selected={path.startsWith('/support')}
          /> */}

					{/* <Option
            open={!small}
            small={small}
            Icon={<CreditCardIcon className="h-6 w-6" />}
            linkTo="/payments"
            title="Meus pagamentos"
            selected={path.startsWith('/payment')}
          /> */}

					<Option
						open={!small}
						small={small}
						Icon={<UserCircleIcon className="h-6 w-6" strokeWidth={1.5} />}
						linkTo="/profile"
						title="Perfil"
						selected={path.startsWith('/profile')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6" />}
						linkTo="/logout"
						title="Sair"
						selected={path.startsWith('/logout')}
					/>
				</div>
			</ul>
		</nav>
	)
}
