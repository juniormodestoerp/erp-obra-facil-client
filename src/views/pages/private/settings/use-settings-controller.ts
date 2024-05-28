import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { settingsService } from '@app/services/settings'
import {
	boolMessage,
	dateMessage,
	strMessage,
} from '@app/utils/custom-zod-error'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

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

export function UseSettingsController() {
	const [settings, setSettings] = useState<SettingsData[]>([])

	const methods = useForm<SettingsData>({
		resolver: zodResolver(schema),
	})

	const { data: response } = useQuery({
		queryKey: ['settings'],
		queryFn: () => settingsService.fetch({ pageIndex: 1 }),
	})

	const { mutateAsync: saveSetting } = useMutation({
		mutationFn: async (data: SettingsData) => {
			return settingsService.save(data)
		},
	})

	useEffect(() => {
		if (response?.settings) {
			setSettings(response.settings)
		}
	}, [response])

	const handleToggle = (
		id: string,
		field: 'isFieldRequired' | 'isFieldEnable',
	) => {
		setSettings((prevState) => {
			const newState = prevState.map((setting) => {
				if (setting.id === id) {
					const updatedSetting = { ...setting, [field]: !setting[field] }
					saveSetting(updatedSetting)
					return updatedSetting
				}
				return setting
			})
			return newState
		})
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
