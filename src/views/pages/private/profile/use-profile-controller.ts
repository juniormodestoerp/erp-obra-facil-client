import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ChangeEvent, DragEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authService } from '@app/services/authenticate'
import { strMessage } from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'
import { utilsService } from '@app/services/utils'
import { profilePicture } from '@app/services/authenticate/profile-picture'

const schema = z.object({
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
	zipCode: z.string(strMessage('CEP')),
	state: z.string(strMessage('estado')),
	city: z.string(strMessage('cidade')),
	neighborhood: z.string(strMessage('bairro')),
	street: z.string(strMessage('logradouro')),
	number: z.string(strMessage('número')),
	complement: z.string(strMessage('complemento')).optional(),
})

type FormData = z.infer<typeof schema>
type PreviewImage = string | ArrayBuffer | null

export function useProfileController() {
	const queryClient = useQueryClient()

	const [previewSrc, setPreviewSrc] = useState<PreviewImage>(null)
	const [dragging, setDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const selectedFileRef = useRef<File | null>(null);

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragging(false)
		const file = event.dataTransfer.files?.[0]
		if (file) {
			selectedFileRef.current = file;
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
		selectedFileRef.current = null;
	}

	function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		if (file) {
			selectedFileRef.current = file;
			const reader = new FileReader()
			reader.onload = () => setPreviewSrc(reader.result)
			reader.readAsDataURL(file)
		}
	}

	const { data, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: authService.profile,
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data?.profilePicture) {
			const profilePictureFilename = data.profilePicture.split('/').pop();
			setPreviewSrc(`http://localhost:8080/uploads/profile-pictures/${profilePictureFilename}` ?? '');
			refetch();
		}
	}, [data]);

	const {
		control,
		register,
		setValue,
		watch,
		setFocus,
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		values: {
			name: data?.name ?? '',
			document: data?.document ?? '',
			email: data?.email ?? '',
			phone: Format.phone(data?.phone.substring(4)) ?? '',
			zipCode: data?.zipCode ?? '',
			state: data?.state ?? '',
			city: data?.city ?? '',
			neighborhood: data?.neighborhood ?? '',
			street: data?.street ?? '',
			number: data?.number ?? '',
			complement: data?.complement ?? '',
		},
	})

	setValue('phone', data?.phone ?? '')

	const { mutateAsync: updateProfile } = useMutation({
		mutationFn: async (formData: FormData) => {
			return authService.save(formData)
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
		const preparedData = {
			...data,
			complement: data?.complement?.trim() === '' || data?.complement === undefined ? 'Não informado' : data.complement,
	};
		await updateProfile(preparedData)
		refetch()
	})

	const handleSubmitProfilePicture = async () => {
		if (selectedFileRef.current) {
			const response = await profilePicture(selectedFileRef.current);
			await refetch()
			window.location.reload();
			setPreviewSrc(response.profilePicture)
		} else {
			console.error("Nenhum arquivo selecionado.");
		}
	}

	const zipCode = watch('zipCode')

	const { data: address } = useQuery({
		queryKey: ['address', zipCode],
		queryFn: () => {
			if (!zipCode || zipCode.length !== 9) {
				return Promise.resolve(null)
			}

			return utilsService.showAddress({ zipCode })
		},
		enabled: !!(zipCode && zipCode.length === 9 && !zipCode.includes('_')),
	})

	useEffect(() => {
		if (address) {
			setValue('state', address.state)
			setValue('city', address.city)
			setValue(
				'neighborhood',
				Number(address.neighborhood) === 0 ? '' : address.neighborhood ?? '',
			)
			setValue('street', address.street ?? '')

			if (address.neighborhood && address.street) {
				setFocus('number')
			} else if (!address.neighborhood) {
				setFocus('neighborhood')
			} else if (!address.street) {
				setFocus('street')
			}
		}
	}, [address, setFocus, setValue])

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
		handleSubmitProfilePicture,
	}
}

// const state = watch('state')
// const city = watch('city')
// const street = watch('street')

// const { data: addressData } = useQuery({
// 	queryKey: ['address', zipCode, state, city, street],
// 	queryFn: () => {
// 		if (!zipCode || zipCode.length !== 9) {
// 			return Promise.resolve(null)
// 		}

// 		return utilsService.showAddress({ zipCode })
// 	},
// 	enabled: !!(!zipCode && state && city && street),
// })

// if (addressData) {
// 	setValue('zipCode', addressData.zipCode)
// 	setFocus('complement')
// }
