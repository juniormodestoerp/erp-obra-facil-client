import { httpClient } from '@app/services/http-client'

export interface Params {
	token: string
	code: string
	password: string
}

export async function resetPassword({
	token,
	code,
	password,
}: Params): Promise<void> {
	await httpClient.post<void>('/password/reset', {
		token,
		code,
		password,
	})
}
