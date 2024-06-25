import { IncomeIcon } from '@/assets/icons/income'
import type { ITagDTO } from '@app/dtos/tag-dto'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Input } from '@views/components/input'
import { PageTitle } from '@views/components/page-title'
import { Tooltip } from '@views/components/tooltip'
import { Button } from '@views/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@views/components/ui/dialog'
import { useTagsController } from '@views/pages/private/tags/use-tags-controller'
import { Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function Tags() {
	const {
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
	} = useTagsController()

	console.log(tags, 'tags');
	

	return (
		<Fragment>
			<Helmet title="Tags" />

			<PageTitle
				title="Tags"
				description="Crie e gerencie suas tags."
			/>

			<div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
				{tags.length > 0 ? (
					tags.map((tag: ITagDTO) => (
						<div
							key={tag.id}
							className="flex items-center justify-start px-3 border-collapse border-t border-gy-200 dark:border-slate-400"
						>
							<IncomeIcon className="mt-1 h-5 w-5 text-green-500" />
							<div className="flex w-full items-center justify-between px-2 py-2 text-foreground">
								<p className="font-medium tracking-tight">
									<span className="mr-2">&bull;</span>
									<span className="w-full">{tag.name}</span>
								</p>
								<div className="flex gap-2">
									<Tooltip text="Editar tags">
										<button
											type="button"
											onClick={() => handleOpenUpdateModal(tag)}
										>
											<PencilSquareIcon className="mt-0.5 h-5 w-5 text-yellow-500" />
										</button>
									</Tooltip>
									<Tooltip text="Remover tags">
										<button
											type="button"
											onClick={() => handleOpenDeleteModal(tag)}
										>
											<TrashIcon className="mt-0.5 h-5 w-5 text-red-500" />
										</button>
									</Tooltip>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="h-24 text-center flex items-center justify-center">
						<p>Nenhum resultado encontrado</p>
					</div>
				)}
			</div>

			<Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
				<DialogTrigger asChild>
					<button
						type="button"
						onClick={handleOpenCreateModal}
						className="absolute bottom-8 right-12 flex justify-center hover:bg-primary/90 size-10 items-center gap-1 border-2 bg-primary rounded-full border-primary pr-1 text-sm font-medium text-primary"
					>
						<Plus className="size-5 text-white ml-1" strokeWidth={2.5} />
					</button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Cadastrar tag</DialogTitle>
						<DialogDescription>
							Defina uma nova tag no sistema.
						</DialogDescription>
					</DialogHeader>

					<form
						id="create-tag-form"
						onSubmit={handleSubmit}
						className="grid gap-4 py-2 pb-4"
					>
						<Input
							label="tags:"
							placeholder="Digite o nome da tag"
							error={hookFormErrorsCreate?.name?.message}
							{...hookFormRegisterCreate('name')}
						/>
					</form>

					<DialogFooter>
						<Button form="create-tag-form" type="submit">
							Cadastrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{isUpdateModalOpen && (
				<Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Editar {selectedTag?.name}</DialogTitle>
							<DialogDescription>
								Atualize uma tag no sistema.
							</DialogDescription>
						</DialogHeader>

						<form
							id="edit-tag-form"
							onSubmit={handleSubmitUpdate}
							className="grid gap-4 py-2 pb-4"
						>
							<input
								type="text"
								className="hidden"
								value={selectedTag.id}
								{...hookFormRegisterUpdate('id')}
							/>

							<Input
								label="tag:"
								placeholder="Digite o nome da tag"
								error={hookFormErrorsUpdate?.name?.message}
								{...hookFormRegisterUpdate('name')}
							/>
						</form>
						<DialogFooter>
							<Button form="edit-tag-form" type="submit">
								Atualizar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{isDeleteModalOpen && (
				<Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Remover {selectedTag.name}</DialogTitle>
							<DialogDescription>
								Tem certeza de que deseja remover esta tag? Essa
								ação poderá ser desfeita.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="mt-4">
							<Button
								type="submit"
								variant="destructive"
								onClick={() => {
									handleSubmitRemove(selectedTag)
									handleCloseDeleteModal()
								}}
							>
								Remover
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	)
}
