import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { settingsOptions } from '@/assets/data'

import { Card } from './components/card'
import { PageTitle } from './components/page-title'
import { UseSettingsController } from './use-settings-controller'

export function Settings() {
  const { enabled, isActive, setEnabled, setIsActive } = UseSettingsController()

  return (
    <Fragment>
      <Helmet title="Configurações" />

      <PageTitle
        title="Configurações"
        description="Personalize o sistema para desbloquear uma eficiência sem precedentes."
      />

      <div className="flex min-h-screen flex-wrap items-start justify-start gap-8">
        {settingsOptions.map((setting) => {
          return (
            <div
              key={setting.id}
              className="w-full space-y-1.5 overflow-hidden rounded border border-zinc-300 bg-white p-3 shadow dark:border-zinc-400 dark:bg-zinc-800"
            >
              <Card.Header title={setting.title} isActive={isActive} />

              <Card.Content description={setting.description} />

              <Card.Footer
                enabled={enabled}
                setEnabled={setEnabled}
                isActive={isActive}
                handleActive={() => setIsActive(!isActive)}
              />
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}
