import axios from 'axios'

import { env } from '@/env'

import { localStorageKeys } from '@app/config/local-storage-keys'

export interface AppError {
	response: {
		data: {
			code: string
			error: string
			message: string
			data: unknown
		}
	}
}

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

httpClient.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

export function parseError(error: AppError): string {
	return (
		error?.response?.data?.message ??
		'Ocorreu um erro no servidor, por favor tente novamente mais tarde'
	)
}

if (env.VITE_ENABLE_API_DELAY) {
	httpClient.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

		return config
	})
}
