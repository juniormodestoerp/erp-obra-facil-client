import { authService } from '@app/services/authenticate'
import { cn } from '@app/utils/cn'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@views/components/breadcumbs'
// import { NotificationWidget } from '@views/components/notification-widget'
// import { SearchCheck } from 'lucide-react'
import { BarsButton } from '@views/components/sidebar/components/bars-button'
import { DesktopSidebar } from '@views/components/sidebar/components/desktop-sidebar'
import { MobileSidebar } from '@views/components/sidebar/components/mobile-sidebar'
import { ThemeToggle } from '@views/components/theme/theme-toggle'
import { ComboboxDropdownMenu } from '@views/components/user-widget'
import { useCallback, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export function PrivateLayout() {
  const route = useLocation()
  const [open, setOpen] = useState(true)
  const [small, setSmall] = useState(false)

  const pagePaths = route.pathname.split('/')
  pagePaths.shift()

  function handleSize() {
    setSmall(!small)
  }

  const queryFn = useCallback(() => {
    return authService.profile()
  }, [])

  const { data: profile } = useQuery({
    queryKey: ['users'],
    queryFn,
  })

  return (
    <div className="flex h-full min-h-screen flex-1 bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar component for mobile */}
      <div className={cn('z-50 hidden lg:hidden', open && 'flex w-64')}>
        <MobileSidebar
          open={open}
          path={route.pathname}
          handleClose={() => setOpen(!open)}
        />
      </div>

      {/* Sidebar component for desktop */}
      <DesktopSidebar
        small={small}
        path={route.pathname}
        handleSize={handleSize}
      />

      <div
        className={cn('flex w-full flex-col', small ? 'lg:ml-20' : 'lg:ml-64')}
      >
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-zinc-600 dark:bg-zinc-900 sm:gap-x-6 sm:px-6">
          <div className="flex flex-1 items-center gap-x-2">
            {!open && <BarsButton onClick={() => setOpen(!open)} />}
            <Breadcrumbs />

            <ThemeToggle />

            <ComboboxDropdownMenu name={profile?.name} />
          </div>
        </div>

        <main className={cn('p-5 sm:p-8')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
