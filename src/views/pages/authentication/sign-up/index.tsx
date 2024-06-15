import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input/document'
import { InputMask } from '@views/components/input/mask'
import { InputPassword } from '@views/components/input/password'
import { UseSignUpController } from '@views/pages/authentication/sign-up/use-sign-up-controller'
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
				<div className="flex w-[350px] flex-col justify-center gap-4">
					<h1 className="text-2xl font-semibold tracking-tight text-slate-50">
						Damos as boas-vindas à Obra Fácil!
					</h1>

					<img
						src={logoImage}
						alt="logo obra fácil"
						className="mx-auto h-24 w-24"
					/>

					<p className="mb-6 font-medium text-slate-100">
						Preencha os campos abaixo para criar a sua conta.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="w-[350px]">
					<Input
						label="Nome:"
						placeholder="Digite o seu nome *"
						labelClassName="text-slate-100"
						className="mb-1.5"
						error={errors.name?.message}
						{...register('name')}
					/>

					<Input
						label="E-mail:"
						placeholder="Digite o seu e-mail *"
						labelClassName="text-slate-100"
						className="mb-1.5"
						error={errors.email?.message}
						{...register('email')}
					/>

					<InputMask
						label="Telefone:"
						placeholder="Digite o seu telefone *"
						labelClassName="text-slate-100"
						className="mb-1.5"
						error={errors.phone?.message}
						{...register('phone')}
					/>

					<InputMask
						mask="99/99/9999"
						label="Data de nascimento:"
						placeholder="Digite a sua data de nascimento *"
						labelClassName="text-slate-100"
						className="mb-1.5"
						error={errors.birthDate?.message}
						{...register('birthDate')}
					/>

					<InputDocument
						label="CPF"
						placeholder="Digite o CPF *"
						labelClassName="text-slate-100"
						className="mb-1.5"
						maxLength={14}
						control={control}
						error={errors.document?.message}
						{...register('document')}
					/>

					<InputPassword
						label="Senha:"
						placeholder="Digite sua senha *"
						labelClassName="text-slate-100"
						className="mb-6"
						error={errors.password?.message}
						{...register('password')}
					/>

					<Button type="submit" className="w-full" text="Cadastrar" />

					<p className="mt-1 text-center text-sm leading-relaxed text-slate-300">
						Ao cadastrar-se, você concorda com os nossos
						<a href="/" className="mx-1 text-primary pointer-events-none">
							Termos de Uso
						</a>
						e
						<a href="/" className="ml-1 text-primary pointer-events-none">
							Política de Privacidade
						</a>
						.
					</p>
				</form>

				<p className="mt-4 px-3 text-center">
					<span className="select-none text-slate-200">Já tem uma conta?</span>
					<Link to="/login" className="ml-1 font-semibold text-white dark:text-slate-50">
						Faça login!
					</Link>
				</p>
			</div>
		</Fragment>
	)
}
