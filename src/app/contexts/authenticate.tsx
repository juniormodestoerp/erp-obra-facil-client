import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { localStorageKeys } from '@app/config/local-storage-keys'
import { httpClient } from '@app/services/http-client'

import { LaunchScreen } from '@views/components/launch-screen'

export interface User {
	id: string
	name: string
	document: string
	email: string
	phone: string
	birthDate: string
	role: string
	status: string
	createdAt: string
}

interface AuthState {
  token: string
  user?: User
}

interface AuthContextValue {
  user?: User
  signedIn: boolean
  signIn(accessToken: string): Promise<void>
  signOut(): void
}

interface Props {
  children: ReactNode
}

export const AuthenticateProviderContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
)

export function AuthenticateProvider({ children }: Props) {
  const [loading, setLoading] = useState(true)

  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
    const user = localStorage.getItem(localStorageKeys.KEY_USER)

    return {
      token: token ?? '',
      user: user ? JSON.parse(user) : undefined,
    }
  })

  const signedIn = !!authState.token

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (authState.token && !authState.user) {
      getUser()
    } else {
      setLoading(false)
    }
  }, [authState.token])

  const getUser = async () => {
    setLoading(true)
    try {
      const { data } = await httpClient.get<User>('/users/profile')
      setAuthState((state) => ({ ...state, user: data }))
      localStorage.setItem(localStorageKeys.KEY_USER, JSON.stringify(data))
    } catch (err) {
      signOut()
    } finally {
      setLoading(false)
    }
  }

  const signIn = useCallback(async (token: string) => {
    setLoading(true)
    try {
      httpClient.defaults.headers.common.Authorization = `Bearer ${token}`

      const { data } = await httpClient.get<{ user: User }>('/users/profile')

      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token)
      localStorage.setItem(localStorageKeys.KEY_USER, JSON.stringify(data.user))

      setAuthState({ token, user: data.user })
    } catch (error) {
      console.error('SignIn error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    localStorage.removeItem(localStorageKeys.KEY_USER)
    setAuthState({ token: '' })
  }, [])

  return (
    <AuthenticateProviderContext.Provider
      value={{
        user: authState.user,
        signedIn,
        signIn,
        signOut,
      }}
    >
      <LaunchScreen isLoading={loading} />
      {!loading && children}
    </AuthenticateProviderContext.Provider>
  )
}
