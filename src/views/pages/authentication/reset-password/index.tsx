import { Button } from '@views/components/button'
import { InputPassword } from '@views/components/input/password'
import { UseResetPasswordController } from '@views/pages/authentication/reset-password/use-reset-password-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import logoImage from '@/assets/logos/logo.png'

export function ResetPassword() {
  const { register, errors, handleSubmit } = UseResetPasswordController()

  return (
    <Fragment>
      <Helmet title="Recuperar senha" />

      <div className="p-8">
        <div className="flex w-[362px] flex-col justify-center gap-6">
          <h1 className="text-2xl font-semibold tracking-tighter text-foreground">
            Recupere sua senha Obra Fácil!
          </h1>

          <img
            src={logoImage}
            alt="logo obra fácil"
            className="mx-auto h-24 w-24"
          />

          <p className="mb-8 font-medium text-foreground">
            Preencha os campos abaixo para criar uma nova senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-[350px]">
          <InputPassword
            label="Nova senha:"
            placeholder="Digite sua nova senha *"
            className="mb-1.5"
            error={errors.password?.message}
            {...register('password')}
          />

          <InputPassword
            label="Confirmar senha:"
            placeholder="Digite novamente sua nova senha *"
            className="mb-6"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" className="w-full" text="Redefinir senha" />
        </form>

        <Fragment>
          <p className="mt-6 px-3 text-center">
            <span className="select-none">Já tem uma conta?</span>
            <Link to="/login" className="ml-1 font-semibold text-white">
              Faça login!
            </Link>
          </p>

          <div className="mx-8 my-5 h-px bg-white dark:bg-white" />

          <p className="px-3 text-center">
            <span className="select-none">Ainda não tem uma conta?</span>
            <Link to="/sign-up" className="ml-1 font-semibold text-white">
              Cadastre-se
            </Link>
          </p>
        </Fragment>
      </div>
    </Fragment>
  )
}
