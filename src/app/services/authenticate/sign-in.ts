import { httpClient } from '@app/services/http-client'

export interface SignInParams {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export async function signIn({
  email,
  password,
}: SignInParams): Promise<SignInResponse> {
  const { data } = await httpClient.post<SignInResponse>(
    '/authenticate/sessions',
    {
      email,
      password,
    },
  )

  return data
}
