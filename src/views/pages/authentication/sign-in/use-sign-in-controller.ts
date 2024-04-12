import { authService } from '@app/services/authenticate'
import { signIn } from '@app/services/authenticate/sign-in'
import { strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function UseSignInController() {
  const signInForm = z.object({
    email: z
      .string(strMessage('e-mail'))
      .email({ message: 'e-mail inválido' })
      .min(1, 'O e-mail é obrigatório'),
    password: z
      .string(strMessage('senha'))
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
          'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
      })
      .min(1, 'A senha é obrigatória'),
  })

  type SignInForm = z.infer<typeof signInForm>

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<SignInForm>({
    mode: 'onSubmit',
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: authService.signIn,
  })

  const handleSubmit = hookFormHandleSubmit(async (data: SignInForm) => {
    try {
      const { accessToken } = await authenticate({
        email: data.email,
        password: data.password,
      })

      signIn(accessToken)

      toast.success({
        title: 'Login realizado com sucesso!',
        // message: 'Seja bem-vindo a plataforma odonto mais.',
      })

      navigate('/')
    } catch (error) {
      errorToast({
        title: 'Erro ao realizar login!',
        message: parseError(error).message,
      })
    } finally {
      setIsPending(false)
    }
  })

  return {
    register,
    handleSubmit: hookFormHandleSubmit,
    errors,
  }
}
