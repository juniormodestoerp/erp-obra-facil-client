import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { authService } from '@app/services/authenticate'

export function Logout() {
  const navigate = useNavigate()

  const { mutateAsync: logoutFn } = useMutation({
    mutationKey: ['logout'],
    mutationFn: authService.logout,
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
  })

  useEffect(() => {
    logoutFn()
  })

  return null
}
