import { logoData } from '@/assets/data/logo-data'
import { logoSystem } from '@/assets/data/logo-system'
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
import { CommandItem } from 'cmdk'
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	type MouseEvent,
	forwardRef,
	useEffect,
	useState,
} from 'react'
import { Controller, useWatch } from 'react-hook-form'

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
	setValue?: any
	optional?: boolean
}

export function SelectLogo({
	id,
	label,
	placeholder,
	name,
	error,
	control,
	setValue,
	optional,
}: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedField, setSelectedField] = useState<IData | null>(null)
	const inputId = id ?? name

	const fieldValue = useWatch({
		control,
		name,
	})

	useEffect(() => {
		const defaultOption = [...logoData, ...logoSystem].find(
			(item: IData) => item.field === 'padrão',
		)
		if (defaultOption) {
			setValue(name as any, defaultOption.value)
			setSelectedField(defaultOption)
		}
	}, [name, setValue])

	useEffect(() => {
		const selectedOption = [...logoData, ...logoSystem].find(
			(item: IData) => item.value === fieldValue,
		)
		if (selectedOption) {
			setSelectedField(selectedOption)
		}
	}, [fieldValue])

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
		const iconComponentNames = Object.keys(logoSystem)
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
									<>
										<img
											src={extractImagePath(selectedField)}
											alt={selectedField?.field?.split(' - ')[1].trim()}
											className="inline-block size-6 mr-2"
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
								{logoSystem.length > 0 && (
									<CommandGroup
										heading="Ícones do sistema"
										className="cursor-pointer"
									>
										{logoSystem.map((item: IData) => {
											return (
												<CommandItemOption
													key={item.value}
													onSelect={() => handleSelect({ item, onChange })}
													className="!cursor-pointer"
												>
													<img
														src={item.field?.split(' - ')[0].trim()}
														alt={item.field?.split(' - ')[1].trim()}
														className="inline-block size-6 mr-2"
													/>
													<span>
														{Format.name(item.field?.split(' - ')[1].trim())}
													</span>
												</CommandItemOption>
											)
										})}
									</CommandGroup>
								)}

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
