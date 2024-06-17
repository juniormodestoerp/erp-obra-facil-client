import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { states } from '@/assets/data'

import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input/document'
import { InputMask } from '@views/components/input/mask'
import { PageTitle } from '@views/components/page-title'
import { Select } from '@views/components/select'
import { Button } from '@views/components/ui/button'
import {
	CardDescription,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'

import { useProfileController } from '@views/pages/private/profile/use-profile-controller'

export function Profile() {
	const {
		errors,
		control,
		dragging,
		previewSrc,
		fileInputRef,
		handleDrop,
		handleDragOver,
		handleDragLeave,
		handleRemoveImage,
		register,
		handleSubmit,
		handleFileChange,
		handleSubmitProfilePicture,
	} = useProfileController()

	return (
		<Fragment>
			<Helmet title="Perfil" />

			<PageTitle
				title="Perfil"
				description="Veja e gerencie suas informações pessoais e dados de perfil."
			/>

			<div className="flex flex-col flex-wrap space-y-2 rounded-md border border-slate-300 bg-white p-8 pt-6 shadow dark:border-slate-600 dark:bg-slate-950 pb-9">
				<form onSubmit={handleSubmit}>
					<CardHeader className="px-0 pt-0">
						<CardTitle>Conta</CardTitle>
						<CardDescription>
							Verifique os dados da conta e sua informações pessoais.
						</CardDescription>
					</CardHeader>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
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

					<CardHeader className="px-0 pt-6">
						<CardTitle>Endereço</CardTitle>
						<CardDescription>Verifique o seu endereço.</CardDescription>
					</CardHeader>

					<div className="grid w-full gap-x-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
						<InputMask
							mask="99999-999"
							label="CEP"
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
							labelClassName="mt-2"
							className="max-w-xl md:max-w-7xl "
							error={errors.complement?.message}
							{...register('complement')}
						/>
					</div>

					<div className="py-3" />

					<Button
						type="submit"
						className=" w-full bg-dark-blue px-3 dark:text-slate-100 dark:bg-slate-700"
					>
						Salvar dados pessoais
					</Button>
				</form>

				<form onSubmit={(e) => { e.preventDefault(); handleSubmitProfilePicture(); }} encType="multipart/form-data">
					<CardHeader className="px-0 pt-6">
						<CardTitle>Imagem de perfil</CardTitle>
						<CardDescription>
							Escolha uma foto de perfil para sua conta.
						</CardDescription>
					</CardHeader>

					<div className="max-h-44">
						<label
							htmlFor="fileUpload"
							className="pointer-events-none block select-none text-sm font-medium leading-6 text-zinc-900"
						>
							Foto de perfil:
						</label>

						<div
							className={`!mt-0.5 flex cursor-pointer dark:bg-zinc-600 select-none justify-center gap-x-8 items-center rounded-lg border ${
								dragging
									? 'border-blue-500 dark:bordar-zinc-100'
									: 'border-dashed border-gray-900/50'
							} px-6 ${previewSrc ? 'py-6' : 'py-10'} shadow dark:bg-zinc-100`}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
						>
							<div className="text-center mb-2">
								<PhotoIcon
									className="mx-auto h-14 w-14 text-blue-900 dark:text-zinc-100"
									strokeWidth={1}
									aria-hidden="true"
								/>
								<div className="mt-3 flex text-sm leading-6 text-gray-600 items-center">
									<label
										htmlFor="fileUpload"
										className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow text-dark-blue bg-transparent border border-dark-blue dark:border-zinc-100 h-7 px-1.5 cursor-pointer hover:bg-dark-blue hover:text-white transition-colors duration-300"
									>
										<span className='dark:text-zinc-100'>Carregue uma foto</span>
										<input
											id="fileUpload"
											type="file"
											className="sr-only"
											accept="image/*"
											onChange={handleFileChange}
											ref={fileInputRef}
											name='fileUpload'
										/>
									</label>
									<p className="pl-1 text-[15px] hidden lg:block dark:text-zinc-100">ou arraste e jogue</p>
								</div>
								<p className="text-sm leading-5 text-gray-600 mt-1 hidden lg:block dark:text-zinc-100">
									PNG, JPG, GIF até 10MB
								</p>
							</div>
							{previewSrc && (
								<div className="relative">
									<img
										id="image-preview"
										crossOrigin="anonymous"
										src={previewSrc as string}
										onDoubleClick={handleRemoveImage}
										className="h-40 rounded-lg hidden lg:block"
										alt="profile"
									/>
									<Button
										type="button"
										variant="outline"
										onClick={handleRemoveImage}
										className="rounded-full shadow p-0 h-7 w-7 absolute -top-2 -right-2 hidden lg:block"
									>
										<XMarkIcon className="text-zinc-600 h-4 ml-[5px] dark:text-zinc-100" />
									</Button>
								</div>
							)}
						</div>
					</div>
					<Button
						type="submit"
						className=" w-full bg-dark-blue px-3 dark:text-slate-100 mt-7 lg:mt-[84px] dark:bg-slate-700"
					>
						Salvar imagem de perfil
					</Button>
				</form>
			</div>
		</Fragment>
	)
}
