import { logoData } from '@/assets/data/logo-data'
import iconComponents from '@/assets/icons/system'
import { cn } from '@app/utils/cn'
import { Format } from '@app/utils/format'
import { getIconName } from '@app/utils/switchs/system-icons'
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
	createElement,
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

export function SelectLogo({
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
		const defaultOption = logoData.find(
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

	function extractImagePath(data: IData): string {
		const imagePath = data?.field?.split(' - ')[0].trim()
		return imagePath
	}

	function getFormattedValue(value: string) {
		const iconComponentNames = Object.keys(iconComponents)
		if (iconComponentNames.includes(value)) {
			return getIconName(value)
		}
		return value?.split(' - ').pop()?.trim() || ''
	}

	const filteredData = logoData.filter((item: IData) => item.field !== 'padrão')

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
								{selectedField ? (
									selectedField.field.includes(' - ') ? (
										<>
											<img
												src={extractImagePath(selectedField)}
												alt={selectedField?.field?.split(' - ')[1].trim()}
												className="inline-block h-6 w-6 mr-2"
											/>
											<span
												className={cn(
													'text-zinc-900 dark:text-zinc-100',
													value && 'text-zinc-900 dark:text-zinc-100',
												)}
											>
												{selectedField?.field?.split(' - ')[1].trim()}
											</span>
										</>
									) : (
										<>
											{createElement(
												iconComponents[
													selectedField.field as keyof typeof iconComponents
												],
												{ className: 'inline-block h-6 w-6 mr-2' },
											)}
											<span
												className={cn(
													'text-zinc-400 dark:text-zinc-100',
													value && 'text-zinc-900 dark:text-zinc-100',
												)}
											>
												{getIconName(selectedField.field)}
											</span>
										</>
									)
								) : (
									<span className="text-zinc-400 dark:text-zinc-100">
										Selecione uma opção...
									</span>
								)}
							</div>
							<ChevronUpDownIcon className="absolute right-1.5 top-1.5 h-6 w-6" />
						</button>

						<CommandDialog open={isOpen} onOpenChange={setIsOpen}>
							<CommandInput
								id={inputId}
								placeholder={placeholder}
								value={getFormattedValue(value)}
								onValueChange={(e) => onChange(e)}
								onClick={() => setIsOpen(true)}
								className="!focus:ring-0 !focus:outline-none !focus:border-none !cursor-pointer !border-none !outline-none !ring-0"
							/>
							<CommandList>
								<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
								<CommandGroup heading="Ícones do sistema">
									{Object.keys(iconComponents).map((iconName) => {
										const IconComponent =
											iconComponents[iconName as keyof typeof iconComponents]
										return (
											<CommandItemOption
												key={iconName}
												onSelect={() => {
													const selectedIcon = {
														field: iconName,
														value: iconName,
													}
													handleSelect({ item: selectedIcon, onChange })
												}}
												className="!px-1 !py-2.5 !cursor-pointer"
											>
												<IconComponent className="inline-block !size-7 mr-2" />
												<span>{getIconName(iconName)}</span>
											</CommandItemOption>
										)
									})}
								</CommandGroup>

								{filteredData.length > 0 && (
									<CommandGroup
										heading="Instituições financeiras"
										className="cursor-pointer"
									>
										{filteredData.map((item: IData) => {
											return (
												<CommandItemOption
													key={item.value}
													onSelect={() => handleSelect({ item, onChange })}
													className="!cursor-pointer"
												>
													<img
														src={item.field?.split(' - ')[0].trim()}
														alt={item.field?.split(' - ')[1].trim()}
														className="inline-block h-6 w-6 mr-2"
													/>
													<span>
														{Format.name(item.field?.split(' - ')[1].trim())}
													</span>
												</CommandItemOption>
											)
										})}
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
