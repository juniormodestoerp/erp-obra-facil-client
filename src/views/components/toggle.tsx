import { cn } from '@app/utils/cn'
import { Switch } from '@headlessui/react'

interface Props {
  enableText?: string
  disableText?: string
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  className?: string
}

export function Toggle({
  disableText,
  enableText,
  enabled,
  className,
  setEnabled,
}: Props) {
  return (
    <div className={cn('flex w-full items-center justify-start', className)}>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={cn(
          enabled ? 'bg-green-500' : 'bg-red-500',
          enabled ? 'focus:ring-green-500' : 'focus:ring-red-500',
          'relative inline-flex h-[20px] w-[38px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2  focus:ring-offset-2',
        )}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={cn(
            enabled ? 'translate-x-[16px]' : 'translate-x-[-1.75px]',
            'pointer-events-none relative inline-block h-5 w-5 translate-y-[-1.75px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        >
          <span
            className={cn(
              enabled
                ? 'opacity-0 duration-100 ease-out'
                : 'opacity-100 duration-200 ease-in',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={cn(
              enabled
                ? 'opacity-100 duration-200 ease-in'
                : 'opacity-0 duration-100 ease-out',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>

      <p className="text-main-300 ml-3 mt-0.5 font-medium">
        {enabled ? enableText : disableText}
      </p>
    </div>
  )
}
