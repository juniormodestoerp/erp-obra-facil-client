import { strMessage } from '@app/utils/custom-zod-error'
import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string(strMessage('API URL')).url(),
})

export const env = envSchema.parse(import.meta.env)
