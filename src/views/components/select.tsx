import { MouseEvent, useState } from 'react'
import { Controller } from 'react-hook-form'
import { ChevronUpDownIcon, XCircleIcon } from '@heroicons/react/24/outline'

import { cn } from '@app/utils/cn'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@views/components/ui/command'

interface IData {
  field: string
  value: string
}

interface IHandleSelect {
  item: IData
  onChange: (value: string) => void
}

interface Props {
  id?: string
  label: string
  placeholder?: string
  name: string
  error?: string
  data: IData[]
  control: any
  optional?: boolean
}

export function Select({
  id,
  label,
  placeholder,
  name,
  error,
  data,
  control,
  optional,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const inputId = id ?? name

  function handleSelect({ item, onChange }: IHandleSelect) {
    console.log(item)

    onChange(item.field)
    setIsOpen(false)
  }

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium leading-6 tracking-tight text-zinc-900"
      >
        {label} {!optional && <span className="text-red-600">*</span>}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <button
              type="button"
              onClick={handleButtonClick}
              className={cn(
                'relative block min-h-10 w-full rounded-md border border-zinc-400 px-3 py-1.5 text-left text-xs text-zinc-900 shadow outline-none ring-0 placeholder:text-zinc-400 hover:border-primary focus:border-none focus:border-primary focus:outline-none focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
                error && '!border-red-600',
              )}
            >
              <span className={cn('text-zinc-400', value && 'text-zinc-900')}>
                {value || 'Selecione uma opção...'}
              </span>
              <ChevronUpDownIcon className="absolute right-1.5 top-1.5 h-6 w-6" />
            </button>

            <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
              <CommandInput
                id={inputId}
                placeholder={placeholder}
                value={value}
                onValueChange={(e) => onChange(e)}
                onClick={() => setIsOpen(true)}
                className="!focus:ring-0 !focus:outline-none !focus:border-none !cursor-pointer !border-none !outline-none !ring-0"
              />
              <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Sugestões">
                  {data.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleSelect({ item, onChange })}
                    >
                      <span>{item.field}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </>
        )}
      />

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-red-600">
          <XCircleIcon className="h-5" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
