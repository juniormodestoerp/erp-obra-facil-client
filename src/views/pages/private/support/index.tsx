import { PageTitle } from '@views/components/page-title'
import { Conversation } from '@views/pages/private/support/components/conversation'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function Support() {
  return (
    <Fragment>
      <Helmet title="Suporte" />

      <PageTitle
        title="Suporte"
        description="Converse em tempo real com nosso IA de suporte técnico ou um de nossos atendentes."
      />
      <div className="grid h-[calc(100vh-228px)] w-full grid-cols-5 rounded-xl shadow-md">
        <div className="col-span-2 h-full rounded-l-xl bg-sky-100"></div>
        <Conversation />
      </div>
    </Fragment>
  )
}
