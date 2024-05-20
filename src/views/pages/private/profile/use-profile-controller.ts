import { authService } from '@app/services/authenticate'
import { strMessage } from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useProfileController() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.profile,
  })

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
  })

  type FormData = z.infer<typeof schema>


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
      return authService.save({ id: data!.id, ...formData })
    },
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(['profile', data!.id])

      if (cached) {
        queryClient.setQueryData(['profile', data!.id], {
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
    control,
    errors,
    handleSubmit,
    register,
  }
}
