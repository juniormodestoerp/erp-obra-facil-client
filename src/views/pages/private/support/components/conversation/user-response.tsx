import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/avatar'

interface Props {
  message: string
}

export function UserResponse({ message }: Props) {
  return (
    <>
      <p className="flex w-[65%] flex-col items-end justify-end leading-relaxed">
        <span className="block font-bold text-zinc-700">Cliente</span>
        <p className="w-fit rounded-md bg-zinc-100 p-1.5">
          <span>{message}</span>
        </p>
      </p>

      <Avatar>
        <AvatarFallback>BV</AvatarFallback>
        <AvatarImage src="https://avatars.githubusercontent.com/u/91766341?v=4" />
      </Avatar>
    </>
  )
}
