import { UserCircleIcon } from '@heroicons/react/24/outline'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'

export function NextBirthDayCard() {
	return (
		<Card className="w-full text-xs">
			<CardHeader className="mb-0 pb-2">
				<CardTitle className="mx-auto text-sm text-zinc-800">
					Clientes
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
					<UserCircleIcon className="h-10 w-10" strokeWidth={1} />
					<span>Gabriela Souza</span>
					<span className="text-sm font-medium text-dark-blue">15/04</span>
				</div>
				<div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
					<UserCircleIcon className="h-10 w-10" strokeWidth={1} />
					<span>João Silva</span>
					<span className="text-sm font-medium text-dark-blue">20/04</span>
				</div>
				<div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
					<UserCircleIcon className="h-10 w-10" strokeWidth={1} />
					<span>Maria Fernandes</span>
					<span className="text-sm font-medium text-dark-blue">18/04</span>
				</div>
				<div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
					<UserCircleIcon className="h-10 w-10" strokeWidth={1} />
					<span>Carlos Oliveira</span>
					<span className="text-sm font-medium text-dark-blue">22/04</span>
				</div>
			</CardContent>
		</Card>
	)
}
