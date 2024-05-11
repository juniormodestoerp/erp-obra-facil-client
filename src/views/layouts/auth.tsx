import '../styles/text-animation.css'

import { Statistics } from '@views/components/auth-statistics'
import { HardHat } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import authImage from '@/assets/images/auth-image.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <HardHat className="h-5 w-5" />
          <span className="font-semibold">Obra fácil</span>
        </div>

        <div className="h-40 text-sm leading-relaxed dark:text-slate-300">
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

        <img src={authImage} alt="construtor" />

        <Statistics />

        <footer className="text-sm">
          Painel do Cliente <span className="font-semibold">Obra fácil</span> ©
          2024 - Todos os direitos reservados.
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  )
}
