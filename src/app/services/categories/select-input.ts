import { httpClient } from '@app/services/http-client'

export interface ISelectInputCategory {
  field: string
  value: string
}

export interface Response {
  categories: ISelectInputCategory[]
}

export async function selectInput(): Promise<Response> {
  const { data } = await httpClient.get<Response>('/categories/select-input')

  return data
}
