import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@app/hooks/use-auth'

interface Props {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: Props) {
  const { signedIn } = useAuth()

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
