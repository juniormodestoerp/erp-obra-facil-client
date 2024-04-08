import { cn } from '@app/utils/cn'
import { Toggle } from '@views/components/toggle'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { settingsOptions } from '@/assets/data'

import { UseSettingsController } from './use-settings-controller'

export function Settings() {
  const { enabled, isActive, setEnabled, setIsActive } = UseSettingsController()

  return (
    <Fragment>
      <Helmet title="Configurações" />

      <h1 className="mb-2 text-2xl font-bold tracking-tight">Configurações</h1>
      <h2 className="mb-8 text-lg">
        Personalize o sistema para desbloquear uma eficiência sem precedentes.
      </h2>

      <div className="flex min-h-screen flex-wrap items-start justify-start gap-8">
        {settingsOptions.map((setting) => {
          return (
            <div
              key={setting.id}
              className="w-full space-y-3 rounded border border-gy-300 p-3 shadow"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium tracking-tight">{setting.title}</h3>
                <div className="flex h-4 w-4 items-center justify-center">
                  <div
                    className={cn(
                      'mt-2 h-2.5 w-2.5 rounded-full',
                      isActive ? 'bg-green-500' : 'bg-red-500',
                    )}
                  />
                </div>
              </div>
              <div className="">
                <p className="text-sm">{setting.description}</p>
              </div>
              <div className="flex items-center justify-end">
                <Toggle
                  enabled={enabled}
                  setEnabled={setEnabled}
                  enableText="Obrigatório *"
                  disableText="Opcional"
                />
                <button type="button" onClick={() => setIsActive(!isActive)}>
                  {isActive ? 'Desabilitar' : 'Habilitar'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}
