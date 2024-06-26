import { Checkbox } from '@views/components/ui/checkbox'
import type { ICategoryType } from '@views/pages/private/categories/use-categories-controller'

interface CheckboxOption {
	id: string
	label: string
}

interface Props {
	title: string
	options: CheckboxOption[]
	selectedOption: string
	onOptionChange: (id: ICategoryType) => void
}

export function CheckboxGroup({
	title,
	options,
	selectedOption,
	onOptionChange,
}: Props) {
	return (
		<div>
			<p className="text-sm font-medium">{title}:</p>
			<div className="mt-2 flex justify-start gap-8">
				{options.map((option) => (
					<div key={option.id} className="flex items-center gap-2">
						<div className="flex items-center space-x-2">
							<Checkbox
								id={option.id}
								checked={selectedOption === option.id}
								onCheckedChange={() =>
									onOptionChange(option.id as ICategoryType)
								}
							/>
						</div>
						<label
							htmlFor={option.id}
							className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
		</div>
	)
}
