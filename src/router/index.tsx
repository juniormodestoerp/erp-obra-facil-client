import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Auth Guard */
// import { AuthGuard } from '@guards/auth-guard'

/* Layouts */
import { AuthLayout } from '@views/layouts/auth'
import { PrivateLayout } from '@views/layouts/private'

/* Private Routes */
import { Categories } from '@views/pages/private/categories'
import { Contracts } from '@views/pages/private/contracts'
import { Dashboards } from '@views/pages/private/dashboards'
import { InitialPage } from '@views/pages/private/initial-page'
import { Logout } from '@views/pages/private/logout'
import { Profile } from '@views/pages/private/profile'
import { Reports } from '@views/pages/private/reports'
import { Settings } from '@views/pages/private/settings'
import { Transactions } from '@views/pages/private/transactions'

/* Public Routes */
import { ForgotPassword } from '@views/pages/authentication/forgot-password'
import { NotFound } from '@views/pages/authentication/not-found'
import { ResetPassword } from '@views/pages/authentication/reset-password'
import { SignIn } from '@views/pages/authentication/sign-in'
import { SignUp } from '@views/pages/authentication/sign-up'
import { Conciliations } from '@views/pages/private/conciliations'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Private Routes */}
				{/* <Route element={<AuthGuard />}> */}
				<Route element={<PrivateLayout />}>
					<Route path="/" element={<InitialPage />} />
					<Route path="/transactions" element={<Transactions />} />
					<Route path="/conciliations" element={<Conciliations />} />
					<Route path="/dashboards" element={<Dashboards />} />
					<Route path="/reports" element={<Reports />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/contracts" element={<Contracts />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/logout" element={<Logout />} />
				</Route>
				{/* </Route> */}

				{/* Public Routes */}
				<Route element={<AuthLayout />}>
					<Route index path="/login" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Route>

				{/* Not Found */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
