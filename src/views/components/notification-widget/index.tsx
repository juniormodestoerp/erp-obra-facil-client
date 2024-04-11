import { NotificationContent } from '@views/components/notification-widget/notification-content'
import { NotificationTrigger } from '@views/components/notification-widget/notification-trigger'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@views/components/ui/popover'

export function NotificationWidget() {
  return (
    <Popover>
      <PopoverTrigger>
        <NotificationTrigger />
      </PopoverTrigger>
      <PopoverContent className="absolute right-36 top-2.5">
        <NotificationContent />
      </PopoverContent>
    </Popover>
  )
}
