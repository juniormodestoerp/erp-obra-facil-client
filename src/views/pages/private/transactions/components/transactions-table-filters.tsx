import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
import { Dialog, DialogTrigger } from '@views/components/ui/dialog'
import { Input } from '@views/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@views/components/ui/select'
import { SearchCheck, X } from 'lucide-react'
import { useTransactionsController } from '../use-transactions-controller'
import { NewFundRealeaseContent } from './new-transaction-content'

export function TransactionsTableFilters() {
  const { setIsModalOpen } = useTransactionsController()

  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Informações do lançamento..."
        className="h-8 w-full"
      />

      <Select defaultValue="all">
        <div className="">
          <SelectTrigger className="h-8 w-44">
            <SelectValue />
          </SelectTrigger>
        </div>

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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="mr-1.5 h-4 w-4" strokeWidth={2.2} />
            Cadastrar
          </Button>
        </DialogTrigger>
        <NewFundRealeaseContent />
      </Dialog>
    </form>
  )
}
