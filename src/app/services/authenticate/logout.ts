import { httpClient } from '@app/services/http-client'

export type Response = Promise<void>

export async function logout(): Promise<Response> {
  const { data } = await httpClient.post<Response>('/sessions/logout')

  return data
}
