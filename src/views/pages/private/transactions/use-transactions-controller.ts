import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { settingsService } from '@app/services/settings'
import { ISetting } from '@app/services/settings/fetch'
import {
  dateMessage,
  numbMessage,
  strMessage,
} from '@app/utils/custom-zod-error'

const schema = z.object({
  name: z
    .string(strMessage('nome do lançamento'))
    .min(1, 'O campo nome do lançamento é obrigatório.'),
  description: z
    .string(strMessage('descrição'))
    .min(1, 'O campo descrição é obrigatório.'),
  categoryId: z
    .string(strMessage('categoria'))
    .min(1, 'O campo categoria é obrigatório.'),
  establishmentName: z
    .string(strMessage('nome do estabelecimento'))
    .min(1, 'O campo nome do estabelecimento é obrigatório.'),
  bankName: z
    .string(strMessage('nome do banco'))
    .min(1, 'O campo nome do banco é obrigatório.'),
  transactionDate: z.coerce.date(dateMessage('data da transação')),
  previousBalance: z
    .string(numbMessage('saldo anterior'))
    .transform((value) => +value.replace(',', '.')),
  totalAmount: z
    .string(numbMessage('valor base do procedimento'))
    .transform((value) => +value.replace(',', '.')),
  currentBalance: z
    .string(numbMessage('valor base do procedimento'))
    .transform((value) => +value.replace(',', '.')),
  paymentMethod: z
    .string(strMessage('forma de pagamento'))
    .min(1, 'O campo forma de pagamento é obrigatório.'),

  // Configurações opcionais adicionais
  competencyDate: z.coerce.date(dateMessage('data de competência')).nullable(),
  costAndProfitCenters: z.string(strMessage('centro de custo')).nullable(),
  tags: z.string(strMessage('tags')).nullable(),
  documentNumber: z.string(strMessage('número do documento')).nullable(),
  associatedContracts: z.string(strMessage('contratos assosiados')).nullable(),
  associatedProjects: z.string(strMessage('projetos assosiados')).nullable(),
  additionalComments: z.string(strMessage('comentários adicionais')).nullable(),
})

export type FormData = z.infer<typeof schema>

export function useTransactionsController() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: settings, refetch } = useQuery<{ settings: ISetting[] }>({
    queryKey: ['settings'],
    queryFn: () => settingsService.fetch({ pageIndex: 1 }),
  })

  useEffect(() => {
    if (isModalOpen) {
      refetch()
    }
  }, [isModalOpen, refetch])

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionDate: new Date(),
      competencyDate: new Date(),
    },
  })

  function getFieldInfo(
    fieldName: string,
  ): { isRequired: boolean; isEnabled: boolean } | null {
    const setting = settings?.settings.find((s) => s.fieldName === fieldName)
    if (setting) {
      return {
        isRequired: setting.isFieldRequired,
        isEnabled: setting.isFieldEnable,
      }
    }
    return null
  }

  return {
    settings,
    methods,
    getFieldInfo,
    setIsModalOpen,
  }
}
