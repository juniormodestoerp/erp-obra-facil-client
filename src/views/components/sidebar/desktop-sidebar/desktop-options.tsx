import {
	AdjustmentsHorizontalIcon,
	ArrowLeftStartOnRectangleIcon,
	ArrowPathRoundedSquareIcon,
	BanknotesIcon,
	ClipboardDocumentListIcon,
	HomeIcon,
	// PresentationChartLineIcon,
	TagIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'

import { useBalance } from '@app/hooks/use-balance'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'

import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'
import { Option } from '@views/components/sidebar/option'
import { GroupOption } from '../group-option'
import { SubOption } from '../sub-option'

interface Props {
	path: string
	small: boolean
	balance: number
}

export function DesktopOptions({ path, small, balance }: Props) {
	const { isBalanceVisible, setIsBalanceVisible } = useBalance()
	return (
		<nav className={cn('flex flex-1 flex-col', small && 'mx-auto')}>
			<ul
				role="list"
				className={cn(
					'-mx-2 flex flex-1 flex-col gap-y-7 ml-px',
					small && '-mx-0',
				)}
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
										<p className="text-white">{Format.currency(balance)}</p>
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
						Icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
						linkTo="/reports"
						title="Relatórios"
						selected={path.startsWith('/reports')}
					/>

					<Option
						open={!small}
						small={small}
						Icon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}
						linkTo="/settings"
						title="Personalização"
						selected={path.startsWith('/settings')}
					/>

					<GroupOption
						open={!small}
						small={small}
						Icon={<TagIcon className="h-6 w-6" />}
						title="Cadastros"
					>
						<SubOption
							open={!small}
							small={small}
							Icon={<TagIcon className="h-6 w-6" />}
							linkTo="/categories"
							title="Categorias"
							selected={path.startsWith('/categories')}
						/>

						<SubOption
							open={!small}
							small={small}
							Icon={<TagIcon className="h-6 w-6" />}
							linkTo="/cost-and-profit-centers"
							title="Centros de custo"
							selected={path.startsWith('/cost-and-profit-centers')}
						/>

						<SubOption
							open={!small}
							small={small}
							Icon={<TagIcon className="h-6 w-6" />}
							linkTo="/bank-accounts"
							title="Contas"
							selected={path.startsWith('/bank-accounts')}
						/>

						<SubOption
							open={!small}
							small={small}
							Icon={<TagIcon className="h-6 w-6" />}
							linkTo="/payment-methods"
							title="Métodos de pagamento"
							selected={path.startsWith('/payment-methods')}
						/>

						<SubOption
							open={!small}
							small={small}
							Icon={<TagIcon className="h-6 w-6" />}
							linkTo="/tags"
							title="Tags"
							selected={path.startsWith('/tags')}
						/>
						{/* 
						<SubOption
							open={!small}
							small={small}
							Icon={<TagIcon className="h-6 w-6" />}
							linkTo="/transfers"
							title="Tranferências"
							selected={path.startsWith('/transfers')}
						/> */}
					</GroupOption>
				</div>

				<div className="mb-5 mt-auto flex flex-col">
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
