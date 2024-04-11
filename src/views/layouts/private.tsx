import { cn } from '@app/utils/cn'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { NotificationWidget } from '@views/components/notification-widget'
import { BarsButton } from '@views/components/sidebar/components/bars-button'
import { DesktopSidebar } from '@views/components/sidebar/components/desktop-sidebar'
import { MobileSidebar } from '@views/components/sidebar/components/mobile-sidebar'
import { ThemeToggle } from '@views/components/theme/theme-toggle'
import { SearchCheck } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export function PrivateLayout() {
  const route = useLocation()
  const [open, setOpen] = useState(true)
  const [small, setSmall] = useState(false)

  const pagePaths = route.pathname.split('/')
  pagePaths.shift()

  function handleSize() {
    setSmall(!small)
  }

  console.log(open)

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
          <div className="flex flex-1 self-stretch lg:gap-x-6">
            {!open && <BarsButton onClick={() => setOpen(true)} />}

            <form
              className="relative flex flex-1 gap-6 px-4"
              action="#"
              method="GET"
            >
              <label htmlFor="search-field" className="sr-only">
                Procurar
              </label>

              <SearchCheck
                className="pointer-events-none absolute inset-y-0 left-7 h-full w-[18px] text-gray-600"
                aria-hidden="true"
              />

              <input
                id="search-field"
                className="text-main-300 bg-main-100 my-auto block h-10 w-full rounded-xl border border-muted-foreground py-0 pl-9 pr-0 placeholder:text-gray-600 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <NotificationWidget />

              <ThemeToggle />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>

                  <UserCircleIcon
                    className="h-[30px] w-[30px] text-foreground"
                    aria-hidden="true"
                  />

                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="text-main-300 ml-4 text-sm font-semibold leading-6"
                      aria-hidden="true"
                    >
                      Tom Cook
                    </span>

                    <ChevronDownIcon
                      className="ml-1 h-5 w-5 pt-px text-foreground"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="ring-main-300/5 absolute right-0 z-10 mt-2.5 w-[140px] origin-top-right rounded-md bg-white shadow-lg ring-1 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={cn(
                            active ? 'bg-main-100' : '',
                            'text-main-300 block px-3 py-1 text-sm leading-6',
                          )}
                        >
                          Perfil
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/log-out"
                          className={cn(
                            active ? 'bg-main-100' : '',
                            'text-main-300 block px-3 py-1 text-sm leading-6',
                          )}
                        >
                          Sair
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className={cn('p-5 sm:p-8', open && 'lg:pl-[272px]')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
