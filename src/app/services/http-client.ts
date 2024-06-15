import axios, { isAxiosError } from 'axios'

import { env } from '@/env'

import { localStorageKeys } from '@app/config/local-storage-keys'

interface ResponseError {
	code: string
	error: string
	message: string
	data: unknown
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

export function parseError(err: unknown): ResponseError {
	if (isAxiosError(err)) {
		return {
			code: err.response?.data?.code,
			error: err.response?.data?.error,
			message: err.response?.data?.message,
			data: [],
		}
	}

	return {
		code: '',
		error: '',
		message: '',
		data: [],
	}
}

if (env.VITE_ENABLE_API_DELAY) {
	httpClient.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

		return config
	})
}
