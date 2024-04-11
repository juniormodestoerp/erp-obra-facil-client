interface Props {
  description: string
}

export function Content({ description }: Props) {
  return (
    <p className="text-sm text-zinc-800 dark:text-zinc-200">{description}</p>
  )
}
