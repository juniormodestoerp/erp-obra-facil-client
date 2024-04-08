import { cn } from '@app/utils/cn'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowLeftStartOnRectangleIcon,
  BanknotesIcon,
  Bars3Icon,
  BellIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  FolderPlusIcon,
  HomeIcon,
  LinkIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
  ScaleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { SidebarTopic } from '@views/components/sidebar-topic'
import { ThemeToggle } from '@views/components/theme/theme-toggle'
import { SearchCheck } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import logo from '@/assets/logos/logo.png'

export function PrivateLayout() {
  const route = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [smallSidebarOpen, setSmallSidebarOpen] = useState(false)

  const pagePaths = route.pathname.split('/')
  pagePaths.shift()

  function handleSize() {
    setSmallSidebarOpen(!smallSidebarOpen)
  }

  return (
    <div className="h-full min-h-screen bg-gray-50">
      <div>
        {/* Mobile */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-[250px] top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Fechar barra lateral</span>
                        <XMarkIcon
                          className="h-8 w-8 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-auto shrink-0 items-center">
                      <img
                        className="mx-auto mb-4 mt-10 h-24 w-auto"
                        src={logo}
                        alt="C2 Cards"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul
                        role="list"
                        className="-mx-2 flex flex-1 flex-col gap-y-7"
                      >
                        <div role="list" className="space-y-1">
                          <SidebarTopic
                            Icon={<HomeIcon className="h-6 w-6" />}
                            linkTo="/"
                            title="Dashboard"
                            selected={route.pathname === '/'}
                          />

                          <SidebarTopic
                            Icon={
                              <BuildingStorefrontIcon className="h-6 w-6" />
                            }
                            linkTo="/ec_clients"
                            title="Clientes (E.C)"
                            selected={route.pathname.startsWith('/ec_clients')}
                          />

                          <SidebarTopic
                            Icon={<PencilSquareIcon className="h-6 w-6" />}
                            linkTo="/opt_in"
                            title="OPT-In"
                            selected={route.pathname.startsWith('/opt_in')}
                          />

                          <SidebarTopic
                            Icon={<ScaleIcon className="h-6 w-6" />}
                            linkTo="/contracts"
                            title="Contratos"
                            selected={route.pathname.startsWith('/contracts')}
                          />

                          <SidebarTopic
                            Icon={
                              <ClipboardDocumentListIcon className="h-6 w-6" />
                            }
                            linkTo="/agenda"
                            title="Agenda"
                            selected={route.pathname.startsWith('/agenda')}
                          />

                          <SidebarTopic
                            Icon={<BanknotesIcon className="h-6 w-6" />}
                            linkTo="/urs"
                            title="URs"
                            selected={route.pathname.startsWith('/urs')}
                          />

                          {/* <SidebarTopic
                            Icon={<UserIcon className="h-6 w-6" />}
                            linkTo="/users"
                            title="Usuários"
                            selected={route.pathname.startsWith('/users')}
                          /> */}
                        </div>

                        <div className="bg-main-green -mx-4 h-px w-[320px]" />

                        <div className="mb-5">
                          <SidebarTopic
                            Icon={<UserCircleIcon className="h-6 w-6" />}
                            linkTo="/profile"
                            title="Perfil"
                            selected={route.pathname.startsWith('/profile')}
                          />

                          <SidebarTopic
                            Icon={
                              <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                            }
                            linkTo="/log-out"
                            title="Sair"
                            selected={route.pathname.startsWith('/logout')}
                          />
                        </div>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div
          className={cn(
            'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex  lg:flex-col',
            smallSidebarOpen ? 'lg:w-20' : 'lg:w-60',
          )}
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark-blue px-6 pb-4">
            <div
              className={cn(
                'mx-auto flex h-16 items-center justify-center gap-1.5',
                smallSidebarOpen && 'gap-0',
              )}
            >
              <button onClick={handleSize}>
                <img
                  className={cn('h-14 w-auto', smallSidebarOpen && 'hidden')}
                  src={logo}
                  alt="logo obra fácil"
                />
              </button>

              <h1
                className={cn(
                  'mt-1 text-2xl font-semibold text-white',
                  smallSidebarOpen && 'hidden',
                )}
              >
                Obra Fácil
              </h1>

              <button
                onClick={handleSize}
                className={cn(
                  'mt-4 hidden h-8 w-8 items-center text-white',
                  smallSidebarOpen && 'flex',
                )}
              >
                {
                  smallSidebarOpen ?? sidebarOpen ? (
                    <Bars3Icon className="h-16 w-16" aria-hidden="true" />
                  ) : null
                  // <XMarkIcon className="h-16 w-16 pt-1.5" aria-hidden="true" />
                }
              </button>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="-mx-2 flex flex-1 flex-col gap-y-7">
                <div role="list" className="space-y-1">
                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<HomeIcon className="h-6 w-6" />}
                    linkTo="/"
                    title="Página inicial"
                    selected={route.pathname === '/'}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<BanknotesIcon className="h-6 w-6" />}
                    linkTo="/fund-releases"
                    title="Lançamentos"
                    selected={route.pathname.startsWith('/fund-releases')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<PresentationChartLineIcon className="h-6 w-6" />}
                    linkTo="/dashboards"
                    title="Dashboards
                    "
                    selected={route.pathname.startsWith('/dashboards')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
                    linkTo="/reports"
                    title="Relatórios
                    "
                    selected={route.pathname.startsWith('/reports')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<FolderPlusIcon className="h-6 w-6" />}
                    linkTo="/subscriptions"
                    title="Cadastros"
                    selected={route.pathname.startsWith('/subscriptions')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<Cog8ToothIcon className="h-6 w-6" />}
                    linkTo="/settings"
                    title="Configurações"
                    selected={route.pathname.startsWith('/settings')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<ScaleIcon className="h-6 w-6" />}
                    linkTo="/contracts"
                    title="Contratos"
                    lock
                    selected={route.pathname.startsWith('/contracts')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<LinkIcon className="h-6 w-6" />}
                    linkTo="/public-link"
                    title="Link público"
                    lock
                    selected={route.pathname.startsWith('/public-link')}
                  />

                  {/* <SidebarTopic
                    Icon={<UserIcon className="h-6 w-6" />}
                    linkTo="/users"
                    title="Usuários"
                    selected={route.pathname.startsWith('/users')}
                  /> */}
                </div>

                <div className="mb-5 mt-auto">
                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<UserCircleIcon className="h-6 w-6" />}
                    linkTo="/profile"
                    title="Perfil"
                    selected={route.pathname.startsWith('/profile')}
                  />

                  <SidebarTopic
                    open={!smallSidebarOpen}
                    Icon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6" />}
                    linkTo="/log-out"
                    title="Sair"
                    selected={route.pathname.startsWith('/log-out')}
                  />
                </div>
              </ul>
            </nav>
          </div>
        </div>

        <div className={cn(smallSidebarOpen ? 'lg:ml-20' : 'lg:ml-60')}>
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 self-stretch lg:gap-x-6">
              <form
                className="relative flex flex-1 gap-6"
                action="#"
                method="GET"
              >
                <label htmlFor="search-field" className="sr-only">
                  Procurar
                </label>

                <SearchCheck
                  className="pointer-events-none absolute inset-y-0 left-4 h-full w-[18px] text-gray-600"
                  aria-hidden="true"
                />

                <input
                  id="search-field"
                  className="text-main-300 bg-main-100 my-auto block h-10 w-full rounded-xl border border-muted-foreground py-0 pl-10 pr-0 placeholder:text-gray-600 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>

              <div className="flex items-center gap-x-2 lg:gap-x-3">
                <button
                  type="button"
                  className="hover:text-main-100  mr-2 rounded-md border border-gy-100 p-[5px] text-gray-400"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    className="h-6 w-6 text-foreground"
                    aria-hidden="true"
                  />
                </button>

                <div className="ml-auto mr-1 flex items-center gap-2">
                  <ThemeToggle />
                </div>
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

          <main className={cn('p-8', sidebarOpen && 'lg:pl-[272px]')}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
