import { httpClient } from '@app/services/http-client'

export interface Response {
	profilePicture: string
}

export async function profilePicture(file: File): Promise<Response> {
	const formData = new FormData()
	formData.append('file', file)

	console.log('formData', file)

	const { data } = await httpClient.post<Response>(
		'/users/profile-picture',
		formData,
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		},
	)

	return {
		profilePicture: data.profilePicture,
	}
}
