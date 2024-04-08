import { useContext } from 'react'

import { AuthContext } from '@/app/contexts/auth-context'

export function useAuth() {
  return useContext(AuthContext)
}
