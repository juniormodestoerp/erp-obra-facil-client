import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { UseForgotPasswordController } from '@views/pages/auth/forgot-password/use-forgot-password-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import logoImage from '@/assets/logos/logo.png'

export function ForgotPassword() {
  const { errors, register, handleSubmit } = UseForgotPasswordController()

  // Enviamos um link de recuperação de senha para o seu e-mail.

  return (
    <Fragment>
      <Helmet title="Esqueci a senha" />

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Damos as boas-vindas à Obra Fácil!
          </h1>

          <img
            src={logoImage}
            alt="logo obra fácil"
            className="mx-auto h-24 w-24"
          />

          <fieldset className="mt-4 flex flex-col gap-2">
            <p className="text-center text-xl font-semibold">
              Recuperação de senha
            </p>

            <p className="mb-8 font-medium text-foreground">
              Preencha o campo abaixo para recuperar sua senha.
            </p>
          </fieldset>
        </div>

        <form className="w-[350px]">
          <Input
            label="E-mail:"
            placeholder="Digite seu e-mail *"
            className="mb-6"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" className="w-full" text="Recuperar" />
        </form>

        <p className="mt-6 px-3 text-center">
          <span className="select-none">Já tem uma conta?</span>
          <Link
            to="/sign-in"
            className="ml-1 font-semibold text-zinc-900 hover:text-foreground"
          >
            Faça login!
          </Link>
        </p>
      </div>
    </Fragment>
  )
}
