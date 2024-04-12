import { localStorageKeys } from '@app/config/local-storage-keys'
import { User } from '@app/contexts/auth-context'
// import { useNotification } from '@app/hooks/use-notification'
import { httpClient } from '@app/services/http-client'
import { strMessage } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useProfileController() {
  // const { successToast, errorToast, parseError } = useNotification()

  const [isPending, setIsPending] = useState(false)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    let isMounted = true

    const getUser = async () => {
      setIsPending(true)
      try {
        const { data } = await httpClient.get<{ user: User }>('/user/me')
        if (isMounted) {
          setUser(data)
          localStorage.setItem(localStorageKeys.KEY_USER, JSON.stringify(data))
        }
      } catch (error) {
        console.error('error in profile:', error)
      } finally {
        if (isMounted) setIsPending(false)
      }
    }

    getUser()

    return () => {
      isMounted = false
    }
  }, [])

  const schema = z.object({
    name: z.string(strMessage('nome')),
    document: z.string(strMessage('CPF')),
    email: z.string(strMessage('e-mail')).email({ message: 'E-mail inválido' }),
    phone: z.string(strMessage('telefone')),
  })

  type FormData = z.infer<typeof schema>

  const {
    control,
    setValue,
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      document: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (user) {
      const userData: any = {
        name: user.user.name ?? '',
        document: user.user.document ?? '',
        email: user.user.email ?? '',
        phone: user.user.phone ?? '',
        whatsapp: user.user.whatsapp ?? '',
      }

      Object.keys(userData).forEach((key: any) => {
        setValue(key, userData[key], { shouldValidate: true })
      })
    }
  }, [user, setValue])

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    if (!user?.user?.id) {
      // errorToast({
      //   title: 'Erro',
      //   message:
      //     'ID do usuário não encontrado. Não é possível atualizar o perfil.',
      // })
      return
    }

    setIsPending(true)
    try {
      const response = await httpClient.put(`/user/${user?.user?.id}`, {
        ...data,
        document: data.document.replace(/\D/g, ''),
        phone: data.phone.replace(/[^\d+]/g, ''),
      })
      // successToast({
      //   title: 'Informações Pessoais',
      //   message: 'Suas informações pessoais foram atualizadas com sucesso.',
      // })

      const updatedUser = response.data.user

      localStorage.removeItem(localStorageKeys.KEY_USER)
      localStorage.setItem(
        localStorageKeys.KEY_USER,
        JSON.stringify(updatedUser),
      )

      setValue('name', updatedUser?.name)
      setValue('document', updatedUser?.document)
      setValue('email', updatedUser?.email)
      setValue('phone', updatedUser?.phone)
    } catch (error) {
      // errorToast({
      //   title: 'Erro ao atualizar suas informações pessoais.',
      //   message: parseError(error).message,
      // })
    } finally {
      setIsPending(false)
    }
  })

  return {
    errors,
    control,
    isPending,
    register,
    handleSubmit,
  }
}
