import { currencyData } from '@/assets/data/currency-data'
import { cn } from '@app/utils/cn'
import { ChevronUpDownIcon, XCircleIcon } from '@heroicons/react/24/outline'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from '@views/components/ui/command'
import { useTransactionsController } from '@views/pages/private/transactions/use-transactions-controller'
import { CommandItem } from 'cmdk'
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	type MouseEvent,
	forwardRef,
	useEffect,
	useState,
} from 'react'
import { Controller } from 'react-hook-form'

const CommandItemOption = forwardRef<
	ElementRef<typeof CommandItem>,
	ComponentPropsWithoutRef<typeof CommandItem>
>(({ className, ...props }, ref) => (
	<CommandItem
		ref={ref}
		className={cn(
			'relative flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground',
			className,
		)}
		{...props}
	/>
))

interface IData {
	field: string
	value: string
	imageUrl?: string
}

interface IHandleSelect {
	item: IData
	onChange: (value: string) => void
}

interface Props {
	id?: string
	label: string
	placeholder?: string
	name: string
	error?: string
	control: any
	optional?: boolean
}

export function SelectCurrency({
	id,
	label,
	placeholder,
	name,
	error,
	control,
	optional,
}: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { methods } = useTransactionsController()
	const [selectedField, setSelectedField] = useState<IData | null>(null)
	const inputId = id ?? name

	useEffect(() => {
		const defaultOption = currencyData.find(
			(item: IData) => item.field === 'padrão',
		)
		if (defaultOption) {
			methods.setValue(name as any, defaultOption.value)
			setSelectedField(defaultOption)
		}
	}, [name, methods])

	function handleSelect({ item, onChange }: IHandleSelect) {
		onChange(item.value)
		setSelectedField(item)
		setIsOpen(false)
	}

	const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setIsOpen(true)
	}

	const filteredData = currencyData.filter(
		(item: IData) => item.field !== 'padrão',
	)

	return (
		<div className="flex flex-1 flex-col max-w-xl">
			<label
				htmlFor={inputId}
				className="block text-sm font-medium leading-6 tracking-tight text-zinc-900 dark:text-zinc-100"
			>
				{label} {!optional && <span className="text-red-600">*</span>}
			</label>

			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange } }) => (
					<>
						<button
							type="button"
							onClick={handleButtonClick}
							className={cn(
								'relative block min-h-8 w-full rounded-md border border-zinc-400 px-3 py-1.5 text-left text-xs text-zinc-900 shadow outline-none ring-0 placeholder:text-zinc-400 hover:border-primary focus:border-primary focus:outline-none focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6 dark:bg-zinc-600 dark:text-zinc-100',
								error && '!border-red-600',
							)}
						>
							<div className="flex items-center">
								{selectedField?.imageUrl && (
									<img
										src={selectedField.imageUrl}
										alt={selectedField.field}
										className="inline-block h-6 w-6 mr-2"
									/>
								)}
								<span
									className={cn(
										'text-zinc-900 dark:text-zinc-100',
										value && 'text-zinc-900 dark:text-zinc-100',
									)}
								>
									{selectedField?.field === 'padrão'
										? 'Selecione uma opção...'
										: selectedField?.field || 'Selecione uma opção...'}
								</span>
							</div>
							<ChevronUpDownIcon className="absolute right-1.5 top-1.5 h-6 w-6" />
						</button>

						<CommandDialog open={isOpen} onOpenChange={setIsOpen}>
							<CommandInput
								id={inputId}
								placeholder={placeholder}
								value={value}
								onValueChange={(e) => onChange(e)}
								onClick={() => setIsOpen(true)}
								className="!focus:ring-0 !focus:outline-none !focus:border-none !cursor-pointer !border-none !outline-none !ring-0"
							/>
							<CommandList>
								<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
								{filteredData.length > 0 && (
									<CommandGroup heading="Sugestões">
										{filteredData.map((item: IData) => (
											<CommandItemOption
												key={item.value}
												onSelect={() => handleSelect({ item, onChange })}
											>
												{item.imageUrl && (
													<img
														src={item.imageUrl}
														alt={item.field}
														className="inline-block h-6 w-6 mr-2"
													/>
												)}
												<span>{item.field}</span>
											</CommandItemOption>
										))}
									</CommandGroup>
								)}
							</CommandList>
						</CommandDialog>
					</>
				)}
			/>

			{error && (
				<div className="mt-2 flex items-center gap-1.5 text-red-600">
					<XCircleIcon className="h-5" />
					<span className="text-xs">{error}</span>
				</div>
			)}
		</div>
	)
}
