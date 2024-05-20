import { Input } from '@views/components/input'
import { Button } from '@views/components/ui/button'
import { DatePicker } from '@views/components/ui/date-picker'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/dialog'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormData,
  useFundReleasesController,
} from '../use-fund-releases-controller'
import { Label } from '@views/components/ui/label'

export function NewFundRealeaseContent() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>()
  const { getFieldInfo } = useFundReleasesController()

  return (
    <DialogContent className="sm:max-w-6xl">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-wrap space-y-2 rounded-md border border-slate-300 bg-white p-8 pt-6 shadow dark:border-slate-400 dark:bg-slate-800"
      >
        <div className="grid grid-cols-3 gap-4 pb-6">
          <Input
            label="Nome do lançamento"
            placeholder="Digite o nome do lançamento"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Selecione a categoria (SELECT)"
            placeholder="Digite o Category ID"
            error={errors.categoryId?.message}
            {...register('categoryId')}
          />
          <Input
            label="Nome do estabelecimento"
            placeholder="Digite o Nome do Estabelecimento"
            error={errors.establishmentName?.message}
            {...register('establishmentName')}
          />

          <div className="flex w-full flex-col space-y-4">
            <Label>Data da transação:</Label>
            <Controller
              control={control}
              name="transactionDate"
              render={({ field }) => (
                <DatePicker
                  label="Transaction Date"
                  selected={field.value}
                  onChange={field.onChange}
                  error={errors.transactionDate?.message}
                />
              )}
            />
          </div>

          <Input
            id="input-bank-name"
            label="Bank Name"
            placeholder="Digite o Nome do Banco"
            error={errors.bankName?.message}
            {...register('bankName')}
          />

          <Input
            id="input-previous-balance"
            label="Previous Balance"
            placeholder="Digite o Saldo Anterior"
            type="number"
            error={errors.previousBalance?.message}
            {...register('previousBalance')}
          />
          <Input
            id="input-total-amount"
            label="Total Amount"
            placeholder="Digite o Valor Total"
            type="number"
            error={errors.totalAmount?.message}
            {...register('totalAmount')}
          />
          <Input
            id="input-current-balance"
            label="Current Balance"
            placeholder="Digite o Saldo Atual"
            type="number"
            error={errors.currentBalance?.message}
            {...register('currentBalance')}
          />

          <Input
            id="input-description"
            label="Description"
            placeholder="Digite a Descrição"
            error={errors.description?.message}
            {...register('description')}
          />

          {getFieldInfo('paymentMethod')?.isEnabled && (
            <Input
              id="input-payment-method"
              label="Payment Method"
              placeholder="Digite o Método de Pagamento"
              error={errors.paymentMethod?.message}
              {...register('paymentMethod')}
            />
          )}
          {getFieldInfo('costAndProfitCenters')?.isEnabled && (
            <Input
              id="input-cost-center"
              label="Cost Center"
              placeholder="Digite o Centro de Custo"
              error={errors.costCenter?.message}
              {...register('costCenter')}
            />
          )}
          {getFieldInfo('tags')?.isEnabled && (
            <Input
              id="input-tags"
              label="Tags"
              placeholder="Digite as Tags"
              error={errors.tags?.message}
              {...register('tags')}
            />
          )}
          {getFieldInfo('documentNumber')?.isEnabled && (
            <Input
              id="input-document-number"
              label="Document Number"
              placeholder="Digite o Número do Documento"
              error={errors.documentNumber?.message}
              {...register('documentNumber')}
            />
          )}
          {getFieldInfo('associatedContracts')?.isEnabled && (
            <Input
              id="input-associated-contracts"
              label="Associated Contracts"
              placeholder="Digite os Contratos Associados"
              error={errors.associatedContracts?.message}
              {...register('associatedContracts')}
            />
          )}
          {getFieldInfo('associatedProjects')?.isEnabled && (
            <Input
              id="input-associated-projects"
              label="Associated Projects"
              placeholder="Digite os Projetos Associados"
              error={errors.associatedProjects?.message}
              {...register('associatedProjects')}
            />
          )}

          {getFieldInfo('additionalComments')?.isEnabled && (
            <Input
              id="input-additional-comments"
              label="Additional Comments"
              placeholder="Digite Comentários Adicionais"
              error={errors.additionalComments?.message}
              {...register('additionalComments')}
            />
          )}

          {getFieldInfo('competencyDate')?.isEnabled && (
            <div className="flex flex-col">
              <Label>Data de competência:</Label>
              <Controller
                control={control}
                name="competencyDate"
                render={({ field }) => (
                  <DatePicker
                    label="Competency Date"
                    selected={field.value}
                    onChange={field.onChange}
                    error={errors.competencyDate?.message}
                  />
                )}
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-dark-blue px-3 dark:text-slate-100"
        >
          Salvar
        </Button>
      </form>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}
