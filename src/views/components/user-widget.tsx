import {
  AdjustmentsHorizontalIcon,
  ArrowLeftStartOnRectangleIcon,
  EllipsisHorizontalIcon,
  ServerStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@views/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@views/components/ui/dropdown-menu'
import { Tags, User } from 'lucide-react'
import * as React from 'react'

const labels = [
  'Nova funcionalidade',
  'Correção de erro',
  'Migrar dados de outro sistema',
  'Documentação',
  'Design',
  'Dúvidas',
  'Manutenção',
]

export function ComboboxDropdownMenu() {
  const [label, setLabel] = React.useState('feature')
  const [open, setOpen] = React.useState(false)
  const userName = 'Junior Modesto'

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="mt-px w-fit pl-1.5">
            <span className="sr-only">Open user menu</span>

            <UserCircleIcon
              className="h-[1.5rem] w-[1.5rem] text-foreground"
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <p className="mx-1.5 text-sm font-medium leading-none">
              {userName}
            </p>

            <EllipsisHorizontalIcon className="mr-1.5 h-[1.5rem] w-[1.5rem]" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="mt-[9px] w-[180px]">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Visualizar perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
              Personalização
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ServerStackIcon className="mr-2 h-4 w-4" />
              Fazer backup
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Tags className="mr-2 h-4 w-4" />
                Ajuda
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Filtrar por tópicos..."
                    autoFocus={true}
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum tópico foi encontrado.</CommandEmpty>
                    <CommandGroup>
                      {labels.map((label) => (
                        <CommandItem
                          key={label}
                          value={label}
                          onSelect={(value) => {
                            setLabel(value)
                            setOpen(false)
                          }}
                        >
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <ArrowLeftStartOnRectangleIcon className="mr-2 h-4 w-4" />
              Sair da conta
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
