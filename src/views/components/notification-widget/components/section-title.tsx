interface Props {
  title: string
}

export function SectionTitle({ title }: Props) {
  return (
    <div className="bg-white px-6 py-2 text-sm font-medium text-zinc-700 dark:bg-black/90 dark:text-zinc-300">
      <h3>{title}</h3>
    </div>
  )
}
