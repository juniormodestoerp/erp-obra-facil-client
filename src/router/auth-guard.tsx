import { Outlet } from 'react-router-dom'
// import { useAuth } from '@app/hooks/use-auth'

interface Props {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: Props) {
  return <Outlet />
}
