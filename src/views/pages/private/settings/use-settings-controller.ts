import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { settingsService } from '@app/services/settings'
import {
	boolMessage,
	dateMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	SETTINGS_QUERY_KEY,
	useSettings,
} from '@app/hooks/settings/use-settings'

const schema = z.object({
	id: z.string(strMessage('id')),
	fieldName: z.string(strMessage('nome do campo')),
	isFieldEnable: z.boolean(boolMessage('campo habilitado')),
	isFieldRequired: z.boolean(boolMessage('campo obrigatório')),
	title: z.string(strMessage('título')),
	description: z.string(strMessage('descrição')),
	createdAt: z.string(dateMessage('data de criação')),
})

export type SettingsData = z.infer<typeof schema>

export function useSettingsController() {
	const queryClient = useQueryClient()

	const methods = useForm<SettingsData>({
		resolver: zodResolver(schema),
	})

	const { settings } = useSettings()

	const { mutateAsync: saveSetting } = useMutation({
		mutationFn: async (data: SettingsData) => {
			return settingsService.save(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY })
		},
	})

	const handleToggle = async (
		id: string,
		field: 'isFieldRequired' | 'isFieldEnable',
	) => {
		const settingToUpdate = settings.find((setting) => setting.id === id)
		if (settingToUpdate) {
			const updatedSetting = {
				...settingToUpdate,
				[field]: !settingToUpdate[field],
			}
			await saveSetting(updatedSetting)
		}
	}

	const toggleFieldRequired = (id: string) => {
		handleToggle(id, 'isFieldRequired')
	}

	const toggleFieldEnable = (id: string) => {
		handleToggle(id, 'isFieldEnable')
	}

	return {
		methods,
		settings,
		toggleFieldRequired,
		toggleFieldEnable,
	}
}
