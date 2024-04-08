import { strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function UseForgotPasswordController() {
  const forgotPasswordForm = z.object({
    email: z
      .string(strMessage('e-mail'))
      .email({ message: 'e-mail inválido' })
      .min(1, 'O e-mail é obrigatório')
      .optional(),
    document: z
      .string(strMessage('CPF / CNPJ'))
      .min(11, { message: 'O campo CPF deve ter 11 caracteres.' })
      .max(14, { message: 'O campo CNPJ deve ter 14 caracteres.' })
      .regex(/^[0-9]+$/, {
        message: 'O campo CPF / CNPJ deve conter apenas números.',
      })
      .optional(),
  })

  type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<ForgotPasswordForm>({
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordForm),
  })

  return {
    errors,
    register,
    handleSubmit: hookFormHandleSubmit,
  }
}
