import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/avatar'

interface Props {
  message: string
}

export function AssistantResponse({ message }: Props) {
  return (
    <>
      <Avatar>
        <AvatarFallback>BV</AvatarFallback>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/95449443?v=4"
          className="shadow-md"
        />
      </Avatar>

      <p className="flex w-[65%] flex-col items-start justify-start leading-relaxed">
        <span className="block font-bold text-zinc-700">Suporte</span>
        <p className="w-fit rounded-md bg-sky-100 p-1.5">
          <span>{message}</span>
        </p>
      </p>
    </>
  )
}
