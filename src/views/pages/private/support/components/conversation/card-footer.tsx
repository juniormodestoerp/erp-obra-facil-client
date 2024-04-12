import { Button } from '@views/components/ui/button'
import { CardFooter as SdcnCardFooter } from '@views/components/ui/card'
import { Input } from '@views/components/ui/input'

export function CardFooter() {
  return (
    <SdcnCardFooter className="mt-0 border-t border-zinc-300 bg-zinc-50 pt-6">
      <form className="flex w-full gap-2">
        <Input placeholder="Como eu posso te ajudar?"></Input>
        <Button type="submit" className="font-medium">
          Enviar
        </Button>
      </form>
    </SdcnCardFooter>
  )
}
