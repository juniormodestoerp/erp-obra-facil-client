import { cn } from '@app/utils/cn'
import { Lock } from 'lucide-react'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  title: string
  Icon: ReactNode
  linkTo: string
  selected?: boolean
  open?: boolean
  lock?: boolean
}

export function SidebarTopic({
  Icon,
  linkTo,
  title,
  selected,
  lock,
  open = true,
}: Props) {
  const { pathname } = useLocation()

  return (
    <li>
      <Link
        to={linkTo}
        data-current={pathname === linkTo}
        className={cn(
          selected
            ? 'bg-transparent font-bold text-yellow-400 drop-shadow-2xl'
            : 'text-white hover:bg-darker-blue',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        )}
      >
        <span
          className={cn('hidden sm:block sm:pl-1 lg:ml-0', open && 'block')}
        >
          {Icon}
        </span>
        <span className={cn('hidden', open && 'block')}>{title}</span>
        {lock && <Lock className="ml-[-6px] mt-[5px] h-4 w-4 text-gray-400" />}
      </Link>
    </li>
  )
}
