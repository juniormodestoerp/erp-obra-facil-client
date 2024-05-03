import { AuthLayout } from '@views/layouts/auth'
import { PrivateLayout } from '@views/layouts/private'
import { ForgotPassword } from '@views/pages/authentication/forgot-password'
import { NotFound } from '@views/pages/authentication/not-found'
import { ResetPassword } from '@views/pages/authentication/reset-password'
import { SignIn } from '@views/pages/authentication/sign-in'
import { SignUp } from '@views/pages/authentication/sign-up'
import { Contracts } from '@views/pages/private/contracts'
import { Dashboards } from '@views/pages/private/dashboards'
import { FundReleases } from '@views/pages/private/fund-releases'
import { InitialPage } from '@views/pages/private/initial-page'
import { LogOut } from '@views/pages/private/log-out'
import { Profile } from '@views/pages/private/profile'
import { PublicLink } from '@views/pages/private/public-link'
import { Reports } from '@views/pages/private/reports'
import { Settings } from '@views/pages/private/settings'
import { Subscriptions } from '@views/pages/private/subscriptions'
import { Support } from '@views/pages/private/support'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<InitialPage />} />
          <Route path="/fund-releases" element={<FundReleases />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/public-link" element={<PublicLink />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/log-out" element={<LogOut />} />
        </Route>

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
