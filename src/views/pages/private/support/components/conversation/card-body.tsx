import { cn } from '@app/utils/cn'
import { CardContent } from '@views/components/ui/card'
import { ScrollArea } from '@views/components/ui/scroll-area'
import { AssistantResponse } from '@views/pages/private/support/components/conversation/assistant-response'
import { UserResponse } from '@views/pages/private/support/components/conversation/user-response'

interface Props {
  messages: {
    id: string
    role: string
    content: string
  }[]
}

export function CardBody({ messages }: Props) {
  return (
    <CardContent className="pb-0">
      <ScrollArea className="h-[calc(100vh-396px)] w-full pr-4">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={cn(
                'mb-3 flex items-center gap-3 text-xs text-zinc-700',
                message.role === 'assistant'
                  ? 'justify-start text-left'
                  : 'justify-end text-right',
              )}
            >
              {message.role === 'assistant' && (
                <AssistantResponse message={message.content} />
              )}

              {message.role === 'user' && (
                <UserResponse message={message.content} />
              )}
            </div>
          )
        })}
      </ScrollArea>
    </CardContent>
  )
}
