import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<IPaymentMethodDTO[]> {
	const { data } = await httpClient.get('/payment-methods')

	return data.map((paymentMethod: IPaymentMethodDTO) => ({
		id: paymentMethod.id,
		name: paymentMethod.name,
		createdAt: paymentMethod.createdAt,
	}))
}
