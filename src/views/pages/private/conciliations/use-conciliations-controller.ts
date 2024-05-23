import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({})

type FormData = z.infer<typeof schema>

export function useConciliationsController() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return {
    register,
    control,
    errors,
    hookFormHandleSubmit,
  }
}
