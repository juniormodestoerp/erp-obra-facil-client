import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

interface IPages {
  name: string
  href: string
  current: boolean
}

export function Breadcrumbs() {
  const location = useLocation().pathname

  console.log(location)

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
    case '/subscriptions':
      pages.push({ name: 'Categorias', href: '/subscriptions', current: true })
      break
    case '/fund-releases':
      pages.push({ name: 'Lançamentos', href: '/fund-releases', current: true })
      break

    default:
      break
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
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
