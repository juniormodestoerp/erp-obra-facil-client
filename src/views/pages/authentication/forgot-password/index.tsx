import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { UseForgotPasswordController } from '@views/pages/authentication/forgot-password/use-forgot-password-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import logoImage from '@/assets/logos/logo.png'
import { Tabs } from './components/tabs'
import { InputDocument } from '@views/components/input/document'

export function ForgotPassword() {
  const { errors, register, currentTab, setCurrentTab, handleSubmit, control } =
    UseForgotPasswordController()

  return (
    <Fragment>
      <Helmet title="Esqueci a senha" />

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            Damos as boas-vindas à Obra Fácil!
          </h1>

          <img
            src={logoImage}
            alt="logo obra fácil"
            className="mx-auto h-24 w-24"
          />

          <fieldset className="mt-4 flex flex-col gap-2">
            <p className="text-center text-xl font-semibold text-slate-50">
              Recuperação de senha
            </p>

            <p className="mb-8 font-medium text-slate-100">
              Preencha um dos campo abaixo para recuperar sua senha.
            </p>
          </fieldset>
        </div>

        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <form onSubmit={handleSubmit} className="mt-8 w-[350px]">
          {currentTab === 'email' && (
            <Input
              label="E-mail:"
              placeholder="exemplo@mail.com"
              labelClassName="text-slate-100"
              className="max-w-screen-xl"
              error={errors.email?.message}
              {...register('email')}
            />
          )}

          {currentTab === 'document' && (
            <InputDocument
              label="CPF:"
              placeholder="123.456.789-00"
              control={control}
              maxLength={14}
              labelClassName="text-slate-100"
              className="max-w-screen-xl"
              error={errors.document?.message}
              {...register('document')}
            />
          )}

          <div className="py-4" />

          <Button type="submit" className="w-full" text="Recuperar" />
        </form>

        <p className="mt-6 px-3 text-center">
          <span className="select-none text-slate-200">Já tem uma conta?</span>
          <Link to="/login" className="ml-1 font-semibold text-white">
            Faça login!
          </Link>
        </p>
      </div>
    </Fragment>
  )
}
