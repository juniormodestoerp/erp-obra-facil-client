import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <Fragment>
      <Helmet title="404 - Página não encontrada" />

      <main className="relative isolate min-h-screen">
        <img
          src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Página não encontrada
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            Desculpe, não conseguimos encontrar a página que você está
            procurando.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/login"
              className="text-sm font-semibold leading-7 text-white"
            >
              <span aria-hidden="true">&larr;</span> Voltar para a página
              principal.
            </Link>
          </div>
        </div>
      </main>
    </Fragment>
  )
}
