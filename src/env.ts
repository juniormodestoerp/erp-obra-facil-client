import { z } from 'zod'

import { strMessage } from '@app/utils/custom-zod-error'

const envSchema = z.object({
  VITE_API_URL: z
    .string(strMessage('api url'))
    .url({ message: 'O campo api url deve conter uma URL válida.' }),
  VITE_ENABLE_API_DELAY: z
    .string(strMessage('ativar delay da api'))
    .transform((value) => value === 'true'),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.flatten())

  throw new Error('❌ Invalid environment variables.')
}

export const env = _env.data
