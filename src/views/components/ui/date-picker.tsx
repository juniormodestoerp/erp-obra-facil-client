import React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { cn } from '@app/utils/cn'
import { Button } from '@views/components/ui/button'
import { Calendar } from '@views/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@views/components/ui/popover'
import { Label } from './label'
import { XCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  label: string
  selected: Date | null
  onChange: (date: Date | undefined) => void
  error?: string
}

export const DatePicker = React.forwardRef<HTMLDivElement, Props>(
  ({ label, selected, onChange, error }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div ref={ref}>
            <Label className="pb-0.5">{label}</Label>
            <Button
              type="button"
              variant={'outline'}
              className={cn(
                ' h-[38px] w-full justify-start rounded border border-zinc-400 px-3 text-left font-normal',
                !selected && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected ? (
                format(selected, 'PPP', { locale: ptBR })
              ) : (
                <span>Escolha uma data...</span>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="z-50 w-auto bg-white p-0" align="start">
          <Calendar
            mode="single"
            selected={selected ?? new Date()}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
        {error && (
          <div className="mt-2 flex items-center gap-1.5 text-red-600">
            <div>
              <XCircleIcon className="h-5" />
            </div>
            <span className="text-xs">{error}</span>
          </div>
        )}
      </Popover>
    )
  },
)

DatePicker.displayName = 'DatePicker'
