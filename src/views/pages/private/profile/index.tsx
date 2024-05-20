import { PhotoIcon } from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input/document'
import { InputMask } from '@views/components/input/mask'
import { PageTitle } from '@views/components/page-title'
import { Button } from '@views/components/ui/button'
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
        <Input
          id="input-name"
          label="Nome"
          placeholder="Digite o nome"
          error={errors.name?.message}
          {...register('name')}
        />
        <InputDocument
          label="CPF"
          name="document"
          disabled
          id="input-document"
          placeholder="Digite o CPF"
          control={control}
          error={errors.document?.message}
        />
        <Input
          id="input-email"
          label="E-mail"
          placeholder="Digite o e-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputMask
          label="Telefone"
          placeholder="Digite o telefone"
          mask="+55 (99) 99999-9999"
          error={errors.phone?.message}
          {...register('phone')}
        />

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
