import { authService } from '@app/services/authenticate'
import { strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export function UseResetPasswordController() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const token = searchParams.get('token')
	const code = searchParams.get('code')

	const schema = z
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

	type FormData = z.infer<typeof schema>

	const {
		register,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		mode: 'onSubmit',
		resolver: zodResolver(schema),
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: async (data: FormData) => {
			if (!token) {
				throw new Error('Token is required')
			}

			if (!code) {
				throw new Error('Code is required')
			}

			return authService.resetPassword({
				token: token,
				code: code,
				password: data.password,
			})
		},
	})

	const handleSubmit = hookFormHandleSubmit(async (params: FormData) => {
		toast.promise(authenticate(params), {
			loading: 'Carregando...',
			success: () => {
				navigate('/login', { replace: true })
				return 'Senha alterada com sucesso! Faça login para continuar.'
			},
			error: 'Senha inválida. Tente novamente.',
		})
	})

	return {
		register,
		handleSubmit,
		errors,
	}
}
