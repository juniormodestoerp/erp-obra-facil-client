import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useAuth } from '@app/hooks/use-auth'
import { authService } from '@app/services/authenticate'
import { type AppError, parseError } from '@app/services/http-client'
import { strMessage } from '@app/utils/custom-zod-error'

const signInForm = z.object({
	document: z
		.string(strMessage('CPF / CNPJ'))
		.min(11, { message: 'O campo CPF deve ter 11 caracteres.' })
		.max(14, { message: 'O campo CNPJ deve ter 14 caracteres.' }),
	password: z
		.string(strMessage('senha'))
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
			message:
				'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
		})
		.min(1, 'A senha é obrigatória'),
})

type SignInForm = z.infer<typeof signInForm>

export function useSignInController() {
	const { signIn } = useAuth()
	const navigate = useNavigate()

	const {
		register,
		control,
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
			const { name, accessToken } = await authenticate(data)

			signIn(accessToken)

			toast.success(`Seja bem-vindo ${name}!`)

			navigate('/')
		} catch (error) {
			toast.error(parseError(error as AppError))
		}
	})

	return {
		register,
		handleSubmit,
		control,
		errors,
	}
}
