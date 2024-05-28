interface Props {
	text: string
}

export function Content({ text }: Props) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<p className="text-sm font-medium leading-relaxed text-primary dark:text-slate-100">
				{text}
			</p>

			<span className="text-xs text-gy-600 dark:text-zinc-400">
				Registrada há 8 min
			</span>
		</div>
	)
}
