import { strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function UseResetPasswordController() {
  const resetPasswordForm = z
    .object({
      password: z
        .string(strMessage('senha'))
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
          message:
            'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
        }),
      confirmPassword: z.string(strMessage('confirmar senha')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    })

  type ResetPasswordForm = z.infer<typeof resetPasswordForm>

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<ResetPasswordForm>({
    mode: 'onSubmit',
    resolver: zodResolver(resetPasswordForm),
  })

  return {
    register,
    handleSubmit: hookFormHandleSubmit,
    errors,
  }
}
