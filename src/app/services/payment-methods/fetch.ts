import { httpClient } from '@app/services/http-client'

export interface IPaymentMethod {
	id: string
	name: string
	createdAt: string
}

interface Response {
	paymentMethods: IPaymentMethod[]
}

export async function fetch(): Promise<Response> {
	const { data } = await httpClient.get('/payment-methods')

	return {
		paymentMethods: data.map((paymentMethods: IPaymentMethod) => ({
			id: paymentMethods.id,
			name: paymentMethods.name,
			createdAt: paymentMethods.createdAt,
		})),
	}
}
