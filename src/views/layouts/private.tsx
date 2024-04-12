import { cn } from '@app/utils/cn'
import { NotificationWidget } from '@views/components/notification-widget'
import { BarsButton } from '@views/components/sidebar/components/bars-button'
import { DesktopSidebar } from '@views/components/sidebar/components/desktop-sidebar'
import { MobileSidebar } from '@views/components/sidebar/components/mobile-sidebar'
import { ThemeToggle } from '@views/components/theme/theme-toggle'
import { ComboboxDropdownMenu } from '@views/components/user-widget'
import { SearchCheck } from 'lucide-react'
import { useState } from 'react'
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <div className="flex flex-1 items-center gap-x-2">
            {!open && <BarsButton onClick={() => setOpen(!open)} />}

            <form
              className="relative flex flex-1 gap-6 px-4 sm:px-0"
              action="#"
              method="GET"
            >
              <label htmlFor="search-field" className="sr-only">
                Procurar
              </label>

              <SearchCheck
                className="pointer-events-none absolute inset-y-0 left-7 h-full w-[18px] text-gray-600 sm:left-3"
                aria-hidden="true"
              />

              <input
                id="search-field"
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-input py-[7px] pl-9 pr-2.5 text-sm transition-colors placeholder:text-foreground focus:ring-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                placeholder="Pesquisar..."
                type="search"
                name="search"
              />
            </form>

            <NotificationWidget />

            <ThemeToggle />

            <ComboboxDropdownMenu />
          </div>
        </div>

        <main className={cn('p-5 sm:p-8')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
