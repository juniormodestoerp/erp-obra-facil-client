import type { IPaymentMethodDTO } from '@app/dtos/payment-method-dto'
import { httpClient } from '@app/services/http-client'

type IUpdatePaymentMethodDTO = Partial<
	Omit<IPaymentMethodDTO, 'id' | 'createdAt'>
> & {
	id: string
}

export async function save({
	id,
	name,
}: IUpdatePaymentMethodDTO): Promise<IPaymentMethodDTO> {
	const { data } = await httpClient.patch(`/methods/${id}`, {
		name,
	})

	return {
		id: data.id,
		name: data.name,
		createdAt: data.createdAt,
	}
}
