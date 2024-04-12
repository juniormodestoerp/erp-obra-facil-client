import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { InputPassword } from '@views/components/input-password'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import logoImage from '@/assets/logos/logo.png'

import { UseSignInController } from './use-sign-in-controller'

export function SignIn() {
  const { register, handleSubmit, errors } = UseSignInController()

  return (
    <Fragment>
      <Helmet title="Login" />

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

          <p className="mb-8 font-medium text-foreground">
            Desfrute da melhor tecnologia para o fomento da construção cívil.
          </p>
        </div>

        <form className="w-[350px]">
          <Input
            label="E-mail:"
            placeholder="Digite seu e-mail *"
            className="mb-2"
            error={errors.email?.message}
            {...register('email')}
          />

          <InputPassword
            label="Senha:"
            placeholder="Digite sua senha *"
            className="mb-6"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button type="submit" className="w-full" text="ENTRAR"></Button>
        </form>

        <Fragment>
          <Link to="/forgot-password">
            <p className="mt-6 text-center font-semibold text-zinc-900 hover:text-foreground">
              Recuperar minha senha
            </p>
          </Link>

          <div className="mx-4 my-5 h-[1.5px] bg-dark-blue" />

          <p className="px-3 text-center">
            <span className="select-none">Ainda não tem uma conta?</span>
            <Link
              to="/sign-up"
              className="ml-1 font-semibold text-zinc-900 hover:text-foreground"
            >
              Cadastre-se
            </Link>
          </p>
        </Fragment>
      </div>
    </Fragment>
  )
}
