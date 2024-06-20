export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  parentId?: string
}

export interface Card {
  id: string
  label: string
}

export interface ISettingOption {
  id: string
  title: string
  description: string
  isEnable: string
  name: string
}

export const settingsOptions: ISettingOption[] = [
  {
    id: '1d132d36-ee83-47c3-aeaa-de9c6a68e575',
    title: 'Data de competência',
    description:
      'Define o momento específico do direito ao recebimento de uma receita.',
    isEnable: 'isCompetenceDateEnable',
    name: 'competenceDate',
  },
  {
    id: 'b7cffeb2-3038-4950-9feb-5efd9ced0cb3',
    title: 'Centros de custo e lucros',
    description:
      'Identifica o setor empresarial que incide custos e/ou gera receita, avaliado pelo lucro resultante.',
    isEnable: 'isCostAndProfitCentersEnable',
    name: 'costAndProfitCenters',
  },
  {
    id: 'aab16add-c98f-46a6-9c4a-54bd6a4ec549',
    title: 'Tags',
    description:
      'Categoriza lançamentos para organização e facilidade de acesso.',
    isEnable: 'isTagsEnable',
    name: 'tags',
  },
  {
    id: 'ef5502fe-053b-4b96-ab6a-e29bac122550',
    title: 'Habilitar senha para exclusão de cadastros',
    description:
      'Adiciona uma camada de segurança exigindo senha para excluir itens dos cadastros.',
    isEnable: 'isEnablePassword',
    name: 'enablePassword',
  },
  {
    id: 'fdf8e077-1c1c-4dbe-a659-a6e05fa11f2a',
    title: 'Configuração de parcelamento',
    description:
      'Permite a escolha do valor da parcela individual ou o valor total como padrão em lançamentos parcelados.',
    isEnable: 'isInstallmentConfigurationEnable',
    name: 'installmentConfiguration',
  },
  {
    id: 'c850fd74-4086-4958-b5a1-2283dfae3955',
    title: 'Inclusão de saldos residuais nos relatórios de caixa',
    description:
      'Inclui saldos remanescentes de metas de receitas e despesas nos relatórios de caixa.',
    isEnable: 'isIncludeResidualBalancesEnable',
    name: 'includeResidualBalances',
  },
  {
    id: 'cfdaee47-ae55-45bc-83e1-39cbc81a6d78',
    title: 'Formas de pagamento',
    description:
      'Permite adicionar métodos de pagamento específicos aos lançamentos.',
    isEnable: 'isPaymentMethodsEnable',
    name: 'paymentMethods',
  },
  {
    id: '4b6e1fef-0703-4977-bd37-54b910b8c7a5',
    title: 'Número de documento',
    description:
      'Facilita a identificação e rastreamento de transações pelo número do documento.',
    isEnable: 'isDocumentNumberEnable',
    name: 'documentNumber',
  },
  {
    id: 'c37a86ce-246e-4623-aa81-624abccaea50',
    title: 'Metas de receitas e despesas',
    description:
      'Inclui no valor realizado apenas lançamentos de categorias com metas definidas para receitas e despesas.',
    isEnable: 'isGoalsEnable',
    name: 'goals',
  },
  {
    id: '2036cac2-365c-408c-be4c-91fc4b4fb2b3',
    title: 'Contratos',
    description:
      'Associa lançamentos a contratos específicos para melhor organização e rastreamento.',
    isEnable: 'isContractsEnable',
    name: 'contracts',
  },
  {
    id: '354e3be6-fb8a-4127-9125-9bd623b53452',
    title: 'Projetos',
    description:
      'Associa cada lançamento a um projeto específico para maior organização e rastreabilidade.',
    isEnable: 'isProjectsEnable',
    name: 'projects',
  },
  {
    id: '4a4a60f1-2118-4a14-918c-d41d3488894c',
    title: 'Observações',
    description:
      'Destinado a comentários adicionais ou detalhes relevantes sobre o lançamento.',
    isEnable: 'isObservationsEnable',
    name: 'observations',
  },
  {
    id: 'f7274eca-55f5-4de1-bb65-dc7619bcc06a',
    title: 'Exibir os lançamentos pendentes no presente',
    description:
      'Controla a exibição de lançamentos pendentes baseando-se na data de vencimento ou na data atual.',
    isEnable: 'isShowPendingEnable',
    name: 'showPending',
  },
]

