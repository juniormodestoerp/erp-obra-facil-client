import './views/styles/globals.css'

import { queryClient } from '@app/services/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@views/components/theme/theme-provider'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { AppRoutes } from '@/router'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="obra-facil-theme">
        <Helmet titleTemplate="%s | Obra Fácil - ERP Simplificado" />
        <Toaster
          richColors
          closeButton
          expand
          duration={3500}
          position="top-right"
        />
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
