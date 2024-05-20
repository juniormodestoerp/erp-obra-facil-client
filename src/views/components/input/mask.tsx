import { cn } from '@app/utils/cn'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ComponentProps, forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'

interface Props extends ComponentProps<'input'> {
  name: string
  label: string
  error?: string
  mask?: string
  defaultValue?: string
}

export const InputMask = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      label,
      name,
      mask,
      id,
      error,
      className,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? name

    return (
      <div
        className={cn(
          'flex w-full flex-col',
          props.disabled && 'cursor-not-allowed select-none',
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100',
            props.disabled && 'cursor-not-allowed select-none',
          )}
        >
          {label}
        </label>

        <ReactInputMask
          mask={mask ?? '+55 (99) 99999-9999'}
          maskChar={'_'}
          {...props}
          placeholder={placeholder}
          ref={ref as any}
          name={name}
          defaultValue={defaultValue}
          id={inputId}
          className={cn(
            'block w-full max-w-sm rounded border border-zinc-400 px-3 py-1.5 text-xs text-zinc-900 shadow outline-none placeholder:text-zinc-400 hover:border-primary focus:border-primary  focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
            props.disabled &&
              'pointer-events-none cursor-not-allowed select-none',
            error && '!border-red-600',
            className,
          )}
        />

        {error && (
          <div className="mt-2 flex items-center gap-1.5 text-red-600">
            <div>
              <XCircleIcon className="h-5" />
            </div>
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    )
  },
)

InputMask.displayName = 'InputMask'
