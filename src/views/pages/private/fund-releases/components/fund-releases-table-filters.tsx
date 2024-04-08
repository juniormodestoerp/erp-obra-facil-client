import { Button } from '@views/components/ui/button'
import { Input } from '@views/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@views/components/ui/select'
import { SearchCheck, X } from 'lucide-react'

export function FundReleasesTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input placeholder="ID do lançamento" className="h-8 w-auto" />

      <Input placeholder="Nome do estabelecimento" className="h-8 w-[320px]" />

      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="scheduled">Agendados</SelectItem>
          <SelectItem value="approved">Aprovados</SelectItem>
          <SelectItem value="reconciled">Conciliados</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="outline" size="xs">
        <SearchCheck className="mr-1.5 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="xs">
        <X className="mr-1.5 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
