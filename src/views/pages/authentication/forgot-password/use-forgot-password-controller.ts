import { authService } from '@app/services/authenticate'
import { strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export type TabProps = 'document' | 'email'

export function useForgotPasswordController() {
	const navigate = useNavigate()
	const [currentTab, setCurrentTab] = useState<TabProps>('email')

	const forgotPasswordForm = z.object({
		email: z
			.string(strMessage('e-mail'))
			.optional()
			.refine(
				(data) => data === '' || z.string().email().safeParse(data).success,
				{
					message: 'O e-mail é inválido',
				},
			),
		document: z
			.string(strMessage('CPF / CNPJ'))
			.min(14, { message: 'O campo CPF deve ter 11 caracteres.' })
			.regex(/^[0-9.-]+$/, {
				message: 'O campo CPF deve conter apenas números.',
			})
			.optional(),
	})

	type FormData = z.infer<typeof forgotPasswordForm>

	const {
		register,
		control,
		reset,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		mode: 'onSubmit',
		resolver: zodResolver(forgotPasswordForm),
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: async (data: FormData) => {
			return authService.forgotPassword(data)
		},
	})

	const handleSubmit = hookFormHandleSubmit(async (params: FormData) => {
		toast.promise(authenticate(params), {
			loading: 'Carregando...',
			success: () => {
				navigate('/login', { replace: true })
				return 'Enviamos um link de recuperação de senha para o seu e-mail.'
			},
			error: 'Usuário não encontrado.',
		})
	})

	return {
		errors,
		control,
		currentTab,
		reset,
		setCurrentTab,
		register,
		handleSubmit,
	}
}
