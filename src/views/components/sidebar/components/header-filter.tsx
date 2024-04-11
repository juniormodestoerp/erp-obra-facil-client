import { SearchIcon } from 'lucide-react'

export function HeaderFilter() {
  return (
    <form className="relative flex flex-1 gap-6" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Procurar
      </label>

      <SearchIcon
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
  )
}
