import { authService } from '@app/services/authenticate'
import { httpClient } from '@app/services/http-client'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AuthGuard() {
	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const status = await authService.authGuard()
				if (status === 204) {
					setIsAuthenticated(true)
				} else {
					navigate('/login')
				}
			} catch (error) {
				navigate('/login')
			} finally {
				setLoading(false)
			}
		}

		checkAuthentication()

		const interceptorId = httpClient.interceptors.response.use(
			(response) => response,
			(error) => {
				if (
					error.response &&
					(error.response.status === 401 || error.response.status === 403)
				) {
					navigate('/login')
				}
				return Promise.reject(error)
			},
		)

		return () => {
			httpClient.interceptors.response.eject(interceptorId)
		}
	}, [navigate])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!isAuthenticated) {
		return null
	}

	return <Outlet />
}
