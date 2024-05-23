import { Button } from '@views/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@views/components/ui/card'

export function TodayAppointmentCard() {
  return (
    <Card className="w-full text-xs">
      <CardHeader className="mb-0 pb-2">
        <CardTitle className="mx-auto text-sm text-zinc-800">
          Reuniões do dia
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
          <div>
            <p className=" text-smfont-medium text-zinc-700">Sandra</p>
            <p className="text-zinc-700">Orçamento</p>
          </div>
          <p>9h - 10h</p>
        </div>

        <div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
          <div>
            <p className="text-sm font-medium text-zinc-700">Paulo</p>
            <p className="text-zinc-700">Acompanhamento</p>
          </div>
          <p>13h - 15h</p>
        </div>

        <div className="mt-2 flex items-center justify-between border-b border-zinc-200 pb-1">
          <div>
            <p className="text-sm font-medium text-zinc-700">Eduardo</p>
            <p className="text-zinc-700">Venda</p>
          </div>
          <p>16h - 17h</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          className="mx-auto bg-dark-blue hover:bg-dark-blue/90"
        >
          Acessar
        </Button>
      </CardFooter>
    </Card>
  )
}
