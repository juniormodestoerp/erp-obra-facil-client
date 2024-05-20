import { ICategory } from '@app/services/categories/fetch'
import { Button } from '@views/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/dialog'

import { useCategoriesController } from '@views/pages/private/categories/use-categories-controller'

interface Props {
  category: ICategory
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (value: boolean) => void
}

export function RemoveCategoryDialog({
  category,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: Props) {
  const { handleRemoveCategory } = useCategoriesController()

  function handleClose() {
    setIsDeleteModalOpen(false)
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover a categoria {category.categoryName}</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja remover esta categoria? Essa ação poderá
            ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              handleRemoveCategory(category.id)
              handleClose()
            }}
          >
            Remover categoria
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
