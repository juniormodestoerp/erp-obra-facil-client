import { ElementType } from 'react'

interface Props {
  icon: ElementType
}

export function Icon({ icon: Icon }: Props) {
  return <Icon className="mt-1.5 h-6 w-6 text-primary" />
}
