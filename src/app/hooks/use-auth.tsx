import { useContext } from 'react'

import { AuthenticateProviderContext } from '@/app/contexts/authenticate'

export function useAuth() {
    const context = useContext(AuthenticateProviderContext)
  
    if (context === undefined)
      throw new Error('useAuth must be used within a AuthenticateProvider')
  
    return context
}
