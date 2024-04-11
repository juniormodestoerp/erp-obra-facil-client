import { cn } from '@app/utils/cn'

interface Props {
  title: string
  isActive: boolean
}

export function Header({ title, isActive }: Props) {
  return (
    <div className="flex items-start justify-between">
      <h3 className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <div className="flex h-4 w-4 items-center justify-center">
        <div
          className={cn(
            'mt-2 h-2.5 w-2.5 rounded-full',
            isActive ? 'bg-green-500' : 'bg-red-500',
          )}
        />
      </div>
    </div>
  )
}
