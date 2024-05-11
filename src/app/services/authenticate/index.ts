import { authGuard } from '@app/services/authenticate//auth-guard'
import { signIn } from '@app/services/authenticate/sign-in'
import { signUp } from '@app/services/authenticate/sign-up'

export const authService = {
  authGuard,
  signIn,
  signUp,
}
