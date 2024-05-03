import { PhotoIcon } from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
// import { useProfileController } from '@views/pages/private/profile/use-profile-controller'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function Profile() {
  // const { control, errors, handleSubmit, register, isPending } =
  //   useProfileController()

  return (
    <Fragment>
      <Helmet title="Perfil" />

      <div className="flex h-full flex-col justify-between p-12 pt-10">
        <h1 className="text-4xl font-bold text-dark-blue">Configurações</h1>

        {/* <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-4xl space-y-1.5 rounded bg-white px-5 py-8 shadow"
        >
          <h3 className="mb-1.5 text-xl font-semibold">
            Informações da Empresa:
          </h3>

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
          <InputPhone
            label="Telefone"
            placeholder="Digite o telefone"
            mask="+55 (99) 9999-9999"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <InputPhone
            label="WhatsApp"
            placeholder="Digite o telefone"
            mask="+55 (99) 99999-9999"
            error={errors.whatsapp?.message}
            {...register('whatsapp')}
          /> */}

        <label
          htmlFor="file-upload"
          className="pointer-events-none block select-none text-sm font-medium leading-6 text-zinc-900"
        >
          Logo da sua empresa:
        </label>

        <label
          className="b-6 pointer-events-none mt-2 flex cursor-pointer select-none justify-center rounded-lg border border-dashed border-gray-900/50 px-6 py-10 shadow"
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
                className="relative cursor-pointer rounded-md bg-white font-semibold text-dark-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-dark-blue focus-within:ring-offset-2 hover:text-blue-800"
              >
                <span>Carregue um arquivo</span>
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

        <div className="py-2" />

        <Button type="submit" className=" w-full bg-dark-blue px-3">
          Salvar
        </Button>
        {/* </form> */}
      </div>
    </Fragment>
  )
}
