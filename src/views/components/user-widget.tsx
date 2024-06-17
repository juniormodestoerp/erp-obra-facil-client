import { authService } from '@app/services/authenticate'
import {
	AdjustmentsHorizontalIcon,
	ArrowLeftStartOnRectangleIcon,
	EllipsisHorizontalIcon,
	UserCircleIcon,
	// ServerStackIcon,
} from '@heroicons/react/24/outline'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@views/components/ui/button'
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '@views/components/ui/command'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	// DropdownMenuSub,
	// DropdownMenuSubContent,
	// DropdownMenuSubTrigger,
} from '@views/components/ui/dropdown-menu'
// import { Tags, User } from 'lucide-react'
import { User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// const labels = [
//   'Nova funcionalidade',
//   'Correção de erro',
//   'Migrar dados de outro sistema',
//   'Documentação',
//   'Design',
//   'Dúvidas',
//   'Manutenção',
// ]

interface Props {
	name?: string
	profilePicture?: string
}

export function ComboboxDropdownMenu({ name, profilePicture }: Props) {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)

	// const [label, setLabel] = useState('feature')

	const { mutateAsync: logoutFn } = useMutation({
		mutationKey: ['logout'],
		mutationFn: authService.logout,
		onSuccess: () => {
			navigate('/login', { replace: true })
		},
	})

	

	return (
		<>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="mt-px w-fit pl-1.5 z-50">
						<span className="sr-only">Open user menu</span>
						{profilePicture ? (
									<img
									id="image-preview"
									crossOrigin="anonymous"
									src={`http://localhost:8080/uploads/profile-pictures/${profilePicture?.split('/').pop()}` as string}
									className="h-[1.5rem] w-[1.5rem] text-foreground rounded-full"
									alt="profile"
								/>
						) : (
							<UserCircleIcon
								className="h-[1.5rem] w-[1.5rem] text-foreground"
								strokeWidth={1.5}
								aria-hidden="true"
							/>

						)}

						<p className="mx-1.5 text-sm font-medium leading-none">{name}</p>

						<EllipsisHorizontalIcon className="mr-1.5 h-[1.5rem] w-[1.5rem]" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="mt-[9px] w-[180px]">
					<DropdownMenuLabel>Ações</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => navigate('/profile')}>
							<User className="mr-2 h-4 w-4" />
							Visualizar perfil
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => navigate('/settings')}>
							<AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
							Personalização
						</DropdownMenuItem>
						{/* <DropdownMenuItem>
              <ServerStackIcon className="mr-2 h-4 w-4" />
              Fazer backup
            </DropdownMenuItem> */}
						{/* <DropdownMenuSeparator />
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
            </DropdownMenuSub> */}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="group" onClick={() => logoutFn()}>
							<ArrowLeftStartOnRectangleIcon className="mr-2 h-4 w-4 group-hover:text-red-600" />
							<span className="group-hover:text-red-600">Sair da conta</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
