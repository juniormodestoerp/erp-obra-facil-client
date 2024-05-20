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
  open: boolean
}

export function MobileOptions({ path, open }: Props) {
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="-mx-2 flex flex-1 flex-col gap-y-7">
        <div role="list" className="space-y-1">
          <Option
            open={!open}
            Icon={<HomeIcon className="h-6 w-6" />}
            linkTo="/"
            title="Página inicial"
            selected={path === '/'}
          />

          <Option
            open={!open}
            Icon={<BanknotesIcon className="h-6 w-6" />}
            linkTo="/fund-releases"
            title="Lançamentos"
            selected={path.startsWith('/fund-releases')}
          />

          <Option
            open={!open}
            Icon={<PresentationChartLineIcon className="h-6 w-6" />}
            linkTo="/dashboards"
            title="Dashboards"
            selected={path.startsWith('/dashboards')}
          />

          <Option
            open={!open}
            Icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
            linkTo="/reports"
            title="Relatórios"
            selected={path.startsWith('/reports')}
          />

          <Option
            open={!open}
            Icon={<FolderPlusIcon className="h-6 w-6" />}
            linkTo="/categories"
            title="Categorias"
            selected={path.startsWith('/categories')}
          />

          <Option
            open={!open}
            Icon={<Cog8ToothIcon className="h-6 w-6" />}
            linkTo="/settings"
            title="Configurações"
            selected={path.startsWith('/settings')}
          />

          <Option
            open={!open}
            Icon={<ScaleIcon className="h-6 w-6" />}
            linkTo="/contracts"
            title="Contratos"
            selected={path.startsWith('/contracts')}
          />

          <Option
            open={!open}
            Icon={<LinkIcon className="h-6 w-6" />}
            linkTo="/public-link"
            title="Link público"
            selected={path.startsWith('/public-link')}
          />
        </div>

        <div className="mb-5 mt-auto flex flex-col">
          <Option
            open={!open}
            Icon={<ChatBubbleBottomCenterTextIcon className="h-6 w-6" />}
            linkTo="/support"
            title="Suporte"
            selected={path.startsWith('/support')}
          />

          <Option
            open={!open}
            Icon={<CreditCardIcon className="h-6 w-6" />}
            linkTo="/payments"
            title="Meus pagamentos"
            selected={path.startsWith('/payment')}
          />

          <Option
            open={!open}
            Icon={<UserCircleIcon className="h-6 w-6" strokeWidth={1.5} />}
            linkTo="/profile"
            title="Perfil"
            selected={path.startsWith('/profile')}
          />

          <Option
            open={!open}
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
