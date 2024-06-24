import { httpClient } from '@app/services/http-client'

export interface Params {
	id: string
}

export async function remove({ id }: Params): Promise<void> {
	await httpClient.delete<void>(`/cost-and-profit-centers/${id}`)
}
