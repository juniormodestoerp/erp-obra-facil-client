import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Auth Guard */
import { AuthGuard } from '@/router/auth-guard'

/* Layouts */
import { AuthenticateLayout } from '@views/layouts/authenticate'
import { PrivateLayout } from '@views/layouts/private'

/* Private Routes */
import { Categories } from '@views/pages/private/categories'
import { InitialPage } from '@views/pages/private/initial-page'
import { Profile } from '@views/pages/private/profile'
import { Reports } from '@views/pages/private/reports'
import { Settings } from '@views/pages/private/settings'
import { Transactions } from '@views/pages/private/transactions'
import { Conciliations } from '@views/pages/private/conciliations'

/* Public Routes */
import { ForgotPassword } from '@views/pages/authentication/forgot-password'
import { NotFound } from '@views/pages/authentication/not-found'
import { ResetPassword } from '@views/pages/authentication/reset-password'
import { SignIn } from '@views/pages/authentication/sign-in'
import { SignUp } from '@views/pages/authentication/sign-up'

/* Export Metrics Routes */
import { AccountsPayable } from '@views/pages/private/export-metrics/accounts-payable'
import { AccountsReceivable } from '@views/pages/private/export-metrics/accounts-receivable'
import { CashEntries } from '@views/pages/private/export-metrics/cash-entries'
import { CashFlow } from '@views/pages/private/export-metrics/cash-flow'
import { EntriesByCategory } from '@views/pages/private/export-metrics/entries-by-category'
import { EntriesByCenter } from '@views/pages/private/export-metrics/entries-by-center'
import { EntriesByContact } from '@views/pages/private/export-metrics/entries-by-contact'
import { EntriesByProject } from '@views/pages/private/export-metrics/entries-by-project'
import { EvolutionByCategory } from '@views/pages/private/export-metrics/evolution-by-category'
import { EvolutionByCenter } from '@views/pages/private/export-metrics/evolution-by-center'
import { EvolutionByContact } from '@views/pages/private/export-metrics/evolution-by-contact'
// import { EvolutionOfCategoryGoals } from '@views/pages/private/export-metrics/evolution-of-category-goals'
// import { EvolutionOfCenterGoals } from '@views/pages/private/export-metrics/evolution-of-center-goals'
import { PaidAccounts } from '@views/pages/private/export-metrics/paid-accounts'
import { ProjectResults } from '@views/pages/private/export-metrics/project-results'
import { ReceivedAccounts } from '@views/pages/private/export-metrics/received-accounts'
import { TotalsByCategory } from '@views/pages/private/export-metrics/totals-by-category'
import { TotalsByCenter } from '@views/pages/private/export-metrics/totals-by-center'
import { TotalsByContact } from '@views/pages/private/export-metrics/totals-by-contact'
import { TotalsByProject } from '@views/pages/private/export-metrics/totals-by-project'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route element={<AuthenticateLayout />}>
					<Route index path="/login" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Route>

				{/* Private Routes */}
				<Route element={<AuthGuard isPrivate />}>
					<Route element={<PrivateLayout />}>
						<Route path="/" element={<InitialPage />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/conciliations" element={<Conciliations />} />
						<Route path="/reports" element={<Reports />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/profile" element={<Profile />} />
					</Route>

					{/* Export Metrics Routes */}
					<Route
						path="/metrics/accounts-payable"
						element={<AccountsPayable />}
					/>
					<Route
						path="/metrics/accounts-receivable"
						element={<AccountsReceivable />}
					/>
					<Route path="/metrics/cash-entries" element={<CashEntries />} />
					<Route path="/metrics/cash-flow" element={<CashFlow />} />
					<Route
						path="/metrics/entries-by-category"
						element={<EntriesByCategory />}
					/>

					<Route
						path="/metrics/entries-by-center"
						element={<EntriesByCenter />}
					/>
					<Route
						path="/metrics/entries-by-contact"
						element={<EntriesByContact />}
					/>
					<Route
						path="/metrics/entries-by-project"
						element={<EntriesByProject />}
					/>
					<Route
						path="/metrics/evolution-by-category"
						element={<EvolutionByCategory />}
					/>
					<Route
						path="/metrics/evolution-by-center"
						element={<EvolutionByCenter />}
					/>

					<Route
						path="/metrics/evolution-by-contact"
						element={<EvolutionByContact />}
					/>
					<Route path="/metrics/paid-accounts" element={<PaidAccounts />} />
					<Route path="/metrics/project-results" element={<ProjectResults />} />

					<Route
						path="/metrics/received-accounts"
						element={<ReceivedAccounts />}
					/>
					<Route
						path="/metrics/totals-by-category"
						element={<TotalsByCategory />}
					/>
					<Route
						path="/metrics/totals-by-center"
						element={<TotalsByCenter />}
					/>
					<Route
						path="/metrics/totals-by-contact"
						element={<TotalsByContact />}
					/>
					<Route
						path="/metrics/totals-by-project"
						element={<TotalsByProject />}
					/>
					{/* <Route
						path="/metrics/evolution-of-category-goals"
						element={<EvolutionOfCategoryGoals />}
					/>
					<Route
						path="/metrics/evolution-of-center-goals"
						element={<EvolutionOfCenterGoals />}
					/> */}
				</Route>

				{/* Not Found */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
