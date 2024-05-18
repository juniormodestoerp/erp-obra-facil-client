import { httpClient } from '@app/services/http-client'

export interface Params {
  email?: string
  document?: string
}

export async function forgotPassword({
  email,
  document,
}: Params): Promise<void> {
  await httpClient.post<void>('/password/forgot', {
    email,
    document: document?.replace(/\D/g, ''),
  })
}
