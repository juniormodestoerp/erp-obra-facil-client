import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { httpClient } from '@app/services/http-client'

type ICreateIPaymentMethodDTO = Omit<IPaymentMethodDTO, 'id' | 'createdAt'>

export interface Params {
	name: string
}

export async function create({
	name,
}: ICreateIPaymentMethodDTO): Promise<IPaymentMethodDTO> {
	const { data } = await httpClient.post('/payment-methods', {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
