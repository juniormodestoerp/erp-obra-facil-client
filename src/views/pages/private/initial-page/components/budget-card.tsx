import {
	BuildingOffice2Icon,
	DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@views/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'

export function BudgetCard() {
	return (
		<Card className="col-span-4 flex h-fit flex-col items-center justify-between">
			<CardHeader className="flex items-center justify-center">
				<CardTitle className="text-zinc-800">Orçamentos</CardTitle>
				<CardDescription className="text-zinc-600">
					Aguardando confirmação
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col items-center justify-center gap-4">
				<p className="text-6xl font-normal text-zinc-700">20</p>
				<Button type="button" className="bg-dark-blue hover:bg-dark-blue/90">
					Acessar
				</Button>
			</CardContent>

			<div className="h-px w-full bg-zinc-200" />

			<CardFooter className="flex flex-col gap-1.5 py-6">
				<CardTitle className="text-zinc-800">Informações da empresa</CardTitle>

				<div className="flex items-center justify-between gap-2 pl-1.5">
					<BuildingOffice2Icon
						className="h-16 w-16 text-dark-blue"
						strokeWidth={1.2}
					/>
					<CardDescription className="text-sm tracking-tight text-zinc-700">
						Avenida João Santos, 5678 - Vila Esperança, Barueri - SP 04567-890
					</CardDescription>
				</div>

				<div className="flex items-center justify-between gap-2">
					<DevicePhoneMobileIcon
						className="h-8 w-8 text-dark-blue"
						strokeWidth={1.4}
					/>
					<CardDescription className="text-sm tracking-tight text-zinc-700">
						<p>@minhaempresaoficial</p>
						<p>facebook.com/minhaempresaoficial</p>
						<p>@minhaempresa_ofc</p>
					</CardDescription>
				</div>
			</CardFooter>
		</Card>
	)
}
