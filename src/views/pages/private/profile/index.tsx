import { states } from '@/assets/data'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input/document'
import { InputMask } from '@views/components/input/mask'
import { PageTitle } from '@views/components/page-title'
import { Select } from '@views/components/select'
import { Button } from '@views/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'
import { useProfileController } from '@views/pages/private/profile/use-profile-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function Profile() {
	const { control, errors, handleSubmit, register } = useProfileController()

	return (
		<Fragment>
			<Helmet title="Perfil" />

			<PageTitle
				title="Perfil"
				description="Veja e gerencie suas informações pessoais e dados de perfil."
			/>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-wrap space-y-2 rounded-md border border-slate-300 bg-white p-8 pt-6 shadow dark:border-slate-600 dark:bg-slate-950"
			>
				<CardHeader className="px-0 pt-0">
					<CardTitle>Conta</CardTitle>
					<CardDescription>
						Verifique os dados da conta e sua informações pessoais.
					</CardDescription>
				</CardHeader>
				<div className="grid grid-cols-2 gap-x-4 gap-y-2">
					<Input
						id="input-name"
						label="Nome"
						placeholder="Digite o nome"
						className="max-w-xl"
						error={errors.name?.message}
						{...register('name')}
					/>
					<InputDocument
						label="CPF"
						name="document"
						disabled
						id="input-document"
						placeholder="Digite o CPF"
						className="max-w-xl"
						control={control}
						error={errors.document?.message}
					/>
					<Input
						id="input-email"
						label="E-mail"
						placeholder="Digite o e-mail"
						className="max-w-xl"
						error={errors.email?.message}
						{...register('email')}
					/>
					<InputMask
						label="Telefone"
						placeholder="Digite o telefone"
						mask="+55 (99) 99999-9999"
						className="max-w-xl"
						error={errors.phone?.message}
						{...register('phone')}
					/>
				</div>

				<label
					htmlFor="file-upload"
					className="pointer-events-none block select-none text-sm font-medium leading-6 text-zinc-900"
				>
					Foto de perfil:
				</label>

				<label
					className="pointer-events-none !mt-0.5 flex cursor-pointer select-none justify-center rounded-lg border border-dashed border-gray-900/50 px-6 py-10 shadow dark:bg-zinc-100"
					htmlFor="file-upload"
				>
					<div className="text-center">
						<PhotoIcon
							className="mx-auto h-12 w-12 text-gray-300"
							aria-hidden="true"
						/>
						<div className="mt-4 flex text-sm leading-6 text-gray-600">
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer rounded-md bg-white font-semibold text-dark-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-dark-blue focus-within:ring-offset-2 hover:text-blue-800 dark:bg-zinc-100"
							>
								<span>Carregue uma foto</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-1">ou arraste e jogue</p>
						</div>
						<p className="text-xs leading-5 text-gray-600">
							PNG, JPG, GIF até 10MB
						</p>
					</div>
				</label>

				<CardHeader className="px-0">
					<CardTitle>Endereço</CardTitle>
					<CardDescription>Verifique o seu endereço.</CardDescription>
				</CardHeader>

				<div className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
					<Input
						label="CEP"
						maxLength={9}
						placeholder="Digite o CEP *"
						className="max-w-xl"
						error={errors.zipCode?.message}
						{...register('zipCode')}
					/>

					<Select
						label="Estado"
						placeholder="Selecione um estado *"
						data={states}
						control={control}
						error={errors.state?.message}
						{...register('state')}
					/>

					<Input
						label="Cidade"
						placeholder="Digite a cidade *"
						className="max-w-xl"
						error={errors.city?.message}
						{...register('city')}
					/>
					<Input
						label="Bairro"
						placeholder="Digite o bairro *"
						className="max-w-xl"
						error={errors.neighborhood?.message}
						{...register('neighborhood')}
					/>

					<Input
						label="Logradouro"
						placeholder="Digite o logradouro *"
						className="max-w-xl"
						error={errors.street?.message}
						{...register('street')}
					/>
					<Input
						label="Número"
						placeholder="Digite o número *"
						className="max-w-xl"
						error={errors.number?.message}
						{...register('number')}
					/>
				</div>

				<div>
					<Input
						label="Complemento"
						placeholder="Digite o complemento"
						optional
						className="max-w-7xl"
						error={errors.complement?.message}
						{...register('complement')}
					/>
				</div>

				<div className="py-3" />

				<Button
					type="submit"
					className=" w-full bg-dark-blue px-3 dark:text-slate-100"
				>
					Salvar
				</Button>
			</form>
		</Fragment>
	)
}
