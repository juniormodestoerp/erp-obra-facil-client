import axios from 'axios'

import { env } from '@/env'

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  httpClient.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    return config
  })
}
