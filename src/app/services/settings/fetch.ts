import type { ISettingDTO } from '@app/dtos/setting-dto'
import { httpClient } from '@app/services/http-client'

export async function fetch(): Promise<ISettingDTO[]> {
	const response = await httpClient.get('/settings')
	console.log('teste', response.data.settings)

	return response.data.map((setting: ISettingDTO) => ({
		id: setting.id,
		userId: setting.userId,
		fieldName: setting.fieldName,
		isFieldEnable: setting.isFieldEnable,
		isFieldRequired: setting.isFieldRequired,
		title: setting.title,
		description: setting.description,
		createdAt: setting.createdAt,
	}))
}
