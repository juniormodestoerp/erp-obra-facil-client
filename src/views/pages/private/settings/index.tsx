import {
	Root as SwitchRoot,
	Thumb as SwitchThumb,
} from '@radix-ui/react-switch'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

import { cn } from '@app/utils/cn'
import { FormProvider } from 'react-hook-form'
import { PageTitle } from './components/page-title'
import { UseSettingsController } from './use-settings-controller'

import { useGlobalShortcut } from '@app/utils/global-shortcut'
import { useTransaction } from '@app/hooks/use-transaction'
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { NewFundRealeaseContent } from '@views/pages/private/transactions/components/new-transaction-content'

export function Settings() {
	const { methods, settings, toggleFieldRequired, toggleFieldEnable } =
		UseSettingsController()

	const { openTransaction, isTransactionOpen, closeTransaction } =
		useTransaction()

	useGlobalShortcut('Ctrl+a', openTransaction)

	return (
		<Fragment>
			<Helmet title="Configurações" />
			<PageTitle
				title="Configurações"
				description="Personalize o sistema para desbloquear uma eficiência sem precedentes."
			/>
			<FormProvider {...methods}>
				<form className="flex min-h-screen flex-wrap items-start justify-start gap-8">
					{settings?.map((setting) => (
						<div
							key={setting.id}
							className="w-full space-y-1.5 overflow-hidden rounded border border-slate-300 bg-white p-3 shadow dark:border-slate-400 dark:bg-slate-800"
						>
							<div className="flex items-start justify-between">
								<h3 className="font-medium tracking-tight text-slate-900 dark:text-slate-100">
									{setting.title}
								</h3>
								<div
									className={cn(
										'mt-2 h-2.5 w-2.5 rounded-full',
										setting.isFieldEnable ? 'bg-green-500' : 'bg-red-500',
									)}
								/>
							</div>
							<p className="text-sm text-slate-800 dark:text-slate-200">
								{setting.description}
							</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center justify-start space-x-2">
									<SwitchRoot
										className={cn(
											'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
											{
												'bg-green-500 ': setting.isFieldRequired,
												'bg-slate-600 dark:bg-slate-500':
													!setting.isFieldRequired,
											},
										)}
										onClick={() => toggleFieldRequired(setting.id)}
									>
										<SwitchThumb
											className={cn(
												'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform dark:bg-slate-900',
												setting.isFieldRequired
													? 'translate-x-4'
													: 'translate-x-0',
											)}
										/>
									</SwitchRoot>

									<p>
										<span>
											{setting.isFieldRequired ? (
												<span>
													Obrigatório{' '}
													<span className="text-red-600 dark:text-slate-50">
														*
													</span>
												</span>
											) : (
												'Opcional'
											)}
										</span>
									</p>
								</div>

								<button
									type="button"
									onClick={() => toggleFieldEnable(setting.id)}
								>
									{setting.isFieldEnable ? 'Desabilitar' : 'Habilitar'}
								</button>
							</div>
						</div>
					))}
				</form>
			</FormProvider>

			<Dialog
				open={isTransactionOpen}
				onOpenChange={(open) => {
					open ? openTransaction() : closeTransaction()
				}}
			>
				<DialogOverlay />
				<DialogTrigger asChild>
					<button type="button" className="hidden" />
				</DialogTrigger>
				<NewFundRealeaseContent />
			</Dialog>
		</Fragment>
	)
}
