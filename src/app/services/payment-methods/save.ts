import { httpClient } from '@app/services/http-client'
import type { IPaymentMethod } from '@app/services/payment-methods/fetch'

type IUpdatePaymentMethodDTO = Partial<Omit<IPaymentMethod, 'id'>> & {
	id: string
}

export interface Response {
	id: string
	name: string
	createdAt: string
}

export async function save({
	id,
	name,
}: IUpdatePaymentMethodDTO): Promise<Response> {
	console.log('save called with id:', id, 'name:', name)

	const { data } = await httpClient.put<Response>(`/payment-methods/${id}`, {
		name,
	})

	console.log('save response data:', data)

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
