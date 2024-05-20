import { settingsService } from '@app/services/settings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ISetting } from '@app/services/settings/fetch'

const schema = z.object({
  transactionId: z.string().nullable(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  transactionDate: z.date(),
  status: z.string(),
  establishmentName: z.string(),
  bankName: z.string(),
  paymentMethod: z.string(),
  previousBalance: z.number(),
  totalAmount: z.number(),
  currentBalance: z.number(),

  // Configurações opcionais adicionais
  competencyDate: z.date().nullable(),
  costCenter: z.string().nullable(),
  tags: z.string().nullable(),
  enablePasswordProtection: z.boolean().optional(),
  installmentConfiguration: z.boolean().optional(),
  includeResidualBalancesInReports: z.boolean().optional(),
  documentNumber: z.string().nullable(),
  enableReceiptExpenseGoals: z.boolean().optional(),
  associatedContracts: z.string().nullable(),
  associatedProjects: z.string().nullable(),
  additionalComments: z.string().nullable(),
})

export type FormData = z.infer<typeof schema>

export function useFundReleasesController() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: settings, refetch } = useQuery<{ settings: ISetting[] }>({
    queryKey: ['settings'],
    queryFn: () => settingsService.fetch({ pageIndex: 1 }),
  })

  useEffect(() => {
    if (isModalOpen) {
      refetch() // Faz a refetch quando o modal é aberto
    }
  }, [isModalOpen, refetch])

  console.log('settings', settings)

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
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
