import { Bars3Icon } from '@heroicons/react/24/outline'
import { ComponentProps } from 'react'

type Props = ComponentProps<'button'>

export function BarsButton({ ...props }: Props) {
  return (
    <button {...props} type="button" className="-m-2.5 p-2.5 text-gray-700">
      <span className="sr-only">Abrir sidebar</span>
      <Bars3Icon className="h-8 w-8" aria-hidden="true" />
    </button>
  )
}
