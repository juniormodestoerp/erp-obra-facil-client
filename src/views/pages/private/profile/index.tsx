import { Button } from '@views/components/ui/button'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function Profile() {
  return (
    <Fragment>
      <Helmet title="Perfil" />

      <div className="flex h-screen items-center justify-center">
        <Button>Profile</Button>
      </div>
    </Fragment>
  )
}
