import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@views/components/ui/card'

export function PatientsCard() {
  return (
    <Card className="w-full text-xs">
      <CardHeader className="mb-0 pb-2">
        <CardTitle className="mx-auto text-sm text-zinc-800">
          Número de funcionários
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-[13px]">
        <div className="mt-2 flex items-start justify-between border-b border-zinc-200 pb-1">
          <div>
            <p className="text-sm font-medium text-zinc-700">Este mês:</p>
            <p className="flex gap-1.5 text-zinc-700">
              <div className="mt-[3px] h-2.5 w-2.5 rounded-full bg-red-600" />
              15% a menos em relação ao mês anterior.
            </p>
          </div>
          <p className="ml-2 text-4xl font-normal text-zinc-700">20</p>
        </div>

        <div className="mt-2 flex items-start justify-between pb-1">
          <div>
            <p className="text-sm font-medium text-zinc-700">Mês anterior:</p>
            <p className="flex gap-1.5 text-zinc-700">
              <div className="mt-[3px] h-2.5 w-2.5 rounded-full bg-dark-blue" />
              15% a mais em relação ao mês atual.
            </p>
          </div>
          <p className="ml-2 text-4xl font-normal text-zinc-700">23</p>
        </div>
      </CardContent>
    </Card>
  )
}
