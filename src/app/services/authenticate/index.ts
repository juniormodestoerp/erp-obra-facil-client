import { authGuard } from '@app/services/authenticate/auth-guard'
import { forgotPassword } from '@app/services/authenticate/forgot-password'
import { logout } from '@app/services/authenticate/logout'
import { profile } from '@app/services/authenticate/profile'
import { resetPassword } from '@app/services/authenticate/reset-password'
import { save } from '@app/services/authenticate/save'
import { signIn } from '@app/services/authenticate/sign-in'
import { signUp } from '@app/services/authenticate/sign-up'
import { profilePicture } from '@app/services/authenticate/profile-picture'

export const authService = {
	authGuard,
	signIn,
	signUp,
	save,
	forgotPassword,
	resetPassword,
	profile,
	logout,
	profilePicture
}
