import {
  DocumentDuplicateIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'

export function Pagination() {
  const currentPage = 1
  const setCurrentPage = (value: number) => value
  const itemsLength = 0

  const totalPages = Math.ceil(itemsLength / 10) ?? 1

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleNext() {
    if (itemsLength > 0 && currentPage <= totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="flex justify-between">
      <p className="hidden w-full min-w-24 items-center gap-1 pt-7 sm:flex">
        {currentPage} de {totalPages !== 0 ? totalPages : totalPages + 1}{' '}
        {currentPage === 1 ? 'página' : 'páginas'}
        {currentPage === 1 ? (
          <DocumentIcon className="h-4 text-cyan" strokeWidth={2} />
        ) : (
          <DocumentDuplicateIcon className="h-5 text-cyan" strokeWidth={2} />
        )}
      </p>
      <nav className="flex w-full items-center justify-between pt-2 sm:justify-end sm:px-0">
        <button
          type="button"
          disabled={currentPage <= 1}
          className="relative mt-4 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:pointer-events-none"
          onClick={handlePrevious}
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={currentPage === totalPages}
          className="relative ml-3 mt-4 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:pointer-events-none"
          onClick={handleNext}
        >
          Próximo
        </button>
      </nav>
    </div>
  )
}
