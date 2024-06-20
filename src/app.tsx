import './views/styles/globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { AppRoutes } from '@/router'

import { AuthenticateProvider } from '@app/contexts/authenticate'
import { BalanceProvider } from '@app/contexts/balance'
import { TransactionProvider } from '@app/contexts/transaction'
import { ThemeProvider } from '@app/contexts/theme'
import { queryClient } from '@app/services/query-client'

export function App() {
	return (
		<AuthenticateProvider>
			<BalanceProvider>
				<TransactionProvider>
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
				</TransactionProvider>
			</BalanceProvider>
		</AuthenticateProvider>
	)
}
