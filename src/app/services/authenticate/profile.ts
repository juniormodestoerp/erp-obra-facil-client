import { httpClient } from '@app/services/http-client'

export interface Response {
  id: string
  name: string
  document: string
  email: string
  phone: string
  birthDate: string
  role: string
  status: string
  createdAt: Date
}

export async function profile(): Promise<Response> {
  const { data } = await httpClient.get<Response>('/users/profile')

  return data
}
