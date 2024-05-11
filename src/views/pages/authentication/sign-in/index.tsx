import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@views/components/button'
import { InputPassword } from '@views/components/input/password'

import logoImage from '@/assets/logos/logo.png'

import { InputDocument } from '@views/components/input/document'
import { useSignInController } from './use-sign-in-controller'

export function SignIn() {
  const { register, handleSubmit, control, errors } = useSignInController()

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

        <form onSubmit={handleSubmit} className="w-[350px]">
          <InputDocument
            control={control}
            label="E-mail:"
            placeholder="Digite seu e-mail *"
            className="mb-2"
            error={errors.document?.message}
            {...register('document')}
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
            <p className="mt-6 text-center font-semibold text-slate-900 hover:text-foreground dark:text-slate-300">
              Recuperar minha senha
            </p>
          </Link>

          <div className="mx-8 my-5 h-px bg-dark-blue dark:bg-white" />

          <p className="px-3 text-center">
            <span className="select-none dark:text-slate-300">
              Ainda não tem uma conta?
            </span>
            <Link
              to="/sign-up"
              className="ml-1 font-semibold text-slate-900 hover:text-foreground dark:text-slate-50"
            >
              Cadastre-se
            </Link>
          </p>
        </Fragment>
      </div>
    </Fragment>
  )
}
