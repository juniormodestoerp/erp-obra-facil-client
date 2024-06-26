export function Caption() {
	return (
		<caption className="flex flex-col">
			<p className="font-medium text-darker-blue text-left">Legendas</p>

			<div className="flex flex-col space-y-1">
				<span className="flex items-center gap-2 mt-3">
					<span className="bg-green-500 size-2 rounded-full" />
					<small>Lançamento novo</small>
				</span>

				<span className="flex items-center gap-2 mt-3">
					<span className="bg-rose-500 size-2 rounded-full" />
					<small>Lançamento discrepante</small>
				</span>
			</div>
		</caption>
	)
}
