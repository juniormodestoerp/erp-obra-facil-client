import { cn } from '@app/utils/cn'
import {
  ArrowLeftStartOnRectangleIcon,
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  FolderPlusIcon,
  HomeIcon,
  LinkIcon,
  PresentationChartLineIcon,
  ScaleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Option } from '@views/components/sidebar/components/option'

interface Props {
  path: string
  small: boolean
}

export function DesktopOptions({ path, small }: Props) {
  return (
    <nav className={cn('ml-2 flex flex-1 flex-col', small && 'mx-auto')}>
      <ul
        role="list"
        className={cn('-mx-2 flex flex-1 flex-col gap-y-7', small && '-mx-0')}
      >
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
            linkTo="/fund-releases"
            title="Lançamentos"
            selected={path.startsWith('/fund-releases')}
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
            Icon={<FolderPlusIcon className="h-6 w-6" />}
            linkTo="/subscriptions"
            title="Cadastros"
            selected={path.startsWith('/subscriptions')}
          />

          <Option
            open={!small}
            small={small}
            Icon={<Cog8ToothIcon className="h-6 w-6" />}
            linkTo="/settings"
            title="Configurações"
            selected={path.startsWith('/settings')}
          />

          <Option
            open={!small}
            small={small}
            Icon={<ScaleIcon className="h-6 w-6" />}
            linkTo="/contracts"
            title="Contratos"
            selected={path.startsWith('/contracts')}
          />

          <Option
            open={!small}
            small={small}
            Icon={<LinkIcon className="h-6 w-6" />}
            linkTo="/public-link"
            title="Link público"
            selected={path.startsWith('/public-link')}
          />
        </div>

        <div className="mb-5 mt-auto flex flex-col">
          <Option
            open={!small}
            small={small}
            Icon={<ChatBubbleBottomCenterTextIcon className="h-6 w-6" />}
            linkTo="/support"
            title="Suporte"
            selected={path.startsWith('/support')}
          />

          <Option
            open={!small}
            small={small}
            Icon={<CreditCardIcon className="h-6 w-6" />}
            linkTo="/payments"
            title="Meus pagamentos"
            selected={path.startsWith('/payment')}
          />

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
            linkTo="/log-out"
            title="Sair"
            selected={path.startsWith('/log-out')}
          />
        </div>
      </ul>
    </nav>
  )
}
