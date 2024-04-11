import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Actions({ children }: Props) {
  return <div className="flex gap-2 self-center">{children}</div>
}
