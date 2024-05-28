import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { authService } from '@app/services/authenticate'
import { strMessage } from '@app/utils/custom-zod-error'
import { useMutation } from '@tanstack/react-query'

const schema = z.object({
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
		.length(19, {
			message: 'O campo telefone deve conter 14 caracteres',
		})
		.transform((value) => value.replace(/[^0-9+]/g, ''))
		.refine((value) => value[0] === '+', {
			message: 'O campo telefone deve conter o código do país (+55).',
		}),
	birthDate: z
		.string(strMessage('data de nascimento'))
		.min(1, { message: 'O campo data de nascimento é obrigatória' }),
	document: z
		.string(strMessage('CPF'))
		.length(14, { message: 'O campo CPF deve ter 11 caracteres.' }),
	password: z
		.string(strMessage('senha'))
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
			message:
				'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
		})
		.min(1, 'A senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function UseSignUpController() {
	const navigate = useNavigate()

	const {
		register,
		control,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: authService.signUp,
	})

	const handleSubmit = hookFormHandleSubmit(async (data: FormData) => {
		try {
			const { name } = await authenticate(data)

			toast.success(`Seja bem-vindo ${name}!`)

			navigate('/')
		} catch (error) {
			toast.error('Erro ao realizar login!')
		}
	})

	return {
		control,
		errors,
		register,
		handleSubmit,
	}
}
