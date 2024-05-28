import { httpClient } from '@app/services/http-client'

export async function authGuard(): Promise<number> {
	const { status } = await httpClient.get('/auth-guard')

	return status
}
