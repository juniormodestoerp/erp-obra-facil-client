import axios, { isAxiosError } from 'axios'

import { env } from '@/env'

interface ResponseError {
	code: string
	error: string
	message: string
	data: unknown
}

export const httpClient = axios.create({
	baseURL: env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
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
