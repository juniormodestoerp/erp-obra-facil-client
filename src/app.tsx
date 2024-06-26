import './views/styles/globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { AppRoutes } from '@/router'

import { AuthenticateProvider } from '@app/contexts/authenticate'
import { BalanceProvider } from '@app/contexts/balance'
import { SidebarProvider } from '@app/contexts/sidebar'
import { ThemeProvider } from '@app/contexts/theme'
import { TransactionProvider } from '@app/contexts/transaction'
import { queryClient } from '@app/services/query-client'

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticateProvider>
				<SidebarProvider>
					<BalanceProvider>
						<TransactionProvider>
							<HelmetProvider>
								<ThemeProvider
									defaultTheme="light"
									storageKey="obra-facil-theme"
								>
									<Helmet titleTemplate="%s | Obra Fácil - ERP Simplificado" />
									<Toaster
										richColors
										closeButton
										expand
										duration={3500}
										position="top-right"
									/>
									<AppRoutes />
								</ThemeProvider>
							</HelmetProvider>
						</TransactionProvider>
					</BalanceProvider>
				</SidebarProvider>
			</AuthenticateProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
