import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ChangeEvent, DragEvent } from 'react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authService } from '@app/services/authenticate'
import { strMessage } from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'

const addressSchema = z.object({
	zipCode: z.string(strMessage('CEP')).optional(),
	state: z.string(strMessage('estado')).optional(),
	city: z.string(strMessage('cidade')).optional(),
	neighborhood: z.string(strMessage('bairro')).optional(),
	street: z.string(strMessage('logradouro')).optional(),
	number: z.string(strMessage('número')).optional(),
	complement: z.string(strMessage('complemento')).optional(),
})

const schema = z
	.object({
		name: z.string(strMessage('nome')),
		document: z
			.string(strMessage('CPF'))
			.transform((value) => value.replace(/[^\d]/g, ''))
			.refine((value) => value.length === 11, {
				message: 'O campo CPF deve conter 11 caracteres.',
			})
			.refine((value) => /^[0-9]+$/.test(value), {
				message: 'O campo CPF deve conter apenas números.',
			}),
		email: z.string(strMessage('e-mail')).email({ message: 'E-mail inválido' }),
		phone: z.string(strMessage('telefone')),
	})
	.merge(addressSchema)

type FormData = z.infer<typeof schema>
type PreviewImage = string | ArrayBuffer | null

export function useProfileController() {
	const queryClient = useQueryClient()

	const [previewSrc, setPreviewSrc] = useState<PreviewImage>(null)
	const [dragging, setDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragging(false)
		const file = event.dataTransfer.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => setPreviewSrc(reader.result)
			reader.readAsDataURL(file)
		}
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragging(true)
	}

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragging(false)
	}

	function handleRemoveImage() {
		setPreviewSrc(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => setPreviewSrc(reader.result)
			reader.readAsDataURL(file)
		}
	}

	const { data } = useQuery({
		queryKey: ['profile'],
		queryFn: authService.profile,
	})

	const {
		control,
		register,
		setValue,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		values: {
			name: data?.name ?? '',
			document: data?.document ?? '',
			email: data?.email ?? '',
			phone: Format.phone(data?.phone.substring(4)) ?? '',
		},
	})

	setValue('phone', data?.phone ?? '')

	const { mutateAsync: updateProfile } = useMutation({
		mutationFn: async (formData: FormData) => {
			return authService.save({ id: data?.id ?? '', ...formData })
		},
		onSuccess(_, variables) {
			const cached = queryClient.getQueryData(['profile', data?.id])

			if (cached) {
				queryClient.setQueryData(['profile', data?.id], {
					...cached,
					name: variables.name,
					document: variables.document.replace(/\D/g, ''),
					email: variables.email,
					phone: `+${variables.phone.replace(/\D/g, '')}`,
				})
			}
		},
	})

	const handleSubmit = hookFormHandleSubmit(async (data: FormData) => {
		await updateProfile(data)
	})

	return {
		errors,
		control,
		dragging,
		previewSrc,
		fileInputRef,
		handleDrop,
		handleDragOver,
		handleDragLeave,
		handleRemoveImage,
		register,
		handleSubmit,
		handleFileChange,
	}
}
