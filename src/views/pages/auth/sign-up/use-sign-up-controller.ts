import { isValidDate, strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function UseSignUpController() {
  const signUpForm = z.object({
    name: z
      .string(strMessage('nome'))
      .regex(/^[^0-9]*$/, 'O campo nome não pode conter números')
      .min(1, 'O nome é obrigatório'),
    email: z
      .string(strMessage('e-mail'))
      .email({ message: 'E-mail inválido' })
      .min(1, 'O e-mail é obrigatório'),
    phone: z
      .string(strMessage('telefone'))
      .regex(/^[0-9()+\-\s]*$ {6}/, {
        message: 'Telefone inválido',
      })
      .min(1, 'O telefone é obrigatório'),
    birthDate: z
      .string(strMessage('data de nascimento'))
      .trim()
      .refine((value) => isValidDate(value), {
        message: 'O campo data de nascimento precisa ser uma data válida.',
      }),
    document: z
      .string(strMessage('CPF'))
      .length(14, { message: 'O campo CPF deve ter 11 caracteres.' })
      .regex(/^[0-9]+$/, {
        message: 'O campo CPF deve conter apenas números.',
      }),
    password: z
      .string(strMessage('senha'))
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
          'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
      })
      .min(1, 'A senha é obrigatória'),
  })

  type SignUpForm = z.infer<typeof signUpForm>

  const {
    register,
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<SignUpForm>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpForm),
  })

  return {
    control,
    errors,
    register,
    handleSubmit: hookFormHandleSubmit,
  }
}
