export function Header() {
	return (
		<div className="flex items-center justify-between bg-darker-blue px-6 py-4 dark:bg-zinc-950">
			<h1 className="text-xs font-bold text-white">NOTIFICAÇÕES</h1>
			<button
				type="button"
				className="text-xs font-bold text-white hover:text-sky-300 dark:hover:text-primary"
			>
				VISUALIZAR TODAS
			</button>
		</div>
	)
}
