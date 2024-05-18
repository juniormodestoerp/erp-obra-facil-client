import { authGuard } from '@app/services/authenticate/auth-guard'
import { signIn } from '@app/services/authenticate/sign-in'
import { logout } from '@app/services/authenticate/logout'
import { profile } from '@app/services/authenticate/profile'
import { save } from '@app/services/authenticate/save'
import { signUp } from '@app/services/authenticate/sign-up'
import { forgotPassword } from '@app/services/authenticate/forgot-password'
import { resetPassword } from '@app/services/authenticate/reset-password'

export const authService = {
  authGuard,
  signIn,
  signUp,
  save,
  forgotPassword,
  resetPassword,
  profile,
  logout,
}
