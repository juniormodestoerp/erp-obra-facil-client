import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
import { Dialog, DialogTrigger } from '@views/components/ui/dialog'
import { TableCell, TableRow } from '@views/components/ui/table'
import { FundReleasesDetails } from '@views/pages/private/fund-releases/components/fund-releases-details'
import { X } from 'lucide-react'

// interface Props {}

export function FundReleasesTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <InformationCircleIcon className="h-4 w-4" strokeWidth={1.5} />
              <span className="sr-only">Detalhes da compra</span>
            </Button>
          </DialogTrigger>
          <FundReleasesDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground">
        63edf432-5728-4c93-b124-34a50f03b159
      </TableCell>
      <TableCell className="text-xs text-muted-foreground">
        24/03/2024
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-yellow-600" />
          <span className="font-medium text-muted-foreground">
            Todos status
          </span>
        </div>
      </TableCell>
      <TableCell className="text-xs font-medium text-muted-foreground">
        Loja Visconde
      </TableCell>
      <TableCell className="text-xs font-medium">R$ 18.400,00</TableCell>
      <TableCell>
        <Button variant="default" size="xs" className="px-2 text-xs">
          <CheckCircleIcon className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="destructive" size="xs" className="px-2 text-xs">
          <X className="h-4 w-4" strokeWidth={1.5} />
        </Button>
      </TableCell>
    </TableRow>
  )
}
