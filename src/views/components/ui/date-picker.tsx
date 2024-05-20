import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from '@app/utils/cn'
import { Button } from '@views/components/ui/button'
import { Calendar } from '@views/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@views/components/ui/popover'

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            '!mt-2.5 h-[38px] w-full justify-start rounded border border-zinc-400 px-3 text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-auto bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