export const categoriesOptions: Category[] = [
  // Categorias primárias de despesas
  { id: 'uuid-1234-expense', name: 'Moradia', type: 'expense' },
  { id: 'uuid-2234-expense', name: 'Transporte', type: 'expense' },
  { id: 'uuid-3234-expense', name: 'Alimentação', type: 'expense' },
  { id: 'uuid-4234-expense', name: 'Saúde', type: 'expense' },
  { id: 'uuid-5234-expense', name: 'Educação', type: 'expense' },
  { id: 'uuid-6234-expense', name: 'Lazer', type: 'expense' },
  { id: 'uuid-7234-expense', name: 'Impostos', type: 'expense' },
  { id: 'uuid-8234-expense', name: 'Seguros', type: 'expense' },
  { id: 'uuid-9234-expense', name: 'Investimentos', type: 'expense' },
  { id: 'uuid-10234-expense', name: 'Outros', type: 'expense' },

  // Subcategorias para Moradia
  {
    id: 'uuid-1235-expense',
    name: 'Aluguel',
    type: 'expense',
    parentId: 'uuid-1234-expense',
  },
  {
    id: 'uuid-1236-expense',
    name: 'Manutenção',
    type: 'expense',
    parentId: 'uuid-1234-expense',
  },
  {
    id: 'uuid-8462-expense',
    name: 'CDB',
    type: 'expense',
    parentId: 'uuid-9234-expense',
  },

  // Categorias primárias de receitas
  { id: 'uuid-1234-income', name: 'Salário', type: 'income' },
  { id: 'uuid-2234-income', name: 'Freelancer', type: 'income' },
  { id: 'uuid-3234-income', name: 'Investimentos', type: 'income' },
  { id: 'uuid-4234-income', name: 'Outras Receitas', type: 'income' },

  // Subcategorias para Salário
  {
    id: 'uuid-1235-income',
    name: 'Bônus',
    type: 'income',
    parentId: 'uuid-1234-income',
  },
  {
    id: 'uuid-1236-income',
    name: 'Comissões',
    type: 'income',
    parentId: 'uuid-1234-income',
  },

  // Subcategorias para Freelancer
  {
    id: 'uuid-2235-income',
    name: 'Projetos',
    type: 'income',
    parentId: 'uuid-2234-income',
  },
  {
    id: 'uuid-2236-income',
    name: 'Consultoria',
    type: 'income',
    parentId: 'uuid-2234-income',
  },
]

export const reportCards: Card[] = [
  { id: 'aa26deed-69cb-4b8d-b389-d90b0e28dc7a', label: 'Totais por categoria' },
  {
    id: '3f4122ce-81ed-4587-8f53-bbc5e45b40dc',
    label: 'Lançamentos por categoria',
  },
  { id: '448c8ba9-cc78-442e-892f-61310af7d25a', label: 'Totais por centro' },
  {
    id: '3f427b08-6af4-49fb-9a36-b69e4303d4d3',
    label: 'Lançamentos por centro',
  },
  { id: '3f4a2597-2f94-4d84-99b5-3100be789846', label: 'Totais por contato' },
  {
    id: '508f3c25-0a89-402b-823d-918a1735f457',
    label: 'Lançamentos por contato',
  },
  { id: 'c53330b3-825e-4552-93c3-15e088c08939', label: 'Totais por projeto' },
  {
    id: '01854359-7f5e-4ae5-8082-282d047933b3',
    label: 'Lançamentos por projeto',
  },
  {
    id: '56f42d2f-cb49-45c2-91fd-ad57665e0260',
    label: 'Evolução por categoria',
  },
  { id: '7691ad45-3ca5-4362-bff4-32c3d130b495', label: 'Evolução por centro' },
  { id: 'e44e25d1-894e-465c-9290-16601a5cb079', label: 'Evolução por contato' },
  // {
  //   id: '9e7da27c-6817-4ee1-b569-9dc785290d05',
  //   label: 'Evolução das metas de categorias',
  // },
  // {
  //   id: '978171b9-c5f2-42c9-9496-903a097c6f68',
  //   label: 'Evolução das metas de centros',
  // },
  {
    id: '74475790-0626-40b1-a9ca-dda43b0e78d4',
    label: 'Resultado dos projetos',
  },
]

