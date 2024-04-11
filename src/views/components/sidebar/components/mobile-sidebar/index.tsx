import { cn } from '@app/utils/cn'
import { MobileHeader } from '@views/components/sidebar/components/mobile-sidebar/mobile-header'
import { MobileOptions } from '@views/components/sidebar/components/mobile-sidebar/mobile-options'

interface Props {
  open: boolean
  path: string
  handleClose: () => void
}

export function MobileSidebar({ open, path, handleClose }: Props) {
  console.log(open)

  return (
    <div className={cn('z-50 w-0', open && 'w-64')}>
      <div className="flex h-screen flex-col gap-y-5 overflow-y-auto bg-dark-blue px-4 pb-4 dark:bg-black">
        <MobileHeader open={!open} handleClose={handleClose} />
        <MobileOptions path={path} open={!open} />
      </div>
    </div>
  )
}
