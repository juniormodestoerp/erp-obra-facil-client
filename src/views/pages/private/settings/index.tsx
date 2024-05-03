import {
  Root as SwitchRoot,
  Thumb as SwitchThumb,
} from '@radix-ui/react-switch'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { cn } from '@app/utils/cn'
import { FormProvider } from 'react-hook-form'
import { PageTitle } from './components/page-title'
import { UseSettingsController } from './use-settings-controller'

export function Settings() {
  const { methods, settings, toggleFieldRequired, toggleFieldEnable } =
    UseSettingsController()

  return (
    <Fragment>
      <Helmet title="Configurações" />
      <PageTitle
        title="Configurações"
        description="Personalize o sistema para desbloquear uma eficiência sem precedentes."
      />
      <FormProvider {...methods}>
        <form className="flex min-h-screen flex-wrap items-start justify-start gap-8">
          {settings?.map((setting) => (
            <div
              key={setting.id}
              className="w-full space-y-1.5 overflow-hidden rounded border border-zinc-300 bg-white p-3 shadow dark:border-zinc-400 dark:bg-zinc-800"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  {setting.title}
                </h3>
                <div
                  className={cn(
                    'mt-2 h-2.5 w-2.5 rounded-full',
                    setting.isFieldEnable ? 'bg-green-500' : 'bg-red-500',
                  )}
                />
              </div>
              <p className="text-sm text-zinc-800 dark:text-zinc-200">
                {setting.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start space-x-2">
                  <SwitchRoot
                    className={cn(
                      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input',
                    )}
                    onClick={() => toggleFieldRequired(setting.id)}
                  >
                    <SwitchThumb
                      className={cn(
                        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
                        setting.isFieldRequired
                          ? 'translate-x-4'
                          : 'translate-x-0',
                      )}
                    />
                  </SwitchRoot>

                  <p>
                    {setting.isFieldRequired ? 'Obrigatório *' : 'Opcional'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFieldEnable(setting.id)}
                >
                  {setting.isFieldEnable ? 'Desabilitar' : 'Habilitar'}
                </button>
              </div>
            </div>
          ))}
        </form>
      </FormProvider>
    </Fragment>
  )
}
