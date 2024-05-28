import {
	BellAlertIcon,
	BellSnoozeIcon,
	CheckIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { Header } from '@views/components/notification-widget/components/header'
import { Notification } from '@views/components/notification-widget/components/notification'
import { SectionTitle } from '@views/components/notification-widget/components/section-title'
import { Fragment } from 'react'

export function NotificationContent() {
	return (
		<div className="w-[448px] overflow-hidden rounded border border-zinc-400 dark:border-zinc-700">
			{/* Header */}
			<Header />

			{/* Recent */}
			<Fragment>
				<SectionTitle title="Recentes" />

				<div className="border-t border-sky-700 dark:divide-y-2 dark:divide-black dark:border-none">
					<Notification.Root>
						<Notification.Icon icon={BellAlertIcon} />
						<Notification.Content text="Você acabou de receber uma nova receita." />
					</Notification.Root>

					<Notification.Root>
						<Notification.Icon icon={BellAlertIcon} />
						<Notification.Content text="Você acabou de receber uma nova receita." />
						<Notification.Actions>
							<Notification.Action icon={CheckIcon} />
							<Notification.Action
								icon={XMarkIcon}
								className="bg-destructive hover:bg-destructive/90 dark:bg-danger dark:hover:bg-danger/90"
							/>
						</Notification.Actions>
					</Notification.Root>
				</div>
			</Fragment>

			{/* Viewed */}
			<Fragment>
				<SectionTitle title="Visualizadas" />

				<div className="border-t border-sky-700 dark:divide-y-2 dark:divide-black dark:border-none">
					<Notification.Root>
						<Notification.Icon icon={BellSnoozeIcon} />
						<Notification.Content text="Você acabou de receber uma nova receita." />
					</Notification.Root>

					<Notification.Root>
						<Notification.Icon icon={BellSnoozeIcon} />
						<Notification.Content text="Você acabou de receber uma nova receita." />
					</Notification.Root>

					<Notification.Root>
						<Notification.Icon icon={BellSnoozeIcon} />
						<Notification.Content text="Você acabou de receber uma nova receita." />
					</Notification.Root>

					<Notification.Root>
						<Notification.Icon icon={BellSnoozeIcon} />
						<Notification.Content text="Você acabou de receber uma nova receita." />
					</Notification.Root>
				</div>
			</Fragment>
		</div>
	)
}
