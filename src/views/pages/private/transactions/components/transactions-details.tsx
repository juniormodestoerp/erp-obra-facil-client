import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@views/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@views/components/ui/table'

export function TransactionsDetails() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="font-medium">
					<span className="tracking-tight">Lançamento:</span>
					<span className="ml-1 font-mono text-base tracking-tighter">
						63edf432-5728-4c93-b124-34a50f03b159
					</span>
				</DialogTitle>
				<DialogDescription>Detalhes do lançamento:</DialogDescription>
			</DialogHeader>

			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Data:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								24/03/2024
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Status:
							</TableCell>
							<TableCell className="flex justify-end">
								<div className="flex items-center gap-2 text-xs">
									<span className="h-2 w-2 rounded-full bg-yellow-600" />
									<span className="text-muted-foreground">Pendente</span>
								</div>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Estabelecimento:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								Loja Visconde
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Banco:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								Itaú
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Categoria(s):
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								Vendas
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Forma de pagamento:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								Cartão de débito
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Saldo anterior:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								R$ 0,00
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Total:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-dark-blue">
								R$ 18.400,00
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Saldo atual:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-dark-blue">
								R$ 18.400,00
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium text-muted-foreground">
								Realizado há:
							</TableCell>
							<TableCell className="flex justify-end text-xs text-muted-foreground">
								13 dias atrás
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</DialogContent>
	)
}
