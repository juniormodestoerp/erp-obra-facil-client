export function Caption() {
	return (
		<figure className="flex flex-col">
			<figcaption className="font-medium text-darker-blue text-left">
				Legendas
			</figcaption>

			<div className="flex flex-col space-y-1">
				<span className="flex items-center gap-2 mt-3">
					<span className="bg-green-500 size-2 rounded-full min-w-2 min-h-2" />
					<small>Lançamento novo</small>
				</span>

				<span className="flex items-center gap-2 mt-3">
					<span className="bg-rose-500 size-2 rounded-full min-w-2 min-h-2" />
					<small>Lançamento discrepante</small>
				</span>
			</div>
		</figure>
	)
}
