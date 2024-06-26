import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { Link, useLocation } from 'react-router-dom'

interface IPages {
	name: string
	href: string
	current: boolean
}

export function Breadcrumbs() {
	const location = useLocation().pathname

	const pages: IPages[] = []

	switch (location) {
		case '/settings':
			pages.push({ name: 'Configurações', href: '/settings', current: true })
			break
		case '/':
			pages.push({ name: 'Página inicial ', href: '/', current: true })
			break
		case '/profile':
			pages.push({ name: 'Perfil', href: '/profile', current: true })
			break
		case '/categories':
			pages.push({ name: 'Categorias', href: '/categories', current: true })
			break
		case '/cost-and-profit-centers':
			pages.push({
				name: 'Centros de custo',
				href: '/cost-and-profit-centers',
				current: true,
			})
			break
		case '/payment-methods':
			pages.push({
				name: 'Métodos de pagamento',
				href: '/payment-methods',
				current: true,
			})
			break
		case '/tags':
			pages.push({
				name: 'Tags',
				href: '/tags',
				current: true,
			})
			break
		case '/transfers':
			pages.push({
				name: 'Transferências',
				href: '/transfers',
				current: true,
			})
			break
		case '/bank-accounts':
			pages.push({ name: 'Contas', href: '/bank-accounts', current: true })
			break

		case '/transactions':
			pages.push({ name: 'Lançamentos', href: '/transactions', current: true })
			break
		case '/reports':
			pages.push({ name: 'Relatórios', href: '/reports', current: true })
			break
		case '/conciliations':
			pages.push({ name: 'Lançamentos', href: '/transactions', current: true })
			pages.push({
				name: 'Conciliações',
				href: '/conciliations',
				current: true,
			})
			break
		default:
			break
	}

	return (
		<nav className="hidden lg:flex" aria-label="Breadcrumb">
			<ol className="flex items-center space-x-4">
				<li>
					<div>
						<Link
							to="/"
							className="text-gray-400 hover:text-gray-500 dark:bg-zinc-300"
						>
							<HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="sr-only">Home</span>
						</Link>
					</div>
				</li>
				{pages.map((page) => (
					<li key={page.name}>
						<div className="flex items-center">
							<ChevronRightIcon
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							<Link
								to={page.href}
								className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-zinc-300"
								aria-current={page.current ? 'page' : undefined}
							>
								{page.name}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	)
}
