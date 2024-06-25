import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { httpClient } from '@app/services/http-client'

type ICreatePaymentMethodDTO = Omit<IPaymentMethodDTO, 'id' | 'createdAt'>

export interface Params {
	name: string
}

export async function create({
	name,
}: ICreatePaymentMethodDTO): Promise<IPaymentMethodDTO> {
	const { data } = await httpClient.post('/payment-methods', {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
