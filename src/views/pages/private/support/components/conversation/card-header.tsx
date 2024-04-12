import {
  CardDescription,
  CardHeader as SdcnCardHeader,
  CardTitle,
} from '@views/components/ui/card'
import { Tags } from 'lucide-react'

export function CardHeader() {
  return (
    <SdcnCardHeader className="border-b border-zinc-300 bg-zinc-50 px-6 py-5">
      <CardTitle>Usuário - Rodrigo Mendes</CardTitle>
      <CardDescription className="flex items-center gap-1.5">
        <Tags className="h-4 w-4 text-black" />
        Tópico da conversa: bug ao gerar orçamento.
      </CardDescription>
    </SdcnCardHeader>
  )
}
