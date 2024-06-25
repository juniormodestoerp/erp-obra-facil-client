import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { ITagDTO } from '@app/dtos/tag-dto'
import { useCreateTag } from '@app/hooks/tags/use-create-tag'
import { TAG_QUERY_KEY, useTags } from '@app/hooks/tags/use-tags'
import { useUpdateTagCenter } from '@app/hooks/tags/use-update-tag'
import { type AppError, parseError } from '@app/services/http-client'
import { tagsService } from '@app/services/tags'
import { strMessage } from '@app/utils/custom-zod-error'
import { toast } from 'sonner'

const createSchema = z.object({
	name: z.string(strMessage('nome da tag')).min(1, 'O nome tag é obrigatório!'),
})

type CreateTagFormData = z.infer<typeof updateSchema>

const updateSchema = z.object({
	id: z.string(strMessage('identificador da tag')),
	name: z.string(strMessage('nome da tag')).min(1, 'O nome da é obrigatório!'),
})

type UpdateTagFormData = z.infer<typeof updateSchema>

export function useTagsController() {
	const queryClient = useQueryClient()

	const [selectedTag, setSelectedTag] = useState({} as ITagDTO)

	const {
		handleSubmit: hookFormHandleSubmitCreate,
		register: hookFormRegisterCreate,
		setValue: hookFormSetValueCreate,
		formState: { errors: hookFormErrorsCreate },
	} = useForm<UpdateTagFormData>({
		resolver: zodResolver(createSchema),
	})

	const {
		handleSubmit: hookFormHandleSubmitUpdate,
		register: hookFormRegisterUpdate,
		setValue: hookFormSetValueUpdate,
		formState: { errors: hookFormErrorsUpdate },
	} = useForm<UpdateTagFormData>({
		resolver: zodResolver(updateSchema),
	})

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	function handleOpenCreateModal() {
		hookFormSetValueCreate('name', '')
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleCloseCreateModal() {
		setIsCreateModalOpen(!isCreateModalOpen)
	}
	function handleOpenUpdateModal(tag: ITagDTO) {
		setSelectedTag(tag)
		setIsUpdateModalOpen(!isUpdateModalOpen)
		hookFormSetValueUpdate('id', tag.id)
		hookFormSetValueUpdate('name', tag.name)
	}
	function handleCloseUpdateModal() {
		setIsUpdateModalOpen(!isUpdateModalOpen)
	}
	function handleOpenDeleteModal(tag: ITagDTO) {
		setSelectedTag(tag)
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(!isDeleteModalOpen)
	}

	const { tags } = useTags()
	const { createTag } = useCreateTag()
	const { updateTag } = useUpdateTagCenter()

	const handleSubmit = hookFormHandleSubmitCreate(
		async ({ name }: CreateTagFormData) => {
			try {
				await createTag({ name })
				handleCloseCreateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	const handleSubmitUpdate = hookFormHandleSubmitUpdate(
		async ({ id, name }: UpdateTagFormData) => {
			try {
				await updateTag({ id, name })
				handleCloseUpdateModal()
			} catch (error) {
				toast.error(parseError(error as AppError))
			}
		},
	)

	function handleSubmitRemove(tag: ITagDTO) {
		tagsService
			.remove({ id: tag.id })
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: TAG_QUERY_KEY,
				})
			})
			.catch((error) => {
				toast.error(parseError(error as AppError))
				if (
					error.response.data.message === 'A tag solicitada não foi encontrada.'
				) {
					queryClient.setQueryData<ITagDTO[]>(TAG_QUERY_KEY, () => [])
				}
			})
	}

	return {
		tags,
		isCreateModalOpen,
		isUpdateModalOpen,
		isDeleteModalOpen,
		selectedTag,
		hookFormErrorsCreate,
		hookFormErrorsUpdate,
		hookFormRegisterCreate,
		hookFormRegisterUpdate,
		handleOpenCreateModal,
		handleCloseCreateModal,
		handleOpenUpdateModal,
		handleCloseUpdateModal,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleSubmit,
		handleSubmitUpdate,
		handleSubmitRemove,
	}
}
