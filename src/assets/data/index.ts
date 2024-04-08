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

export const settingsOptions = [
  {
    title: 'Data de competência',
    description:
      'Define o momento específico do direito ao recebimento de uma receita.',
    isRequired: false,
    isActive: true,
    id: '1d132d36-ee83-47c3-aeaa-de9c6a68e575',
  },
  {
    title: 'Centros de custo e lucros',
    description:
      'Identifica o setor empresarial que incide custos e/ou gera receita, avaliado pelo lucro resultante.',
    isRequired: false,
    isActive: true,
    id: 'b7cffeb2-3038-4950-9feb-5efd9ced0cb3',
  },
  {
    title: 'Tags',
    description:
      'Categoriza lançamentos para organização e facilidade de acesso.',
    isRequired: false,
    isActive: true,
    id: 'aab16add-c98f-46a6-9c4a-54bd6a4ec549',
  },
  {
    title: 'Habilitar senha para exclusão de cadastros',
    description:
      'Adiciona uma camada de segurança exigindo senha para excluir itens dos cadastros.',
    isRequired: false,
    isActive: true,
    id: 'ef5502fe-053b-4b96-ab6a-e29bac122550',
  },
  {
    title: 'Configuração de parcelamento',
    description:
      'Permite a escolha do valor da parcela individual ou o valor total como padrão em lançamentos parcelados.',
    isRequired: false,
    isActive: true,
    id: 'fdf8e077-1c1c-4dbe-a659-a6e05fa11f2a',
  },
  {
    title: 'Inclusão de saldos residuais nos relatórios de caixa',
    description:
      'Inclui saldos remanescentes de metas de receitas e despesas nos relatórios de caixa.',
    isRequired: false,
    isActive: true,
    id: 'c850fd74-4086-4958-b5a1-2283dfae3955',
  },
  {
    title: 'Formas de pagamento',
    description:
      'Permite adicionar métodos de pagamento específicos aos lançamentos.',
    isRequired: false,
    isActive: true,
    id: 'cfdaee47-ae55-45bc-83e1-39cbc81a6d78',
  },
  {
    title: 'Número de documento',
    description:
      'Facilita a identificação e rastreamento de transações pelo número do documento.',
    isRequired: false,
    isActive: true,
    id: '4b6e1fef-0703-4977-bd37-54b910b8c7a5',
  },
  {
    title: 'Metas de receitas e despesas',
    description:
      'Inclui no valor realizado apenas lançamentos de categorias com metas definidas para receitas e despesas.',
    isRequired: false,
    isActive: true,
    id: 'c37a86ce-246e-4623-aa81-624abccaea50',
  },
  {
    title: 'Contratos',
    description:
      'Associa lançamentos a contratos específicos para melhor organização e rastreamento.',
    isRequired: false,
    isActive: true,
    id: '2036cac2-365c-408c-be4c-91fc4b4fb2b3',
  },
  {
    title: 'Projetos',
    description:
      'Associa cada lançamento a um projeto específico para maior organização e rastreabilidade.',
    isRequired: false,
    isActive: true,
    id: '354e3be6-fb8a-4127-9125-9bd623b53452',
  },
  {
    title: 'Observações',
    description:
      'Destinado a comentários adicionais ou detalhes relevantes sobre o lançamento.',
    isRequired: false,
    isActive: true,
    id: '4a4a60f1-2118-4a14-918c-d41d3488894c',
  },
  {
    title: 'Exibir os lançamentos pendentes no presente',
    description:
      'Controla a exibição de lançamentos pendentes baseando-se na data de vencimento ou na data atual.',
    isRequired: false,
    isActive: true,
    id: 'f7274eca-55f5-4de1-bb65-dc7619bcc06a',
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
  {
    id: '9e7da27c-6817-4ee1-b569-9dc785290d05',
    label: 'Evolução das metas de categorias',
  },
  {
    id: '978171b9-c5f2-42c9-9496-903a097c6f68',
    label: 'Evolução das metas de centros',
  },
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