export const cashFlowCards: Card[] = [
  { id: '81d672b2-6a24-4960-9f14-d08b385aee26', label: 'Fluxo de caixa' },
  { id: '8b90f79a-4b79-47c3-9dc7-97bf6d520d17', label: 'Lançamentos de caixa' },
  { id: 'b6825749-84ab-4ed4-89a6-5a08cc46a5f2', label: 'Contas a pagar' },
  { id: 'c661f480-3d19-4329-89ad-d6017133d3a1', label: 'Contas a receber' },
  { id: 'e52a2037-eaf2-405a-9001-19fc59a04f10', label: 'Contas pagas' },
  { id: '43c5c7f2-7874-40f2-a2d6-0c891587a323', label: 'Contas recebidas' },
]

export const states = [
  {
    field: 'Acre',
    value: '1b1ae2b9-f6cc-4e4a-9e4d-55f9a5dfbf81',
  },
  {
    field: 'Alagoas',
    value: '3fca1ea8-3c87-4d6b-93a1-098c5e17f5e4',
  },
  {
    field: 'Amapá',
    value: '6379f5e9-b74e-4e55-8f9e-5c3d58c5ad78',
  },
  {
    field: 'Amazonas',
    value: 'cae1dc24-1a78-4483-a25b-2a90f7e8fd19',
  },
  {
    field: 'Bahia',
    value: 'cdbed257-f8f7-43e9-a67d-5980f3b738c3',
  },
  {
    field: 'Ceará',
    value: '782c47e5-2cfc-40e7-8ad6-75f6380d46d0',
  },
  {
    field: 'Distrito Federal',
    value: 'a4e62e96-91cb-468b-b16a-b9df8338e0aa',
  },
  {
    field: 'Espírito Santo',
    value: 'fd3f25ef-d6d5-4489-b8f7-b86c9739e405',
  },
  {
    field: 'Goiás',
    value: 'd3ccf364-45a3-41c9-8fcb-5cf5aa75ab20',
  },
  {
    field: 'Maranhão',
    value: 'a7b31c47-52a0-4aa3-8c9d-0cc8c7cd0a39',
  },
  {
    field: 'Mato Grosso',
    value: 'fbe1f28a-c46c-4719-bf0d-c9f3f0b3cc17',
  },
  {
    field: 'Mato Grosso do Sul',
    value: '23b575be-bc2d-4ea6-8e8b-16e72e9da6ff',
  },
  {
    field: 'Minas Gerais',
    value: 'ec13a06f-c0ff-4b7f-b5ea-c0a9358b6d9e',
  },
  {
    field: 'Pará',
    value: '37ec3021-d00a-4e44-b28f-51f4324e9e57',
  },
  {
    field: 'Paraíba',
    value: 'ac88cf4d-2073-40d8-aed1-fc2733e7e9b6',
  },
  {
    field: 'Paraná',
    value: 'c0cb1edb-cd96-4a88-8c66-567f2043a6d8',
  },
  {
    field: 'Pernambuco',
    value: 'fa42f42b-7c7e-4ef8-8f4e-7e50e04e77da',
  },
  {
    field: 'Piauí',
    value: '8ef12a37-89e4-4e1b-a2fc-24e0dbcb2d4b',
  },
  {
    field: 'Rio de Janeiro',
    value: 'cd8ea9b3-5c99-4d1a-b63f-552d4f2e9c4b',
  },
  {
    field: 'Rio Grande do Norte',
    value: '95cfaec0-56e2-4c6c-9b02-3e5bd6fdb870',
  },
  {
    field: 'Rio Grande do Sul',
    value: 'fbdbfe05-387e-4e38-91a3-ffcb4adcb961',
  },
  {
    field: 'Rondônia',
    value: 'a7b9ed35-618e-4e30-9413-f98e7af89ad4',
  },
  {
    field: 'Roraima',
    value: 'f7a72995-f4fd-4b0e-99a9-ec49e8da2899',
  },
  {
    field: 'Santa Catarina',
    value: '84cb81c4-3a9a-4a35-8de9-9ebd79f02d50',
  },
  {
    field: 'São Paulo',
    value: 'ed0c6df3-2462-4112-9df3-4e6fbde7cd18',
  },
  {
    field: 'Sergipe',
    value: 'c12c3fbf-bda4-4791-8b60-b172d8b9f981',
  },
  {
    field: 'Tocantins',
    value: 'bfd3997c-3c19-4e1a-a6a4-285b57b1ef3f',
  },
]
