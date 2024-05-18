import '../styles/text-animation.css'

import { Statistics } from '@views/components/auth-statistics'
import { HardHat } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import authImage from '@/assets/images/auth-image.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen md:grid-cols-10">
      <div className="relative hidden h-screen flex-col p-8 md:col-span-5 md:flex">
        <div className="mb-4 flex items-center gap-3 text-sm font-medium text-foreground">
          <HardHat className="h-5 w-5" />
          <span className="font-semibold">Obra fácil</span>
        </div>

        <div className="overflow-y-auto text-sm leading-relaxed dark:text-slate-300">
          <p>
            O ERP Simplificado Obra Fácil é uma tecnologia de ponta focado em
            soluções de gestão e especialmente desenhada para atender as
            necessidades do pequeno construtor com simplicidade e eficácia.
          </p>
          <br />
          <p>
            Destacando-se por sua praticidade, experiência de usuário intuitiva
            e agilidade. Permitindo que os gestores concentrem-se no que
            realmente importa: construir com excelência e eficiência.
          </p>
        </div>

        <img
          src={authImage}
          alt="construtor"
          className="mx-auto my-auto w-2/3"
        />

        <Statistics />

        <footer className="mt-auto text-sm">
          Painel do Cliente <span className="font-semibold">Obra fácil</span> ©
          2024 - Todos os direitos reservados.
        </footer>
      </div>

      <div className="col-span-11 flex h-screen w-full items-center justify-center bg-dark-blue md:col-span-5">
        <Outlet />
      </div>
    </div>
  )
}
