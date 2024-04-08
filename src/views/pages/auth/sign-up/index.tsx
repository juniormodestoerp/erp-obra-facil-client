import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputMask } from '@views/components/input-mask'
import { InputPassword } from '@views/components/input-password'
import { UseSignUpController } from '@views/pages/auth/sign-up/use-sign-up-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import logoImage from '@/assets/logos/logo.png'

export function SignUp() {
  const { control, errors, register, handleSubmit } = UseSignUpController()

  return (
    <Fragment>
      <Helmet title="Cadastro" />

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

          <p className="mb-6 font-medium text-foreground">
            Preencha os campos abaixo para criar a sua conta.
          </p>
        </div>

        <form className="w-[350px]">
          <Input
            label="Nome:"
            placeholder="Digite o seu nome *"
            className="mb-1.5"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="E-mail:"
            placeholder="Digite o seu e-mail *"
            className="mb-1.5"
            error={errors.email?.message}
            {...register('email')}
          />

          <InputMask
            label="Telefone:"
            placeholder="Digite o seu telefone *"
            className="mb-1.5"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <InputMask
            label="Data de nascimento:"
            placeholder="Digite a sua data de nascimento *"
            mask="99/99/9999"
            className="mb-1.5"
            error={errors.birthDate?.message}
            {...register('birthDate')}
          />

          <InputDocument
            label="CPF"
            placeholder="Digite o CPF *"
            maxLength={14}
            control={control}
            className="mb-1.5"
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

          <Button type="submit" className="w-full" text="Cadastrar" />

          <p className="mt-1 text-center text-sm leading-relaxed text-muted-foreground">
            Ao cadastrar-se, você concorda com os nossos
            <a href="#" className="mx-1 text-primary">
              Termos de Uso
            </a>
            e
            <a href="#" className="ml-1 text-primary">
              Política de Privacidade
            </a>
            .
          </p>
        </form>

        <p className="mt-4 px-3 text-center">
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
